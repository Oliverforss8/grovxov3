"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, Power0 } from "gsap";
import { client } from "@/sanity/lib/client";

interface ImageData {
  src: string;
  alt: string;
  heading: string;
  description: string;
}

const marginBetweenImages = 2; // Margin between images in vh

const VideoLoop: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const [popupVisible, setPopupVisible] = useState<number | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await client.fetch(`
        *[_type == "blogPost"]{
          "src": image.asset->url,
          "alt": heading,
          "heading": heading,
          "description": description
        }
      `);
      setImages([...data, ...data]); // Duplicate the images to ensure a smooth loop
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const totalHeight = containerRef.current?.scrollHeight || 0;
      if (tweenRef.current) {
        tweenRef.current.kill();
      }

      const context = gsap.context(() => {
        tweenRef.current = gsap.to(containerRef.current, {
          y: `-${totalHeight / 2}px`, // Scroll halfway through the doubled list
          duration: 20,
          ease: Power0.easeNone,
          repeat: -1, // Infinite loop
          onRepeat: () => {
            gsap.set(containerRef.current, { y: 0 }); // Reset to start for seamless loop
          },
        });
      }, containerRef);

      return () => context.revert();
    }
  }, [images]);

  const handleMouseEnterImage = (index: number) => {
    if (tweenRef.current) {
      tweenRef.current.pause();
    }
    gsap.to(cursorRef.current, { opacity: 1, duration: 0.1 });
  };

  const handleMouseLeaveImage = () => {
    if (tweenRef.current) {
      tweenRef.current.play();
    }
    gsap.to(cursorRef.current, { opacity: 0, duration: 0.1 });
  };

  const handleImageClick = (index: number | null) => {
    setPopupVisible(index);
    if (cursorRef.current) {
      gsap.to(cursorRef.current, { opacity: 0, duration: 0.1 });
    }
  };

  const handleClosePopup = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setPopupVisible(null);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative overflow-hidden h-[85vh] w-full text-white">
        <div ref={containerRef} className="absolute top-0 w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-full group"
              style={{
                marginBottom: `${marginBetweenImages}vh`,
                cursor: popupVisible === index ? "default" : "pointer",
              }}
              onMouseEnter={() => handleMouseEnterImage(index)}
              onMouseLeave={handleMouseLeaveImage}
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                layout="responsive"
                width={100} // 100% width
                height={100} // maintain aspect ratio
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
      {popupVisible !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="relative bg-white rounded-lg p-4 w-[80vw] h-[40vh] md:w-[50vw] md:h-[50vh] shadow-lg">
            <h2 className="text-xl font-bold mb-2">
              {images[popupVisible].heading}
            </h2>
            <p className="mb-4">{images[popupVisible].description}</p>
            <button
              className="absolute top-2 right-2 rounded-full bg-black text-white py-2 px-4"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-20 h-20 md:w-32 md:h-32 bg-black text-white flex items-center justify-center rounded-full pointer-events-none transition-opacity duration-100"
        style={{ transform: "translate(-50%, -50%)", zIndex: 1000, opacity: 0 }}
      >
        View Now
      </div>
    </div>
  );
};

export default VideoLoop;

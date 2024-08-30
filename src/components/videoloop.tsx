"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, Power0 } from "gsap";
import { fetchMedia, MediaData } from "../components/fetchData"; // Adjusted import path

const marginBetweenImages = 2; // Margin between images in vh

const VideoLoop: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [media, setMedia] = useState<MediaData[]>([]);
  const [popupVisible, setPopupVisible] = useState<number | null>(null);

  useEffect(() => {
    const loadMedia = async () => {
      const data = await fetchMedia();
      setMedia([...data, ...data]); // Duplicate the media to ensure a smooth loop
    };

    loadMedia();
  }, []);

  useEffect(() => {
    if (media.length > 0) {
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
          }
        });
      }, containerRef);

      return () => context.revert();
    }
  }, [media]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseEnterMedia = (index: number) => {
    if (tweenRef.current) {
      tweenRef.current.pause();
    }
    if (cursorRef.current) {
      gsap.to(cursorRef.current, { opacity: 1, duration: 0.1 });
    }
  };

  const handleMouseLeaveMedia = () => {
    if (tweenRef.current) {
      tweenRef.current.play();
    }
    if (cursorRef.current) {
      gsap.to(cursorRef.current, { opacity: 0, duration: 0.1 });
    }
  };

  const handleMediaClick = (index: number | null) => {
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
          {media.map((mediaItem, index) => (
            <div
              key={index}
              className="relative w-full group"
              style={{
                marginBottom: `${marginBetweenImages}vh`,
                cursor: popupVisible === index ? "default" : "pointer",
              }}
              onMouseEnter={() => handleMouseEnterMedia(index)}
              onMouseLeave={handleMouseLeaveMedia}
              onClick={() => handleMediaClick(index)}
            >
              {mediaItem.type === "image" && mediaItem.src ? (
                <Image
                  src={mediaItem.src}
                  alt={mediaItem.heading}
                  layout="responsive"
                  width={100} // 100% width
                  height={100} // maintain aspect ratio
                  objectFit="cover"
                />
              ) : mediaItem.type === "video" && mediaItem.src ? (
                <video
                  src={mediaItem.src}
                  autoPlay
                  loop
                  muted // Ensure the video is muted to prevent fullscreen on mobile
                  playsInline // Prevent automatic fullscreen on mobile devices
                  className="w-full h-auto"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <p>No media available</p> // Fallback if no src is available
              )}
            </div>
          ))}
        </div>
      </div>
      {popupVisible !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm z-50 transition-opacity duration-300 ease-in-out">
          <div className="relative bg-white rounded-xl p-6 w-[90vw] md:w-[60vw] lg:w-[40vw] shadow-2xl">
            {media[popupVisible].type === 'image' ? (
              <Image
                src={media[popupVisible].src}
                alt={media[popupVisible].heading}
                layout="responsive"
                width={700}
                height={400}
                className="rounded-lg"
              />
            ) : (
              <video
                src={media[popupVisible].src}
                controls
                muted // Keep muted to avoid autoplay issues on mobile
                playsInline // Prevent automatic fullscreen on mobile devices
                className="w-full h-auto rounded-lg"
              />
            )}
            <h2 className="text-2xl font-bold mt-4">{media[popupVisible].heading}</h2>
            <p className="mt-2 text-gray-700">{media[popupVisible].description}</p>
            <button
              className="absolute top-2 right-2 rounded-full bg-[#FFD626] text-black p-2 hover:bg-yellow-600 transition duration-200"
              onClick={handleClosePopup}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-20 h-20 md:w-32 md:h-32 bg-[#FFD626] text-black flex items-center justify-center rounded-full pointer-events-none transition-opacity duration-100"
        style={{ transform: "translate(-50%, -50%)", zIndex: 1000, opacity: 0 }}
      >
        View Now
      </div>
    </div>
  );
};

export default VideoLoop;

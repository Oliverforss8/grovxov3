"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, Power0 } from "gsap";

const images = [
  {
    src: "/image.png",
    alt: "Loop 1",
    text: "This is Loop 1",
  },
  {
    src: "/image2.png",
    alt: "Loop 2",
    text: "This is Loop 2",
  },
  {
    src: "/image3.png",
    alt: "Loop 3",
    text: "This is Loop 3",
  },
];

const VideoLoop: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [popupVisible, setPopupVisible] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const totalHeight = container.scrollHeight / 2;

      tweenRef.current = gsap.to(container, {
        y: `-${totalHeight}px`,
        duration: 20,
        ease: Power0.easeNone,
        repeat: -1,
        modifiers: {
          y: (y) => {
            const mod = parseFloat(y) % totalHeight;
            return `${mod}px`;
          },
        },
      });
    }

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, []);

  const handleMouseEnterImage = (index: number) => {
    if (tweenRef.current) {
      tweenRef.current.pause();
    }
    setHoveredImage(index);
    gsap.to(cursorRef.current, { opacity: 1, duration: 0.1 });
  };

  const handleMouseLeaveImage = () => {
    if (tweenRef.current) {
      tweenRef.current.play();
    }
    setHoveredImage(null);
    gsap.to(cursorRef.current, { opacity: 0, duration: 0.1 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (cursorRef.current && hoveredImage !== null && popupVisible === null) {
      gsap.set(cursorRef.current, { x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeaveContainer = () => {
    gsap.to(cursorRef.current, { opacity: 0, duration: 0.1 });
  };

  const handleImageClick = (index: number | null) => {
    setPopupVisible(index);
    gsap.to(cursorRef.current, { opacity: 0, duration: 0.1 });
  };

  const handleClosePopup = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setPopupVisible(null);
    setHoveredImage(null);
  };

  return (
    <div
      className="flex justify-center items-center h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div
        className="relative overflow-hidden h-[85vh] w-full text-white"
        onMouseLeave={handleMouseLeaveContainer}
      >
        <div ref={containerRef} className="absolute top-0 w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-full group"
              style={{
                height: "85vh", // Adjusted for better responsiveness
                marginBottom: "5vh",
                cursor: popupVisible === index ? "default" : "pointer",
              }}
              onMouseEnter={() => handleMouseEnterImage(index)}
              onMouseLeave={handleMouseLeaveImage}
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
          {images.map((image, index) => (
            <div
              key={`clone-${index}`}
              className="relative w-full group"
              style={{
                height: "85vh",
                marginBottom: "5vh",
                cursor: popupVisible === index ? "default" : "pointer",
              }}
              onMouseEnter={() => handleMouseEnterImage(index)}
              onMouseLeave={handleMouseLeaveImage}
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
      {popupVisible !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="relative bg-white rounded-lg p-4 w-[80vw] h-[40vh] md:w-[50vw] md:h-[50vh] shadow-lg">
            <p className="mb-4">{images[popupVisible].text}</p>
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

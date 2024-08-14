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

const imageHeight = 60; // Now based on viewport width for better responsiveness
const marginBetweenImages = 2; // Adjust based on desired margin as a percentage
const totalHeight = (imageHeight + marginBetweenImages) * images.length;

const VideoLoop: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const container = containerRef.current;
      if (container) {
        tweenRef.current = gsap.to(container, {
          y: `-${totalHeight}vw`, // Adjusted for responsiveness
          duration: 20,
          ease: Power0.easeNone,
          repeat: -1,
          modifiers: {
            y: gsap.utils.unitize((y) => parseFloat(y) % totalHeight),
          },
        });
      }
    }, containerRef);

    return () => context.revert();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative overflow-hidden h-[85vh] w-full text-white">
        <div ref={containerRef} className="absolute top-0 w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-full group"
              style={{
                height: `${imageHeight}vw`,
                marginBottom: `${marginBetweenImages}vw`,
              }}
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
                height: `${imageHeight}vw`,
                marginBottom: `${marginBetweenImages}vw`,
              }}
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
    </div>
  );
};

export default VideoLoop;


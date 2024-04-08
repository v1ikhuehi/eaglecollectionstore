"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(() => images?.[0]);

  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState("50% 50%");

  const realZoom = zoom === 1 ? "cover" : `${zoom * 100}%`;

  const zoomInPosition = (e) => {
    const zoomer = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - zoomer.x) / zoomer.width) * 100;
    const y = ((e.clientY - zoomer.y) / zoomer.height) * 100;
    setPosition(`${x}% ${y}%`);
  };

  const zoomIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setZoom((prevZoom) => (prevZoom === 1 ? 3 : 1));
    zoomInPosition(e);
  };

  const handleMove = (e) => {
    if (zoom > 1) {
      zoomInPosition(e);
    }
  };

  const handleLeave = (e) => {
    setZoom(1);
  };

  useEffect(() => {
    // Check if activeImage is not already set
    if (!activeImage && images && images.length > 0) {
      setActiveImage(images[0]);
    }
  }, [activeImage, images]);

  return (
    <div className="sm:flex gap-1 shadow-l-lg p-5 bg-white">
      <div
        className="relative overflow-hidden rounded-md cursor-zoom-in z-20 "
        style={{
          backgroundImage: `url(${activeImage})`,
          backgroundPosition: `${position}`,
          backgroundSize: realZoom,
        }}
        onClick={zoomIn}
        onMouseOut={handleLeave}
        onMouseMove={handleMove}
      >
        <Image
          src={activeImage}
          alt={""}
          width={400}
          height={200}
          priority
          className="opacity-0"
        />
      </div>
      <div className="flex gap-1 sm:flex-col mt-2 sm:mt-0">
        {images
          ?.filter((image) => image !== activeImage)
          .map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(img)}
              className=" p-1 bg-light-grey border-2 "
            >
              <Image
                src={img}
                alt=""
                width={70}
                height={50}
                className="rounded-md"
                priority
              />
            </button>
          ))}
      </div>
    </div>
  );
}

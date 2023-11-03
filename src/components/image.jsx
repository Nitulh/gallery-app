/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Image = ({
  image,
  onDragStart,
  onDragEnd,
  onDragOver,
  selectedImages,
  index,
  images,
}) => {
  return (
    <div className="relative z-0">
      <div
        className={`${
            index === 0 && images.length > 5 ? "w-[10rem] sm:w-[25rem] h-full" : "w-[10rem] sm:w-[12rem]"
          }  px-2 mb-4 cursor-pointer`}
        draggable="true"
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className={`z-10 absolute transition duration-300 ease-in-out opacity-0 hover:opacity-40 rounded-lg bg-black  ${
              index === 0 && images.length > 5 ? "w-[9rem] sm:w-[24rem] h-full" : "w-[9rem] sm:w-[11rem] h-full"
            } `}></div>
        {selectedImages.includes(image.id) && (
          <div className={`z-10 absolute ${
            index === 0 && images.length > 5 ? "w-[9rem] sm:w-[24rem] h-full" : "w-[9rem] sm:w-[11rem] h-full"
          } transition duration-300 ease-in-out opacity-50  rounded-lg bg-gray-200`}></div>
        )}
        <img
          src={image.src}
          alt={image.title}
          className={`w-full ${
            index === 0 && images.length > 5 ? "h-[9rem] sm:h-[24rem]" : "h-[9rem] sm:h-[11rem]"
          } object-cover bg-white rounded-lg border border-slate-400 relative z-0`}
        />
      </div>
    </div>
  );
};

export default Image;

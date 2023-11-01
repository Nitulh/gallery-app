import { useState } from "react";
import Image from "./image"; // Correct the import path if needed

const initialImages = [
  { id: "1", src: "/images/image-1.webp", title: "Image 1" },
  { id: "2", src: "/images/image-2.webp", title: "Image 2" },
  { id: "3", src: "/images/image-4.webp", title: "Image 3" },
];

const ImageGallery = () => {
  const [images, setImages] = useState(initialImages);
  const [draggingImage, setDraggingImage] = useState(null);

  const handleDragStart = (image) => {
    setDraggingImage(image);
  };

  const handleDragEnd = () => {
    setDraggingImage(null);
  };

  const handleDragOver = (image) => {
    if (draggingImage) {
      const newImages = [...images];
      const draggingIndex = newImages.findIndex(
        (img) => img.id === draggingImage.id
      );
      const targetIndex = newImages.findIndex((img) => img.id === image.id);
      if (draggingIndex !== -1 && targetIndex !== -1) {
        [newImages[draggingIndex], newImages[targetIndex]] = [
          newImages[targetIndex],
          newImages[draggingIndex],
        ];
        setImages(newImages);
      }
    }
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files).map((file, index) => ({
      id: `new-${index}`,
      src: URL.createObjectURL(file),
      title: file.name,
    }));
    setImages([...images, ...newImages]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>
      <div className="flex flex-wrap mx-2">
        {images.map((image) => (
       
            <Image
            key={image.id}
              image={image}
              onDragStart={() => handleDragStart(image)}
              onDragEnd={handleDragEnd}
              onDragOver={() => handleDragOver(image)}
            />
         
        ))}
        <label className="bg-white mx-2 w-[11rem] h-[11rem] rounded-lg border-2 border-dotted border-slate-400 cursor-pointer ">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            multiple
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default ImageGallery;

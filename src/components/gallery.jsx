/* eslint-disable react/prop-types */
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ImageItem = ({
  image,
  index,
  selected,
  handleSelectImage,
  handleImageClick,
}) => {
  return (
    <Draggable key={image.id} draggableId={image.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`border rounded-md relative ${
            selected ? "border-blue-500" : "border-gray-300"
          }`}
          onClick={() => handleImageClick(image.id)}
        >
          <div className="p-2 absolute">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => handleSelectImage(image.id)}
              onClick={(e) => e.stopPropagation()} // Prevent checkbox click from triggering image selection
            />
          </div>
          <img
            src={image.src}
            alt={`Image ${image.id}`}
            className="w-full object-cover rounded-md"
          />
        </div>
      )}
    </Draggable>
  );
};

const Gallery = () => {
  const [images, setImages] = useState([
    { id: 1, src: "/images/image-1.webp", isFeatured: false },
    { id: 2, src: "/images/image-2.webp", isFeatured: false },
    { id: 3, src: "/images/image-4.webp", isFeatured: false },
  ]);

  const [selectedImages, setSelectedImages] = useState([]);




  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const reorderedImages = Array.from(images);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);
  
    setImages(reorderedImages);
  };

//   const onDragEnd = (result) => {
//     if (!result.destination) {
//       return;
//     }

//     const reorderedImages = Array.from(images);
//     const [movedImage] = reorderedImages.splice(result.source.index, 1);
//     reorderedImages.splice(result.destination.index, 0, movedImage);

//     setImages(reorderedImages);
//   };

  const handleSelectImage = (id) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((imageId) => imageId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleImageClick = (id) => {
    // Toggle image selection when clicked
    handleSelectImage(id);
  };

  const handleDeleteSelected = () => {
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  return (
    <div className="container mx-auto p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="images">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {images.map((image, index) => (
                <ImageItem
                  key={image.id}
                  image={image}
                  index={index}
                  selected={selectedImages.includes(image.id)}
                  handleSelectImage={handleSelectImage}
                  handleImageClick={handleImageClick}
                />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="mt-4">
        <button
          onClick={handleDeleteSelected}
          className="bg-red-500 text-white px-4 py-2 rounded-full disabled:opacity-50"
          disabled={selectedImages.length === 0}
        >
          Delete Selected
        </button>
      </div>
    </div>
  );
};

export default Gallery;

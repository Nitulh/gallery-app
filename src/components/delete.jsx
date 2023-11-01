/* eslint-disable react/prop-types */
import  { useState } from 'react';

// eslint-disable-next-line react/prop-types
const DeleteButton = ({ images, setImages }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const toggleSelectImage = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const deleteSelectedImages = () => {
    // eslint-disable-next-line react/prop-types
    const updatedImages = images.filter((image) => !selectedImages.includes(image.id));
    setImages(updatedImages);
    setSelectedImages([]);
  };

  return (
    <div className="mb-4">
      <button
        onClick={deleteSelectedImages}
        className="p-2 bg-red-500 text-white rounded-md"
      >
        Delete Selected Images
      </button>
      {images.map((image) => (
        <div key={image.id} className="mt-2">
          <input
            type="checkbox"
            onChange={() => toggleSelectImage(image.id)}
            checked={selectedImages.includes(image.id)}
          />
          {image.title}
        </div>
      ))}
    </div>
  );
};

export default DeleteButton;

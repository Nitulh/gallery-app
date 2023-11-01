

// eslint-disable-next-line react/prop-types
const FeatureImageSelector = ({ images, setImages }) => {
  const setFeatureImage = () => {
    // eslint-disable-next-line react/prop-types
    if (images.length > 0) {
      const updatedImages = [...images];
      const featureImage = updatedImages.shift();
      updatedImages.push(featureImage);
      setImages(updatedImages);
    }
  };

  return (
    <button
      onClick={setFeatureImage}
      className="mt-2 p-2 bg-green-500 text-white rounded-md"
    >
      Set Feature Image
    </button>
  );
};

export default FeatureImageSelector;

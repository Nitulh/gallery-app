// eslint-disable-next-line react/prop-types
import { useState, useRef, useCallback } from "react"; // Added useEffect for debugging
import { toast } from "react-toastify";
import GalleryItem from "./GalleryItem";
import ConfirmModal from "./ConfirmModal";

const ImageGallery = () => {
  const [images, setImages] = useState([
    { id: "1", src: "/images/image-1.webp", title: "Headphone blue" },
    { id: "2", src: "/images/image-2.webp", title: "Headphone green" },
    { id: "3", src: "/images/image-3.webp", title: "Headphone pink" },
    { id: "4", src: "/images/image-4.webp", title: "Headphone red" },
    { id: "5", src: "/images/image-5.webp", title: "Headphone yellow" },
    { id: "6", src: "/images/image-6.webp", title: "Headphone grey" },
    { id: "7", src: "/images/image-7.webp", title: "Watch black" },
    { id: "8", src: "/images/image-8.webp", title: "Watch orange" },
    { id: "9", src: "/images/image-9.webp", title: "Watch skyblue" },
    { id: "10", src: "/images/image-10.jpeg", title: "Red street" },
  ]);

  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const dragOverItemIndex = useRef(null);

  // --- Drag & Drop Handlers ---
  const handleDragStart = useCallback((e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDragEnter = useCallback((e, index) => {
    e.preventDefault();
    dragOverItemIndex.current = index;
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault(); // Allows drop
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(() => {
    if (draggedItemIndex === null || dragOverItemIndex.current === null) {
      setDraggedItemIndex(null); // Clear in case of invalid drop
      dragOverItemIndex.current = null;
      return;
    }

    const newImages = [...images];
    const [draggedItem] = newImages.splice(draggedItemIndex, 1);
    newImages.splice(dragOverItemIndex.current, 0, draggedItem);

    setImages(newImages);
    setDraggedItemIndex(null); // Reset after successful drop
    dragOverItemIndex.current = null;
    toast.success("Image reordered successfully!");
  }, [draggedItemIndex, images]);

  const handleDragEnd = useCallback(() => {
    setDraggedItemIndex(null); // Always reset on drag end
    dragOverItemIndex.current = null;
  }, []);

  // --- Selection Handlers ---
  const toggleSelectImage = useCallback((imageId) => {
    setSelectedImageIds((prevSelected) => {
      if (prevSelected.includes(imageId)) {
        return prevSelected.filter((id) => id !== imageId);
      } else {
        return [...prevSelected, imageId];
      }
    });
  }, []);

  const toggleSelectAllImages = useCallback(() => {
    if (selectedImageIds.length === images.length) {
      setSelectedImageIds([]); // Deselect all
    } else {
      setSelectedImageIds(images.map((image) => image.id)); // Select all
    }
  }, [selectedImageIds.length, images.length, images]); // Added images as dependency here

  // --- Image Upload Handler ---
  const handleImageUpload = useCallback(
    (e) => {
      const files = Array.from(e.target.files);

      if (files.length === 0) return;

      // Check for file types if needed (e.g., only images)
      const validFiles = files.filter((file) => file.type.startsWith("image/"));
      if (validFiles.length !== files.length) {
        toast.error("Only image files are allowed.", { autoClose: 3000 });
        e.target.value = null;
        return;
      }

      if (images.length + validFiles.length > 15) {
        // Adjusted max limit
        toast.error(
          `Maximum 15 images allowed. Cannot upload ${validFiles.length} new images.`,
          { autoClose: 5000 }
        );
        e.target.value = null;
        return;
      }

      const newUploadedImages = validFiles.map((file) => ({
        id: `uploaded-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 9)}`, // More robust unique ID
        src: URL.createObjectURL(file),
        title: file.name,
      }));

      setImages((prevImages) => [...prevImages, ...newUploadedImages]);
      toast.success(`${newUploadedImages.length} image(s) uploaded!`, {
        autoClose: 3000,
      });
      e.target.value = null; // Clear input
    },
    [images.length]
  );

  // --- Deletion Handlers ---
  // In ImageGallery.jsx, inside openDeleteModal function
  const openDeleteModal = useCallback(() => {
    if (selectedImageIds.length > 0) {
      setDeleteModalOpen(true);
    } else {
      toast.info("Select images to delete.", { autoClose: 3000 });
    }
  }, [selectedImageIds.length]);

  const closeDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
  }, []);

  const confirmDeleteSelectedImages = useCallback(() => {
    console.log("Attempting to delete images. Selected IDs:", selectedImageIds); // Debugging
    setImages((prevImages) => {
      const remainingImages = prevImages.filter(
        (img) => !selectedImageIds.includes(img.id)
      );
      console.log("Remaining images after filter:", remainingImages); // Debugging
      return remainingImages;
    });
    toast.success(`${selectedImageIds.length} image(s) deleted!`, {
      autoClose: 3000,
    });
    setSelectedImageIds([]); // Clear selection
    closeDeleteModal(); // Close modal
  }, [selectedImageIds, closeDeleteModal]);

  const galleryGridClass = `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 p-6`;
  const totalImages = images.length;

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200">
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteSelectedImages}
        title="Delete Images"
        message={`Are you sure you want to delete ${selectedImageIds.length} selected image(s)? This action cannot be undone.`}
      />

      {/* Gallery Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
        {selectedImageIds.length > 0 ? (
          <label className="flex items-center space-x-3 cursor-pointer text-gray-800">
            <input
              type="checkbox"
              checked={selectedImageIds.length === totalImages}
              onChange={toggleSelectAllImages}
              className="form-checkbox h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-xl sm:text-2xl font-bold">
              {selectedImageIds.length} Files Selected
            </span>
          </label>
        ) : (
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Your Photos
          </h2>
        )}
        <button
          onClick={openDeleteModal}
          disabled={selectedImageIds.length === 0}
          className={`px-5 py-2 rounded-lg font-semibold text-lg transition duration-200 ease-in-out flex items-center space-x-2
            ${
              selectedImageIds.length > 0
                ? "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm2 3a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm2 3a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>Delete</span>
        </button>
      </div>

      {/* Image Grid */}
      <div
        className={galleryGridClass}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {images.map((image, index) => (
          <GalleryItem
            key={image.id}
            image={image}
            index={index}
            isSelected={selectedImageIds.includes(image.id)}
            onToggleSelect={toggleSelectImage}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
            isDragging={index === draggedItemIndex}
          />
        ))}

        {/* Upload Card */}
        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:text-blue-600 transition-all duration-300 ease-in-out bg-gray-50 aspect-square text-gray-500 group">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            multiple
            className="hidden"
          />
          <div className="mb-3 text-blue-500 group-hover:text-blue-600 transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-center font-semibold text-lg">Add Images</span>
          <span className="text-sm text-gray-500 mt-1">
            or drag & drop here
          </span>
        </label>
      </div>
    </div>
  );
};

export default ImageGallery;

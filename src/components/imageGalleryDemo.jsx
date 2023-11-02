import { useState } from "react";
import Image from "./image"; // Correct the import path if needed

const ImageGalleryDemo = () => {
  const [images, setImages] = useState([
    { id: "1", src: "/images/image-1.webp", title: "Image 1" },
    { id: "2", src: "/images/image-2.webp", title: "Image 2" },
    { id: "3", src: "/images/image-3.webp", title: "Image 3" },
    { id: "4", src: "/images/image-4.webp", title: "Image 4" },
    { id: "5", src: "/images/image-5.webp", title: "Image 5" },
    { id: "6", src: "/images/image-6.webp", title: "Image 6" },
    { id: "7", src: "/images/image-7.webp", title: "Image 7" },
    { id: "8", src: "/images/image-8.webp", title: "Image 8" },
    { id: "9", src: "/images/image-9.webp", title: "Image 9" },
    { id: "10", src: "/images/image-10.jpeg", title: "Image 10" },
  ]);
  const [selectedImages, setSelectedImages] = useState([]);
  // const [isReordering, setIsReordering] = useState(false);

  // Function to handle the drag and drop functionality
  const handleDragStart = (image) => {
    // Mark the image as dragging
    setImages((prevImages) =>
      prevImages.map((img) =>
        img.id === image.id ? { ...img, isDragging: true } : img
      )
    );
  };

  // Function to handle the end of the drag operation
  const handleDragEnd = () => {
    // Mark all images as not dragging
    setImages((prevImages) =>
      prevImages.map((img) => ({ ...img, isDragging: false }))
    );
  };

  // Function to handle reordering images during drag and drop
  const handleDragOver = (image) => {
    // if (isReordering) {
      const newImages = [...images];
      const draggingIndex = newImages.findIndex((img) => img.isDragging);
      const targetIndex = newImages.findIndex((img) => img.id === image.id);

      if (draggingIndex !== -1 && targetIndex !== -1) {
        // Reorder the images based on drag and drop
        const [draggingImage] = newImages.splice(draggingIndex, 1);
        newImages.splice(targetIndex, 0, draggingImage);
        setImages(newImages);
      // }
    }
  };

  // Function to handle image uploads
  //   const handleImageUpload = (e) => {
  //     const files = e.target.files;
  //     const newImages = Array.from(files).map((file, index) => ({
  //       id: `new-${index}`,
  //       src: URL.createObjectURL(file),
  //       title: file.name,
  //     }));
  //     setImages([...images, ...newImages]);
  //   };

  // Function to handle image uploads
  // const handleImageUpload = (e) => {
  //   if (images.length >= 11) {
  //     alert("You already have 11 images. You can't upload more.");
  //     return;
  //   }
  const handleImageUpload = (e) => {
    if (images.length >= 11) {
      alert("You already have 11 images. You can't upload more.");
      return;
    }
  
    const file = e.target.files[0];
    if (file) {
      const newImage = {
        id: `new-${images.length + 1}`,
        src: URL.createObjectURL(file),
        title: file.name,
      };
      setImages([...images, newImage]);
    }
    e.target.value = null; // Reset the file input field
  };

  //   const files = e.target.files;
  //   const newImages = Array.from(files).map((file, index) => ({
  //     id: `new-${index}`,
  //     src: URL.createObjectURL(file),
  //     title: file.name,
  //   }));
  //   setImages([...images, ...newImages]);
  // };

  //   const handleImageUpload = (e) => {
  //     const files = e.target.files;
  //     const newImages = Array.from(files).map((file, index) => ({
  //       id: `new-${index}`,
  //       src: URL.createObjectURL(file),
  //       title: file.name,
  //     }));
  //     setImages([...images, ...newImages]);
  //   };

  // Function to toggle the reorder mode

  // const toggleReorder = () => {
  //   setIsReordering((prev) => !prev);
  // };

  // Function to delete selected images
  const deleteSelectedImages = () => {
    setImages((prevImages) =>
      prevImages.filter((img) => !selectedImages.includes(img.id))
    );
    setSelectedImages([]);
  };

  // Function to toggle the selection of an image
  const toggleSelectImage = (imageId) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(imageId)) {
        return prevSelected.filter((id) => id !== imageId);
      } else {
        return [...prevSelected, imageId];
      }
    });
  };

  return (
    <div className={`bg-white rounded-xl h-auto shadow-md sm:pb-6 ${
      images.length < 4 ? "sm:pb-2" : "pb-8"
    }`}>
      <div className="flex justify-between border-b py-4 px-9">
        <div>
          {selectedImages.length > 0 ? (
            <h1 className="text-2xl font-bold">
              <div className="w-full px-2 cursor-pointer">
                <label className="cursor-pointer flex space-x-2">
                  <input
                    type="checkbox"
                    // checked={clearSelectionChecked}
                    checked={selectedImages.length > 0}
                    onChange={() => {
                      if (selectedImages.length > 0) {
                        setSelectedImages([]); // Clear selection
                      } else {
                        setSelectedImages(images.map((image) => image.id)); // Select all images
                      }
                    }}
                  />{" "}
                  <div className="">{selectedImages.length} Files Selected</div>
                </label>
              </div>
            </h1>
          ) : (
            <h1 className="text-2xl font-bold">Gallery</h1>
          )}
        </div>
        <div>
          <div className="mt-2 flex">
            <button
              onClick={deleteSelectedImages}
              className="px-4 text-red-500 font-semibold cursor-pointer mr-4"
              hidden={selectedImages.length === 0}
            >
              Delete files
            </button>
            {/* <span
              onClick={toggleReorder}
              className="px-4 text-blue-500 font-semibold cursor-pointer mr-4"
            >
              {isReordering ? "Done" : "Reorder"}
            </span> */}
          </div>
        </div>
      </div>

      <div
        className={`grid grid-cols-2 md:grid-cols-5 sm:grid-cols-3 ${
          images.length > 4 ? "sm:grid-rows-3" : "sm:grid-rows-1"
        } pt-8 px-6 h-auto`}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-[12rem] sm:mb-4 px-2 cursor-pointer relative  ${
              index === 0 && images.length > 5
                ? "sm:col-span-2 sm:row-span-2"
                : "sm:col-span-1"
            } `}
            onClick={() => toggleSelectImage(image.id)}
          >
            {/* {selectedImages.includes(image.id) && (
              <div className="absolute top-2 right-2 z-20 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                X
              </div>
            )} */}
            <div className="absolute top-2 right-[9.5rem] z-20">
              <input
                type="checkbox"
                checked={selectedImages.includes(image.id)}
                onChange={() => toggleSelectImage(image.id)}
              />
            </div>
            <Image
              image={image}
              //   className={`${
              //     index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
              //   } relative`}
              images={images}
              index={index}
              selectedImages={selectedImages}
              draggable="true"
              onDragStart={() => handleDragStart(image)}
              onDragEnd={handleDragEnd}
              onDragOver={() => handleDragOver(image)}
            />
          </div>
        ))}

        <label className="bg-slate-100 mx-4 w-[11rem] h-[11rem] rounded-lg border-2 border-dotted border-slate-400 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            multiple
            className="hidden"
          />
          <div>
            <div className="h-10 w-10 mx-auto mt-14">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                viewBox="0 0 24 24"
                id="image"
              >
                <path d="M19,2H5C3.3438721,2.0018311,2.0018311,3.3438721,2,5v9.0683594V19c0.0018311,1.6561279,1.3438721,2.9981689,3,3h14c0.182312-0.0002441,0.3621216-0.0219727,0.5395508-0.0549316c0.0661011-0.012085,0.1291504-0.0303345,0.1936646-0.0466919c0.1060181-0.0270996,0.210083-0.0586548,0.3125-0.097229c0.0744629-0.0278931,0.1471558-0.0571289,0.218689-0.0906372c0.0839844-0.0395508,0.1642456-0.0853882,0.2444458-0.1327515c0.0751953-0.0441895,0.1511841-0.0856323,0.2219849-0.1359863c0.0057983-0.0041504,0.0123901-0.006897,0.0181885-0.0111084c0.0074463-0.0053711,0.013855-0.0120239,0.0209961-0.0178223c0.0136719-0.0110474,0.0308228-0.0164795,0.043335-0.0289917c0.0066528-0.0066528,0.008728-0.015564,0.0148926-0.0224609C21.5355225,20.8126221,21.9989624,19.9642944,22,19v-2.9296875V5C21.9981689,3.3438721,20.6561279,2.0018311,19,2z M19.5749512,20.9053955C19.3883667,20.9631958,19.1954956,20.9998779,19,21H5c-1.1040039-0.0014038-1.9985962-0.8959961-2-2v-4.7246094l3.7626953-3.7626953c0.684021-0.6816406,1.7905884-0.6816406,2.4746094,0l3.4048462,3.404541c0.0018921,0.0019531,0.0023804,0.0045776,0.0043335,0.0065308l6.9689941,6.9689941C19.6020508,20.8971558,19.588501,20.9012451,19.5749512,20.9053955z M21,19c-0.0006714,0.5162964-0.2020264,0.9821777-0.5234375,1.3369751l-6.7684326-6.7678223l1.055542-1.055481c0.6912231-0.6621094,1.7814331-0.6621094,2.4726562,0L21,16.2773438V19z M21,14.8632812l-3.0566406-3.0566406c-1.0737305-1.0722656-2.8129883-1.0722656-3.8867188,0l-1.055542,1.055542L9.9443359,9.8056641c-1.0744629-1.0722656-2.814209-1.0722656-3.8886719,0L3,12.8613281V5c0.0014038-1.1040039,0.8959961-1.9985962,2-2h14c1.1040039,0.0014038,1.9985962,0.8959961,2,2V14.8632812z M13.5,6C12.6715698,6,12,6.6715698,12,7.5S12.6715698,9,13.5,9c0.828064-0.0009155,1.4990845-0.671936,1.5-1.5C15,6.6715698,14.3284302,6,13.5,6z M13.5,8C13.223877,8,13,7.776123,13,7.5S13.223877,7,13.5,7c0.2759399,0.0005493,0.4994507,0.2240601,0.5,0.5C14,7.776123,13.776123,8,13.5,8z"></path>
              </svg>
            </div>
            <div className="w-full text-center text-sm mt-2"> Add Images</div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ImageGalleryDemo;

// eslint-disable-next-line react/prop-types
const GalleryItem = ({
  image,
  index,
  isSelected,
  onToggleSelect,
  onDragStart,
  onDragEnter,
  onDragEnd,
  isDragging,
}) => {
  const isFeatureImage = index === 0; // The first image is the 'featured' one

  return (
    <div
      className={`relative group cursor-grab rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out
        ${isFeatureImage ? "col-span-2 row-span-2" : ""}
        ${
          isSelected
            ? "ring-4 ring-blue-500 ring-offset-2"
            : "hover:scale-[1.02]"
        }
        ${
          isDragging
            ? "opacity-50 border-2 border-dashed border-blue-500 transform scale-98"
            : ""
        }
      `}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragEnter={(e) => onDragEnter(e, index)}
      onDragEnd={onDragEnd}
      onClick={() => onToggleSelect(image.id)}
    >
      <img
        src={image.src}
        alt={image.title}
        // --- IMPORTANT CHANGE HERE ---
        // Removed fixed heights like h-52, h-32.
        // Let the parent's aspect-ratio and w-full h-full on img manage sizing.
        className={`w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out
          ${isSelected ? "brightness-75" : ""}
        `}
      />
      {/* Overlay for hover and selection */}
      <div
        className={`absolute inset-0 flex items-start justify-start p-3 transition-opacity duration-300 ease-in-out rounded-lg
          ${
            isSelected
              ? "opacity-100 bg-black bg-opacity-40"
              : "opacity-0 group-hover:opacity-100 group-hover:bg-black group-hover:bg-opacity-20"
          }
        `}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation(); // Prevent click from propagating to parent div
            onToggleSelect(image.id);
          }}
          className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-blue-950 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-sm font-semibold truncate">{image.title}</p>
      </div>
    </div>
  );
};

export default GalleryItem;

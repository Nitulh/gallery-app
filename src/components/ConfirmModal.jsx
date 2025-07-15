// eslint-disable-next-line react/prop-types
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    // Check this outermost div: It should cover the whole screen and be visible.
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        // Remove animation classes initially to rule them out
        // className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-sm transform scale-95 opacity-0 animate-scale-in"
        // style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-sm" // Simpler classes
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {title || "Confirm Action"}
        </h3>
        <p className="text-gray-700 mb-6">
          {message || "Are you sure you want to proceed?"}
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-200 ease-in-out"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 ease-in-out"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;



// eslint-disable-next-line react/prop-types
const DeletetionModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-overlay absolute w-full h-full bg-gray-800 opacity-50"></div>
        <div className="modal-container bg-white w-1/2 md:w-1/3 rounded-lg shadow-lg z-50">
          <div className="modal-content p-4">
            <p className="text-lg font-bold mb-4">Confirmation</p>
            <p className="text-gray-700">
              Are you sure you want to delete this image?
            </p>
            <div className="flex justify-end mt-6">
              <button
                onClick={onConfirm}
                className="px-4 py-2 mr-4 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };


export default DeletetionModal;

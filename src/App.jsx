// eslint-disable-next-line react/prop-types
import ImageGallery from "./components/ImageGallery.jsx";
import HeroSection from "./components/HeroSection.jsx"; // Ensure this matches the actual file name
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <HeroSection />
      <main className="container mx-auto px-4 py-8">
        <ImageGallery />
      </main>
    </div>
  );
}

export default App;

const HeroSection = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 shadow-lg">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 leading-tight tracking-tight">
          Your Moment Gallery
        </h1>
        <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
          Capture, organize, and cherish your memories. Drag & drop to reorder,
          select multiple to delete.
        </p>
      </div>
    </header>
  );
};

export default HeroSection;

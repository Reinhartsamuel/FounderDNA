export default function LandingScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 transition-opacity duration-700">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight">
          FounderDNA
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
          Discover your FounderDNA — the way you naturally build, lead, and create.
        </p>
        <button
          onClick={onStart}
          className="mt-8 px-8 py-4 bg-white text-black text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105"
        >
          Start Test
        </button>
      </div>
    </div>
  );
}

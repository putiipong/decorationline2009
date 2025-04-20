"use client";

const LandingPage = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <iframe
        src="https://www.youtube.com/embed/R4KmpfpY8fY?autoplay=1&mute=1&loop=1&playlist=R4KmpfpY8fY"
        allow="autoplay; encrypted-media"
        title="Background Video"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        frameBorder="0"
      ></iframe>

      {/* Overlay */}
      <div className="absolute inset-0 transition bg-opacity-50"></div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Welcome to Your Dream Design Space
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl">
        Transforming Ideas Into Reality.
        </p>
        {/* <button className="mt-8 px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-md">
          Learn More
        </button> */}
      </div>
    </section>
  );
};

export default LandingPage;

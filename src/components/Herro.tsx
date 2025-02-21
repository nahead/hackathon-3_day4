import Image from "next/image";

export default function Hero() {
  return (
    <main className="bg-[#F2F0F1] px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between max-w-screen-2xl mx-auto">
      {/* Left Section */}
      <div className="w-full md:w-[50%] lg:w-[45%] space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
          FIND CLOTHES THAT MATCH YOUR STYLE
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
        </p>
        <div className="flex justify-center md:justify-start">
          <button className="bg-black text-white text-sm font-medium py-3 px-6 rounded-full transition-all duration-300 hover:bg-gray-800">
            Shop Now
          </button>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center md:justify-start flex-wrap md:flex-nowrap gap-6 mt-6">
          <div className="text-center md:text-left border-r pr-4">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900">700+</h1>
            <p className="text-xs md:text-sm text-gray-600">International Brands</p>
          </div>
          <div className="text-center md:text-left border-r pr-4">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900">2,000+</h1>
            <p className="text-xs md:text-sm text-gray-600">High-Quality Products</p>
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900">30,000+</h1>
            <p className="text-xs md:text-sm text-gray-600">Happy Customers</p>
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="relative w-full md:w-[50%] flex justify-center">
        {/* Transparent Background Image */}
        <Image 
          src="/profile.png"
          className="w-[320px] sm:w-[400px] md:w-[500px] lg:w-[550px] h-auto rounded-xl object-contain drop-shadow-lg"
          width={550} height={650}
          alt="Hero Image"
        />
        
        {/* Floating Decorative Stars */}
        <Image 
          src="/star.png"
          className="w-[50px] sm:w-[70px] absolute top-[20px] right-4 sm:right-10 animate-spin"
          width={70} height={70}
          alt="Star Decoration"
        />
        <Image 
          src="/star.png"
          className="w-[40px] sm:w-[60px] absolute top-[200px] left-2 sm:left-[-20px] animate-spin "
          width={60} height={60}
          alt="Star Decoration"
        />
      </div>
    </main>
  );
}

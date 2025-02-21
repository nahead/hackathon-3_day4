export default function FontShowcase() {
  const brands = ["Versace", "Zara", "Gucci", "Prada", "Calvin Klein"];

  return (
    <div className="bg-black w-full py-4 md:py-6 flex flex-wrap justify-center md:justify-between items-center px-6 max-w-screen-2xl mx-auto">
      {brands.map((brand, index) => (
        <h1 key={index} className="text-xl sm:text-2xl md:text-4xl text-white font-bold mx-3">
          {brand}
        </h1>
      ))}
    </div>
  );
}

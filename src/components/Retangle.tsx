

export default function FontShowcase() {
  return (
    <div className="bg-black w-full h-[100px] md:h-[90px] flex flex-wrap justify-evenly md:justify-between p-8 text-center space-x-3 max-w-screen-2xl mx-auto">
      <h1 className={` text-2xl md:text-4xl text-white font-bold`}>Versace</h1>
      <h1 className={` text-2xl md:text-4xl text-white font-bold`}>Zara</h1>
      <h1 className={` text-2xl md:text-4xl text-white font-bold`}>Gucci</h1>
      <h1 className={` text-2xl md:text-4xl text-white font-extrabold`}>Prada</h1>
      <h1 className={` text-2xl md:text-4xl text-white`}>Calvin Klein</h1>
    </div>
  );
}

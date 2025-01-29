import { Playfair_Display, Cinzel, Prata, Montserrat, Bodoni_Moda } from "next/font/google";

// Load Fonts
const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });
const cinzel = Cinzel({ subsets: ["latin"], weight: "400" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: "700" });
const prata = Prata({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });

export default function FontShowcase() {
  return (
    <div className="bg-black w-full h-[100px] md:h-[90px] flex flex-wrap justify-evenly md:justify-between p-8 text-center space-x-3 max-w-screen-2xl mx-auto">
      <h1 className={`${playfair.className} text-2xl md:text-4xl text-white font-bold`}>Versace</h1>
      <h1 className={`${bodoni.className} text-2xl md:text-4xl text-white font-bold`}>Zara</h1>
      <h1 className={`${cinzel.className} text-2xl md:text-4xl text-white font-bold`}>Gucci</h1>
      <h1 className={`${prata.className} text-2xl md:text-4xl text-white font-extrabold`}>Prada</h1>
      <h1 className={`${montserrat.className} text-2xl md:text-4xl text-white`}>Calvin Klein</h1>
    </div>
  );
}

import Image from "next/image";

export default function Dress() {
  return (
    <main id="brands">
      <div className="w-full flex justify-center items-center mt-10 mb-1 max-w-screen-2xl mx-auto">
        {/* Container */}
        <div className="w-[90%] md:w-[80%] bg-[#F0F0F0] p-5 rounded-2xl">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-black text-2xl md:text-4xl font-extrabold pt-4">
              BROWSE BY DRESS STYLE
            </h1>
          </div>

          {/* Dress Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7 place-items-center">
            {[
              { title: "Casual", img: "/dress1.png" },
              { title: "Formal", img: "/dress2.png" },
              { title: "Party", img: "/dress3.png" },
              { title: "Gym", img: "/dress5.png" },
            ].map((item, index) => (
              <div key={index} className="relative bg-white w-full max-w-[350px] md:max-w-[550px] h-[250px] rounded-2xl shadow-lg">
                <h1 className="absolute left-6 top-6 text-xl font-bold bg-white px-3 py-1 rounded-md shadow-md">
                  {item.title}
                </h1>
                <Image src={item.img} alt={item.title} width={500} height={500} className="w-full h-full object-cover rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

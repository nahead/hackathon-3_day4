// import Image from "next/image";
// import { FaRegStar, FaStar } from "react-icons/fa";
// import { IoAdd } from "react-icons/io5";
// import { CgMathMinus } from "react-icons/cg";
// import { FaCheck } from "react-icons/fa6";
// import { BreadcrumbCollapsed } from "@/components/Breadcrupm";


// export default function T_hirt(){
//     return(

//        <main className="flex  flex-col sm:flex-row justify-center p-2 sm:space-x-4 items-start mt-4 ">
//           {/* left side */}
//          <div className="flex w-full sm:w-[200px] items-center justify-center  sm:justify-start h-full sm:space-y-4  sm:flex-col order-2 sm:order-1 mt-3 space-x-3">
//             <div className="w-[110px] sm:w-[140px] h-[120px] sm:h-[150px]  flex justify-center items-center rounded-[16px]">
//                 <Image src={"/images/t-shirt3.png"} className="w-full h-full"  width={600} height={600} alt="t-shirt"></Image>
//             </div>
//             <div className="w-[110px] sm:w-[140px] h-[120px] sm:h-[150px]   flex justify-center items-center rounded-[16px]">

//                 <Image src={"/images/t-shirt1.png"}  className="w-full h-full" width={600} height={600} alt="t-shirt"></Image>
//             </div>
//             <div className="w-[110px] sm:w-[140px] h-[120px] sm:h-[150px]  flex justify-center items-center rounded-[16px]">

//                 <Image src={"/images/t-shirt2.png"} className="w-full h-full" width={600} height={600} alt="t-shirt"></Image>
//             </div>
//          </div>
//          {/* mid div */}
//          <div className="w-full flex  justify-center items-center sm:w-[500px] h-[480px] order-1 sm:order-2">
//          <Image src={"/images/t-shirt3.png"} className="w-full h-full" width={600} height={600} alt="t-shirt"></Image>
//          </div>
//          {/* right div */}
//          <div className="w-full sm:w-[500px]  space-y-6 order-3">
//             <h1 className="text-black text-4xl md:text-4xl  font-extrabold pt-4">One Life Graphic T-shirt</h1>
//                 <div className="flex space-x-1 mt-1 ml-1 text-yellow-400  ">
//                       <FaStar/>
//                       <FaStar/>
//                       <FaStar/>
//                       <FaStar/>
//                       <FaStar/>
//                       <span className='text-gray-400 '>4.5/5</span>

//                  </div>
//                      <span className="text-black font-bold text-xl">$240</span> <span className="text-gray-400 font-bold line-through ml-2">$160</span><span className='bg-red-600 px-2 py-1 rounded-[10px] ml-4 text-red-600 text-xs '>-40%</span>
//                      <p className="text-gray-400 text-sm">This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.</p>
//                      {/* color div */}
//                      <div>
//                         <h2>Select Colors</h2>
//                         <div className="flex justify-start space-x-3">
//                             <div className="w-[40px] h-[40px] flex justify-center items-center hover:cursor-pointer bg-[#4F4631] rounded-full"><FaCheck className="text-white opacity-0 hover:opacity-600"/></div>
//                             <div className="w-[40px] h-[40px] flex justify-center items-center hover:cursor-pointer bg-[#314F4A] rounded-full"><FaCheck className="text-white opacity-0 hover:opacity-600"/></div>
//                             <div className="w-[40px] h-[40px] flex justify-center items-center hover:cursor-pointer bg-[#314F4A] rounded-full"><FaCheck className="text-white opacity-0 hover:opacity-600"/></div>
//                         </div>
//                      </div>
//                      {/* choose color */}
//                      <div>
//                         <h3>Choose Size</h3>
//                         <div className="flex justify-start space-x-4 ">
//                             <div className="w-[85px] h-[40px] bg-[#e5e5e5] text-gray-400 hover:bg-black hover:text-white hover:cursor-pointer rounded-[16px] flex justify-center items-center">Small</div>
//                             <div className="w-[85px] h-[40px] bg-[#e5e5e5] text-gray-400 hover:bg-black hover:text-white hover:cursor-pointer rounded-[16px] flex justify-center items-center">Medium</div>
//                             <div className="w-[85px] h-[40px] bg-[#e5e5e5] text-gray-400 hover:bg-black hover:text-white hover:cursor-pointer rounded-[16px] flex justify-center items-center">Large</div>
//                             <div className="w-[85px] h-[40px] bg-[#e5e5e5] text-gray-400 hover:bg-black hover:text-white hover:cursor-pointer rounded-[16px] flex justify-center items-center">X-Large</div>
//                         </div>
//                      </div>
//                      {/* add to car btn */}
//                      <div className="flex space-x-3">
//                         <div className="w-[120px] h-[35px] bg-[#e5e5e5] text-gray hover:cursor-pointer rounded-[16px] flex justify-between p-3 items-center">
//                             <CgMathMinus className="text-xl text-gray-500"/>
//                             <span>1</span>
//                             <IoAdd className="text-xl text-gray-500"/>
//                         </div>
//                         {/* btn */}
//                         <button className="w-[50%] text-sm bg-black text-white py-2 px-8 rounded-[20px]" >Add to Cart</button>

//                      </div>
//             </div>
          

        
//        </main>
       
//     )
// }
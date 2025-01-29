import { FaStar, FaRegStar } from 'react-icons/fa'; // Import icons from FontAwesome via react-icons

import Image from "next/image"
import Link from 'next/link';





export default function NewArivel(){
    return (
        <main id='arival'>
         <div className="w-full flex justify-center items-center mt-10 mb-1 max-w-screen-xl mx-auto">
            {/* container */}
            <div className="md:w-[80%] p-3 md:p-0">
                {/* container boxes */}
                <div className="flex justify-center items-center">
                   
                    <h1 className="text-black text-4xl md:text-4xl  font-extrabold pt-4">NEW ARRIVALS</h1> 
                    
                </div>
                <div className="flex sm:flex-wrap justify-between mt-7">
                    {/* box1 */}
                  

                    <div>
                    <Link href={"/product/productDetail"}>
                    <div className="group shadow-md w-[160px] md:w-[195px] h-[200px] md:h-[200px] rounded-[16px] bg-neutral-100  flex justify-center items-center cursor-pointer relative">
                  {/* Image */}
                  <Image
                    src={"/images/arrival-img1.png"}
                    width={150}
                    height={100}
                    alt="game-images "
                    className='shadow-lg w-full h-full rounded-[16px]'
                  />
                 
                  {/* Add to Cart */}
                  <button className=" w-full absolute bottom-0   bg-black text-white px-4 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Add to Cart
                  </button>
                 </div>
                </Link>
                    <h1 className="font-bold font-sans pt-2  ">T-Shirt With Tape Details</h1>                    
                    <div className="flex space-x-1 mt-1 ml-1 text-yellow-400  ">
                      <FaStar/>
                      <FaStar/>
                      <FaStar/>
                      <FaRegStar /> {/* Empty star */}
                      <span className='text-gray-400'>4.5/5</span>

                     </div>
                     <span className="text-black font-bold">$120</span> 

                    </div>
                
                    {/* box2 */}
               
                   <div>
                   <Link href={"/product/productDetail"}>
                    <div className="group shadow-md w-[160px] md:w-[195px] h-[200px] md:h-[200px] rounded-[16px] bg-neutral-100  flex justify-center items-center cursor-pointer relative">
                  {/* Image */}
                 
                  <Image
                    src={"/images/arrival-img2.png"}
                    width={150}
                    height={100}
                    alt="game-images"
                    className='shadow-lg w-full h-full rounded-[16px]'
                  />
                 
                  {/* Add to Cart */}
                  <button className=" w-full absolute bottom-0   bg-black text-white px-4 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Add to Cart
                  </button>
                 </div>
                 </Link>

                    <h1 className="font-bold font-sans pt-2 ">Skinny Fit Jeans</h1>                    
                    <div className="flex space-x-1 mt-1 ml-1 text-yellow-400  ">
                      <FaStar/>
                      <FaStar/>
                      <FaStar/>
                      <FaRegStar /> {/* Empty star */}
                      <span className='text-gray-400'>3.5/5</span>

                     </div>
                     <span className="text-black font-bold">$240</span> <span className="text-gray-400 font-bold line-through ml-2">$160</span><span className='bg-red-100 px-2 py-1 rounded-[10px] ml-4 text-red-600 text-xs '>-40%</span>

                    </div>
                  
                     {/* box3 */}
                     <div className='hidden md:block'>
                     <Link href={"/product/productDetail"}>

                    <div className="group shadow-md w-[160px] md:w-[195px] h-[200px] md:h-[200px] rounded-[16px] bg-neutral-100  flex justify-center items-center cursor-pointer relative">
                  {/* Image */}
                
                  <Image
                    src={"/images/arrival-img3.png"}
                    width={150}
                    height={100}
                    alt="game-images"
                    className='shadow-lg w-full rounded-[16px]'
                  />
                  
                  {/* Add to Cart */}
                  <button className=" w-full absolute bottom-0   bg-black text-white px-4 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Add to Cart
                  </button>
                 </div>
                 </Link>
                    <h1 className="font-bold font-sans pt-2 ">Checkered Shirt</h1>                    
                    <div className="flex space-x-1 mt-1 ml-1 text-yellow-400  ">
                      <FaStar/>
                      <FaStar/>
                      <FaStar/>
                      <FaRegStar /> {/* Empty star */}
                      <span className='text-gray-400'>4.5/5</span>

                     </div>
                     <span className="text-black font-bold">$120</span> 

                    </div>
                    {/* box 4 */}
                     <div className='hidden md:block'>
                     <Link href={"/product/productDetail"}>
                    <div className="group shadow-md w-[160px] md:w-[195px] h-[200px] md:h-[200px] rounded-[16px] bg-neutral-100  flex justify-center items-center cursor-pointer relative">
                  {/* Image */}
                 <Image
                    src={"/images/arrival-img4.png"}
                    width={150}
                    height={100}
                    alt="game-images"
                    className='shadow-lg w-full rounded-[16px]'
                  />

                  {/* Add to Cart */}
                  <button className=" w-full absolute bottom-0   bg-black text-white px-4 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Add to Cart
                  </button>
                 </div>
                 </Link>

                    <h1 className="font-bold font-sans pt-2 ">Sleeve Striped T-Shirt</h1>                    
                    <div className="flex space-x-1 mt-1 ml-1 text-yellow-400  ">
                      <FaStar/>
                      <FaStar/>
                      <FaStar/>
                      <FaRegStar /> {/* Empty star */}
                      <span className='text-gray-400'>4.5/5</span>

                     </div>
                     <span className="text-black font-bold">$240</span> <span className="text-gray-400 font-bold line-through ml-2">$160</span><span className='bg-red-100 px-2 py-1 rounded-[10px] ml-4 text-red-600 text-xs '>-40%</span>

                    </div>
                   
                </div>
            </div>
         </div>
        <div className='w-full flex justify-center items-center'>
        <div className='w-[80%] flex justify-center  border-b-2 border-neutral-100 pb-10 mt-7'>
        <button className="w-full md:w-[160px] text-sm border   py-2 px-10 rounded-[20px]" >View All</button>

        </div>
        </div>
    
         </main>
    )
}

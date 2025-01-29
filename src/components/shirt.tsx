'use client'
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

import { RiArrowDropDownLine } from "react-icons/ri";
import { client } from "@/sanity/lib/client";

import { useState, useEffect } from "react";

interface Iproducts {
    name: string;
    price: string;
    _id: number;
    rating?: string;
    description: string;
    old_price?: string;
    imageUrl: string;
  }
// Adding key prop in star array
let star = [
    <FaStar key={1} />,
    <FaStar key={2} />,
    <FaStar key={3} />,
    <FaStar key={4} />,
    <FaStar key={5} />,
  ];
  
export default function Shirt(){
     const [products, setProducts] = useState<Iproducts[]>([]);
    
      useEffect(() => {
        const fetchPro = async () => {
          const query = `
            *[_type=="products"] {
              _id,
              name,
              description,
              price,
              "imageUrl": image.asset->url
            }
          `;
          try {
            const fetchedPro = await client.fetch(query);
            setProducts(fetchedPro);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
        fetchPro();
      }, []);
    
    
    return(
        <div className="w-full ">
            <h1 className="text-[25px] font-bold  relative pl-5">Casual <span className=" text-sm font-bold  flex items-center justify-center absolute right-10 top-2">Most Popular <RiArrowDropDownLine/></span></h1>
            <div className="grid grid-cols-2 md:grid-cols-3 p-2 md:p-0 md:place-items-center">
                {/* flex flex-col md:flex-row justify-center items-center md:justify-between px-8 mt-10 */}
                {
                    products.map((data)=>{
                        return(
                              <div className={` ${data._id === 3 ? 'hidden' : 'hiddin'} md:block mb-6 mt-1`} >
                                 <Link href={`/product/${data._id}`} key={data._id}>
                                 <div className="w-[160px] md:w-[240px] md:h-[240x] lg:w-[290px] h-[160px] lg:h-[290px] bg-[#F0EEED] rounded-[20px]" key={data._id}>
                                  <Image src={data.imageUrl} alt={data.name}
                                  className="w-full h-full rounded-[20px]"
                                 width={600} height={600}></Image>
                                 
                                  </div>
                                 </Link>
                                <div>
                                <p className="text-sm md:text-lg mt-2 font-bold" key={data._id}>{data.name}</p>
                                {/* <p className="flex text-yellow-400">{star}</p> */}
                                <div className="flex text-yellow-400">
                                 {/* Map stars correctly */}
                                 {star.map((icon, index) => (
                                   <span key={index}>{icon}</span>
                                 ))}
                               </div>
                                <p  className="font-bold mt-1" key={data._id}>{data.price} <span className="text-gray-400 font-bold line-through"> {data.old_price} </span></p>
                                </div>
                              </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
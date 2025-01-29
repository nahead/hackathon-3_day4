'use client'
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

interface Iproducts{
name:string,
    price:string,
    _id:number
    rating?:string,
    old_price?:string
    imageUrl:string
}


// Adding key prop in star array
let star = [
    <FaStar key={1} />,
    <FaStar key={2} />,
    <FaStar key={3} />,
    <FaStar key={4} />,
    <FaStar key={5} />,
  ];
  

export default function T_shirts(){
     const [products, setProducts] = useState<Iproducts[]>([]);
    
      useEffect(() => {
        const fetchPro = async () => {
          const query = `
            *[_type=="products"][6..9] {
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
        <div className="w-full h-full md:h-[500px] mt-10 max-w-screen-2xl  mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center">You might also like</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 pl-3 md:pl-0 mt-5 md:place-items-center">
                {
                    products.map((data)=>{
                        return(
                              
                                  <Link href={`/product/${data._id}`} key={data._id} >
                                 <div className="w-[160px] h-[160px] md:w-[290px] mt-5 md:mt-0 md:h-[290px] bg-[#F0EEED] rounded-[20px]">
                                  <Image src={data.imageUrl} alt={data.name}
                                  className="w-full h-full rounded-[20px]"
                                 width={500} height={500}></Image>
                                 
                                  </div>
                                  <div>
                                <p className="text-lg mt-2 font-bold md:line-clamp-1 w-auto md:w-72" key={data._id}>{data.name}</p>
                                {/* <p className="flex text-yellow-400" key={index}>{star}</p> */}
                                <div className="flex text-yellow-400">
                                 {/* Map stars correctly */}
                                 {star.map((icon, index) => (
                                   <span key={index}>{icon}</span>
                                 ))}
                               </div>
                                <p  className="font-bold mt-1" key={data._id}>{data.price} <span className="text-gray-400 font-bold line-through"> {data.old_price} </span></p>
                                </div>
                                 </Link>
                            
                       
                        )
                    })
                }
            </div>
        </div>
    )
}
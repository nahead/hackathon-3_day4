'use client';
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaStar } from "react-icons/fa";

import { Product } from "@/types/products";




let star = [
  <FaStar key={1} />,
  <FaStar key={2} />,
  <FaStar key={3} />,
  <FaStar key={4} />,
  <FaStar key={5} />,
];

export default function Products() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchPro = async () => {
      const query = `
        *[_type=="products"][10..13] {
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


  return (

    <>
        <div className="w-full h-full  mt-10 max-w-screen-xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center">NEW ARRIVALS</h1>
            <div className="relative  mt-10 overflow-x-auto flex space-x-5 px-8 ">
                {products.map((data) => {
                    return (<div>
           <Link href={`/product/${data._id}`} key={data._id}>
                            
                                <div className="w-[200px] md:w-[283px] h-[200px] md:h-[290px] bg-[#F0EEED] rounded-[20px]">
                                    <Image
                                        src={data.imageUrl}
                                        alt={data.name}
                                        className="w-full h-full rounded-[20px]"
                                        width={500}
                                        height={500}
                                    />
                                    <h2 className="font-bold text-xl mt-1 ml-2 line-clamp-1">{data.name}</h2>
                                </div>
                                <div className="pl-2">
                 
                 <div className="flex text-yellow-400 mt-8 ">
                     {star.map((icon, index) => (
                         <span key={index}>{icon}</span>
                     ))}
                 </div>
                 <p className="font-bold mt-1 ">
                     ${data.price}
                  
                 </p>
             </div>
            
                            </Link>
                        
                        </div>
                          
                        
                    );
                })}
            </div>
        </div>
        <div className="flex justify-center items-start mt-5">
        <Link href="/casual">
        <Button variant={"outline"} className=" sm:mt-0 w-[80%]  sm:w-[200px] rounded-[20px]">View all</Button>
        </Link> 
        </div>
        </>
  );
}


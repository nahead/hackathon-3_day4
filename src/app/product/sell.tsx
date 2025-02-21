'use client';
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaStar } from "react-icons/fa";
import { Product } from "@/types/products";

// Star Ratings
const stars = Array(5).fill(<FaStar className="text-yellow-400" />);

export default function TopSell() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchPro = async () => {
      const query = `
        *[_type=="products"][1..4] {
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
    <div className="w-full max-w-screen-xl mx-auto mt-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center">TOP SELL</h1>

      {/* Scrollable Product List */}
      <div className="relative mt-10 flex overflow-x-auto space-x-5 px-6 scrollbar-hide">
        {products.map((data) => (
          <Link href={`/product/${data._id}`} key={data._id} className="flex-shrink-0">
            <div className="w-[200px] md:w-[280px] bg-[#F0EEED] rounded-xl overflow-hidden">
              <Image
                src={data.imageUrl}
                alt={data.name}
                className="w-full h-[200px] md:h-[280px] object-cover rounded-xl"
                width={500}
                height={500}
              />
            </div>
            <div className="mt-2 px-2">
              <h2 className="font-semibold text-lg line-clamp-1 w-60">{data.name}</h2>
              <div className="flex mt-1">{stars}</div>
              <p className="font-bold text-lg mt-1">${data.price}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-5">
        <Link href="/casual">
          <Button variant="outline" className="w-[80%] sm:w-[200px] rounded-xl">
            View All
          </Button>
        </Link>
      </div>
    </div>
  );
}

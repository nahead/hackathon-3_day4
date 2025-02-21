"use client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

interface Iproducts {
  name: string;
  price: string;
  _id: number;
  rating?: string;
  old_price?: string;
  imageUrl: string;
}

export default function T_shirts() {
  const [products, setProducts] = useState<Iproducts[]>([]);

  useEffect(() => {
    const fetchPro = async () => {
      const query = `
        *[_type=="products"][6..9] {
          _id,
          name,
          description,
          price,
          old_price,
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
    <div className="w-full h-full mt-10 max-w-screen-2xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">
        You Might Also Like
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
        {products.map((product) => (
          <Link href={`/product/${product._id}`} key={product._id} className="group">
            <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] bg-gray-100 rounded-2xl overflow-hidden shadow-md transition-transform transform hover:scale-105">
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain rounded-2xl"
                width={500}
                height={500}
                priority
              />
            </div>

            <div className="mt-3 text-center">
              <p className="text-lg font-semibold text-gray-800 truncate">{product.name}</p>

              <div className="flex justify-center text-yellow-400 mt-1">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>

              <p className="text-lg font-bold mt-1 text-gray-900">
                ${product.price}
                {product.old_price && (
                  <span className="text-gray-500 font-medium line-through text-sm ml-2">
                    ${product.old_price}
                  </span>
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

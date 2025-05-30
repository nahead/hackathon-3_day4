'use client'
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { Dressstyle } from "./dreesstyle";
import { CheckboxDemo } from "./checkbox";
import { AccordionDemo } from "./(a)/accordin";
import { BreadcrumbCollapsed } from "./Breadcrupm";

interface Iproducts {
  name: string;
  price: number;
  _id: number;
  rating?: string;
  description: string;
  old_price?: string;
  imageUrl: string;
  category?: string;
}

const star = new Array(5).fill(0).map((_, i) => <FaStar key={i} className="text-yellow-400" />);

export default function Shirt() {
  const [products, setProducts] = useState<Iproducts[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Iproducts[]>([]);
  const [priceRange, setPriceRange] = useState<number>(300);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type=="products"] {
        _id, name, description, price, "imageUrl": image.asset->url, category
      }`;
      try {
        const fetchedProducts = await client.fetch(query);
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) => product.price <= priceRange);
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [products, priceRange, selectedCategory]);

  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <BreadcrumbCollapsed />

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-6 mt-5">
        {/* Left Sidebar */}
        <div className="w-full md:w-[280px] bg-white shadow-lg rounded-lg p-5">
          <AccordionDemo />
          <div className="border-b pb-4 mb-4">
            <h1 className="text-lg font-semibold mb-2">Price</h1>
            <input type="range" min={5} max={500} className="w-full cursor-pointer" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} />
            <p className="mt-2 font-bold text-gray-700">{priceRange}</p>
          </div>
          <div className="border-b pb-4 mb-4">
            <h1 className="text-lg font-semibold mb-2">Color</h1>
            <CheckboxDemo />
          </div>
          <div className="border-b pb-4 mb-4">
            <h1 className="text-lg font-semibold mb-2">Size</h1>
            <div className="grid grid-cols-3 gap-2">
              {["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"].map((size) => (
                <div key={size} className="border py-2 px-4 text-center rounded-lg cursor-pointer hover:bg-black hover:text-white transition">
                  {size}
                </div>
              ))}
            </div>
          </div>
          <Dressstyle />
        </div>

        {/* Right Section - Products */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-bold">Casual</h1>
            <div className="relative">
              <button className="flex items-center gap-1 bg-gray-100 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition" onClick={() => setShowCategories(!showCategories)}>
                Most Popular <RiArrowDropDownLine />
              </button>
              {showCategories && (
                <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2 z-10">
                  {["shirt", "short", "hoodie", "tshirt","jeans"].map((category) => (
                    <li key={category} className="cursor-pointer px-4 py-2 hover:bg-gray-200" onClick={() => { setSelectedCategory(category); setShowCategories(false); }}>
                      {category}
                    </li>
                  ))}
                  <li className="cursor-pointer px-4 py-2 text-red-500 hover:bg-gray-200" onClick={() => { setSelectedCategory(null); setShowCategories(false); }}>
                    Clear Filter
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((data) => (
                <Link href={`/product/${data._id}`} key={data._id} className="block group">
                  <div className="relative w-full h-56 bg-gray-100 hover:bg-slate-400 rounded-lg overflow-hidden">
                    <Image src={data.imageUrl} alt={data.name} layout="fill" objectFit="cover" className="group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="mt-2">
                    <h2 className="text-lg font-semibold">{data.name}</h2>
                    <div className="flex">{star}</div>
                    <p className="font-bold mt-1">
                      ${data.price} <span className="text-gray-400 line-through ml-2">${data.old_price}</span>
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">No products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

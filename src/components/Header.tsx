'use client';
import Link from "next/link";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

import { SheetSide } from "./Humburgur";
import { NavigationMenuDemo } from "./navigationMenu";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";

export default function Header() {

 
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilterdProducts] = useState<any[]>([]);

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(`*[_type == "products"]{
          _id,
          name,
          category,
          price,
          image,
          description,
        }`);
        setProducts(data);
        setFilterdProducts(data); // Initialize with all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search query change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter products based on search query
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilterdProducts(filtered);
  };

  return (
    <header className="w-full border-b bg-white h-[60px] md:h-[90px] flex justify-between pr-2 items-center max-w-screen-2xl mx-auto">
      <div className="flex justify-center items-center">
        <SheetSide />
        {/* Logo */}
        <h1 className="text-2xl md:text-4xl font-extrabold pl-2">SHOP.CO</h1>
      </div>
      {/* Navigation bar */}
      <ul className="hidden sm:block">
        <li className="flex space-x-4 ml-4 mt-2 items-center">
          <Link href={``}><NavigationMenuDemo /></Link>
          <Link href={`/casual`}>On Sale</Link>
          <Link href={`/product`}>New Arrivals</Link>
          <Link href={`/brands`}>Brands</Link>
        </li>
      </ul>
      {/* Search bar */}
      <div className="ml-14 flex justify-center items-center">
        <div className="flex justify-start items-center lg:bg-[#F0F0F0] lg:w-[500px] h-[40px] pl-2 ml-12 md:ml-0 hover:border-none rounded-full">
          <IoIosSearch className="text-xl hidden lg:block" />
          <input
            placeholder="Search for products..."
            onChange={handleSearch}
            value={searchQuery}
            className="bg-[#F0F0F0] outline-none w-full h-full rounded-full ml-2 hidden lg:block"
          />
        </div>
      </div>
      {/* Right icons */}
      <div className="flex space-x-2 sm:space-x-4">
        <IoIosSearch className="text-xl lg:hidden" />
        <Link href={`/cart`}><IoCartOutline className="text-2xl" /></Link>
        <MdOutlineAccountCircle className="text-2xl" />
      </div>

      {/* Search results */}
      {searchQuery && filteredProducts.length > 0 && (
        <div className="absolute bg-white w-full border border-gray-300 rounded-md shadow-lg mt-2 z-10">
          <ul>
            {filteredProducts.map((product: any) => (
              <li
                key={product._id}
                className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer"
              >
                <Link href={`/product/${product._id}`}>
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

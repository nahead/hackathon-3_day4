'use client';
import Link from "next/link";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { SheetSide } from "./Humburgur";
import { useState, useEffect, useRef } from "react";
import { client } from "@/sanity/lib/client";
import { Product } from "@/types/products";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchResultsRef = useRef<HTMLDivElement | null>(null);

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
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter((product: Product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node)
      ) {
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full border-b bg-white h-[60px] md:h-[90px] flex justify-between pr-4 items-center max-w-screen-2xl mx-auto relative">
      {/* Logo */}
      <div className="flex justify-center items-center">
        <SheetSide />
   <Link href="/">
   <h1 className="text-2xl md:text-4xl font-extrabold pl-4 text-gray-800">
          SHOP.CO
        </h1>
   </Link>
      </div>

      {/* Navigation */}
      <ul className="hidden sm:flex space-x-4 ml-4 items-center">
        <Link href={`/casual`} className="text-gray-600 hover:text-gray-900">
          On Sale
        </Link>
        <Link href={`/product`} className="text-gray-600 hover:text-gray-900">
          New Arrivals
        </Link>
        <Link href={`/brands`} className="text-gray-600 hover:text-gray-900">
          Brands
        </Link>
      </ul>

      {/* Search Bar   */}
      <div className="flex items-center w-full md:w-auto ml-4 md:ml-8">
        <div className="flex items-center bg-gray-100 w-full md:w-[500px] h-[40px] pl-2 rounded-full shadow-sm">
          <IoIosSearch className="text-xl text-gray-500" />
          <input
            placeholder="Search for products..."
            onChange={handleSearch}
            value={searchQuery}
            className="bg-gray-100 outline-none w-full h-full rounded-full ml-2 p-2 text-sm"
          />
        </div>
      </div>

      {/* Icons  Section */}
      <div className="flex space-x-4 items-center">
        <Link href={`/cart`}>
          <IoCartOutline className="text-2xl text-gray-600" />
        </Link>
        <Link href={`/login`}>
          <MdOutlineAccountCircle className="text-2xl text-gray-600" />
        </Link>
      </div>

      {/* Search Results */}
      {searchQuery && filteredProducts.length > 0 && (
        <div
          ref={searchResultsRef}
          className="absolute bg-white w-[550px]  max-h-[300px] overflow-y-auto border border-gray-300 rounded-lg shadow-lg mt-6 z-10 "
        >
          <ul>
            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                href={`/product/${product._id}`}
                onClick={() => setSearchQuery("")}
              >
                <li className="px-4 py-3 text-gray-800 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                  <span>{product.name}</span>
                  <span className="text-sm text-gray-500">${product.price}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

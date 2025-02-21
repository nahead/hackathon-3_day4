"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Minus, Plus } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Correct import for navigation
import Swal from "sweetalert2";

import { Product } from "@/types/products";
import { addToCart } from "@/actions/action";

const starIcons = Array(5).fill(<FaStar />);

export default function ProductDetailsClient({ product }: { product: Product }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.imageUrl);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, product.quantity || 10));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!selectedColor) {
      setError("Please select a color.");
      return;
    }
    if (!selectedSize) {
      setError("Please select a size.");
      return;
    }

    setError("");

    const cartProduct = {
      ...product,
      selectedQuantity: quantity,
      selectedColor,
      selectedSize,
    };

    await addToCart(cartProduct, quantity);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${product.name} added to cart`,
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      router.push("/cart");
    }, 1500);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-12 grid gap-8 md:grid-cols-2">
      {/* Left - Image Section */}
      <div className="space-y-4 md:space-y-6">
        <div className="w-full">
          <Image
            src={selectedImage || "/default-image.jpg"}
            alt={product.name || "Product Image"}
            className="shadow-xl rounded-2xl w-full h-auto object-cover transition-transform hover:scale-105"
            width={500}
            height={500}
          />
        </div>
        {/* Thumbnails */}
        <div className="flex justify-start space-x-3 md:space-x-4 overflow-x-auto">
          {(product.images?.length ? product.images : Array(3).fill(product.imageUrl)).map((url, index) => (
            <Image
              key={index}
              src={url || "/default-image.jpg"}
              className={`w-[60px] sm:w-[80px] h-[60px] sm:h-[80px] rounded-xl shadow-md cursor-pointer transition-transform hover:scale-110 border-2 ${
                selectedImage === url ? "border-gray-700" : "border-transparent"
              }`}
              alt={product.name || "Product Image"}
              width={80}
              height={80}
              onClick={() => setSelectedImage(url)}
            />
          ))}
        </div>
      </div>

      {/* Right - Product Details */}
      <div className="space-y-5 md:space-y-6">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">{product.name}</h1>

        {/* Star Ratings */}
        <div className="flex text-yellow-400 text-lg space-x-1">
          {starIcons.map((icon, index) => (
            <span key={index}>{icon}</span>
          ))}
        </div>

        {/* Pricing */}
        <p className="text-xl md:text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{product.description}</p>

        {/* Color Selection */}
        {product.colors?.length > 0 && (
          <div className="py-3">
            <p className="text-md md:text-lg font-semibold text-gray-700">Select Color</p>
            <div className="flex space-x-3 mt-3">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  className={`w-9 h-9 md:w-10 md:h-10 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 flex items-center justify-center ${
                    selectedColor === color ? "border-gray-700" : "border-transparent"
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {selectedColor === color && <Check className="text-white" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Size Selection */}
        {product.sizes?.length > 0 && (
          <div>
            <p className="text-md md:text-lg font-semibold text-gray-700">Choose Size</p>
            <div className="flex space-x-2 sm:space-x-3 mt-3">
              {product.sizes.map((size, index) => (
                <div
                  key={index}
                  className={`w-16 sm:w-20 h-10 flex justify-center items-center rounded-lg cursor-pointer shadow-md transition-all ${
                    selectedSize === size ? "bg-gray-900 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 font-medium">{error}</p>}

        {/* Quantity & Add to Cart */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-6">
          {/* Quantity Selector */}
          <div className="flex items-center w-[120px] sm:w-[130px] justify-between bg-gray-200 p-2 rounded-lg shadow-md">
            <button onClick={decreaseQuantity} className="cursor-pointer text-gray-700 p-1">
              <Minus />
            </button>
            <span className="font-medium text-gray-800">{quantity}</span>
            <button onClick={increaseQuantity} className="cursor-pointer text-gray-700 p-1">
              <Plus />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

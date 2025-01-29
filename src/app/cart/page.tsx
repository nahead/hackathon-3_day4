"use client";

import { getCartItems, removeFromCart, updateCartQuantity } from "@/actions/action";
import { BreadcrumbCollapsed } from "@/components/Breadcrupm";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/products";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const router = useRouter();

  // Fetch cart items on component mount
  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  // Remove item from cart
  const handleRemove =  async (id: string) => {
    const confirmed =  Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    });

    if ((await confirmed).isConfirmed) {
      removeFromCart(id);
      setCartItems(getCartItems());
      Swal.fire("Deleted!", "Your item has been deleted.", "success");
    }
  };

  // Update cart item quantity
  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const increment = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) handleQuantityChange(id, product.quantity + 1);
  };

  const decrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.quantity > 1) handleQuantityChange(id, product.quantity - 1);
  };

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  // Proceed to checkout
  const proceedToCheckout = async () => {
    const confirmed = await Swal.fire({
      title: "Proceed to checkout",
      text: "Please review your order before proceeding to checkout",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed",
    });

    if (confirmed.isConfirmed) {
      Swal.fire("Proceeded", "Your order has been placed.", "success");
      setCartItems([]);
      router.push("/checkout");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-screen-2xl mx-auto relative">
      <span className="absolute top-0 left-0">
        <BreadcrumbCollapsed />
      </span>
      <div className="w-[95%] max-w-[1200px] mt-10">
        <h1 className="text-2xl md:text-3xl font-bold pl-2">Your cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty!</p>
      ) : (
        <div className="w-[95%] sm:w-full flex flex-col md:flex-row justify-center items-start gap-6 mt-4">
          {/* Cart Items */}
          <div className="w-full lg:w-[700px] space-y-4 border rounded-[20px] pt-2">
            {cartItems.map((product) => (
              <div className="flex justify-between border-b px-3 pb-3" key={product._id}>
                <div className="flex">
                  <div>
                    <Image src={product.imageUrl} width={100} height={100} alt={product.name} />
                  </div>
                  <div className="ml-3">
                    <h1 className="font-bold">{product.name}</h1>
                    <p className="font-bold">${product.price}</p>
                  </div>
                </div>
                <div className="relative">
                  <MdDelete
                    onClick={() => handleRemove(product._id)}
                    className="absolute top-0 text-xl right-0 sm:right-3 text-red-500 cursor-pointer"
                  />
                  <div className="md:w-[100px] h-[40px] flex justify-between p-3 items-center rounded-[62px] bg-[#F0F0F0] text-gray-400 absolute bottom-0 right-0">
                    <Minus onClick={() => decrement(product._id)} />
                    {product.quantity}
                    <Plus onClick={() => increment(product._id)} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-4 w-full lg:w-[500px] border rounded-[20px]">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${subtotal}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount (-20%)</p>
                <p>-${discount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Fee</p>
                <p>${deliveryFee}</p>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center">
                <input
                  className="h-10 rounded-[6px] bg-[#F0F0F0] px-4 w-[200px] md:w-[360px] border-none"
                  type="search"
                  placeholder="Add promo code"
                />
                <Button className="w-[100px] rounded-[20px]">Apply</Button>
              </div>
            </div>
            <button
              onClick={proceedToCheckout}
              className="w-full mt-4 bg-black text-white py-2 rounded-md"
            >
              Go to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

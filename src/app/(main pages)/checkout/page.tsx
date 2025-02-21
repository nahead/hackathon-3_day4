"use client";

import { getCartItems } from "@/actions/action";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/types/products";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CheckOut = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);

  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
    zipCode: "",
    city: "",
    paymentMethod: "creditCard",
  });

  const [, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const items = getCartItems();
    setCartItems(items);
    setDiscount(Number(localStorage.getItem("discount") || 0));
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity ?? 1),
    0
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
    setFormErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formValues.firstname.trim()) errors.firstname = "First name is required.";
    if (!formValues.lastname.trim()) errors.lastname = "Last name is required.";
    if (!formValues.email.match(/\S+@\S+\.\S+/)) errors.email = "Enter a valid email.";
    if (!formValues.address.trim()) errors.address = "Address is required.";
    if (!formValues.city.trim()) errors.city = "City is required.";
    if (!formValues.zipCode.trim()) errors.zipCode = "Zip Code is required.";
    if (!formValues.phone.match(/^\d{11}$/)) errors.phone = "Enter a valid 11-digit phone number.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
  
    const orderData = {
      _type: "order",
      ...formValues,
      cartItems: cartItems.map((item) => ({
        product: { _type: "reference", _ref: item._id },
        quantity: item.quantity ?? 1,
        image: item.imageUrl ? item.imageUrl : null,
        size: item.selectedSize ?? "",
        color: item.selectedColor ?? "",
      })),
      totalPrice: subtotal - discount,
      orderDate: new Date().toISOString(),
    };
  
    try {
      const confirmed = await Swal.fire({
        title: "Processing your order",
        text: "Please wait a moment.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Proceed",
      });
  
      if (confirmed.isConfirmed) {
        await client.create(orderData); // Order is created only after confirmation
        Swal.fire("Success!", "Your order has been successfully processed!", "success");
        setCartItems([]);
        localStorage.removeItem("discount");
        router.push("/");
      }
    } catch (error) {
      console.error("Order Error: ", error);
      Swal.fire("Error!", "Something went wrong while processing your order.", "error");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <nav className="flex items-center space-x-6">
            <Link href="/cart" className="text-lg font-semibold text-gray-700 hover:text-blue-600">
              Cart
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-lg font-semibold text-gray-700">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="main py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="order bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Order Summary</h2>

            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between py-4 border-b">
                  {item.imageUrl ? (
                    <Image
                      src={urlFor(item.imageUrl).url() || "/fallback-image.jpg"}
                      alt={item.name || "Product Image"}
                      width={100}
                      height={100}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  ) : (
                    <p>No Image Available</p>
                  )}


                  <div className="flex-1 ml-4">
                    <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                    {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                    {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium text-gray-700">
                      ${item.price * (item.quantity ?? 1)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4">Your cart is empty!</p>
            )}

            <div className="mt-6 space-y-2 text-gray-700">
              <div className="flex justify-between"><p>Subtotal</p><p>${subtotal.toFixed(2)}</p></div>
              <div className="flex justify-between"><p>Discount</p><p className="text-green-500">-${discount.toFixed(2)}</p></div>
              <div className="flex justify-between font-bold"><p>Total</p><p>${(subtotal - discount).toFixed(2)}</p></div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Shipping Details</h2>
            <form className="space-y-4">
              {Object.keys(formValues).map((field) =>
                field !== "paymentMethod" ? (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      id={field}
                      type="text"
                      value={formValues[field as keyof typeof formValues]}
                      onChange={handleInput}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    />
                  </div>
                ) : null
              )}

              <button type="button" onClick={handlePlaceOrder} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Place Order
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

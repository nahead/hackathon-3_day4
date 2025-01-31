'use client';
import { getCartItems } from '@/actions/action';
import { client } from '@/sanity/lib/client';
import { Product } from '@/types/products';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function CheckOut() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>( 0);
  const [formValues, setFormValues] = useState({
   
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: '',
    zipCode: '',
    city: '',
  });
  const [formErrors, setFormErrors] = useState({
    firstname: false,
    lastname:false,
    email: false,
    address: false,
    phone: false,
    zipCode: false,
    city: false,
  });

 
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  useEffect(() => {
    setCartItems(getCartItems());
    const appliedDiscount = localStorage.getItem('discount')
     
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount ));
    }
  }, []);


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const error = {
      firstname: !formValues.firstname,
      lastname:!formValues.lastname,
     
      email: !formValues.email,
      address: !formValues.address,
      phone: !formValues.phone,
      zipCode: !formValues.zipCode,
      city: !formValues.city,
    };
    setFormErrors(error);
    return Object.values(error).every((err) => !err);
  };

  
  const handlePlaceOrder= async ()=>{
    
    
    alert('Order placed successfully!');
    const orderData={
      _type:'order',
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      email: formValues.email,
      address: formValues.address,
      phone: formValues.phone,
      zipCode: formValues.zipCode,
      city: formValues.city,
      cartItems: cartItems.map((item) => ({
        _type:'reference',
        ref: item._id,
        
      })),
      totalPrice: subtotal - discount,
      orderDate: new Date().toISOString
    }
   
    try{
      await client.create(orderData)
      localStorage.removeItem('discount')
     
     
       } catch (error) {
    if (error instanceof Error && error.message.includes("Insufficient permissions")) {
      console.error("Permission issue: ", error);
    } else {
      console.error("Unexpected error: ", error);
    }}
  }
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <nav className="flex items-center space-x-6">
            <Link
              href="/cart"
              className="text-lg font-semibold text-gray-700 hover:text-blue-600"
            >
              Cart
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-lg font-semibold text-gray-700">
              Checkout
            </span>
          </nav>
        </div>
      </div>

      {/* Main Section */}
      <div className="main py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Order Summary */}
          <div className="order bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Order Summary</h2>

            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between py-4 border-b"
                >
                  {/* Image */}
                  <div className="w-20 h-20 relative">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 ml-4">
                    <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium text-gray-700">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4">Your cart is empty!</p>
            )}

            {/* Order Totals */}
            <div className="mt-6 space-y-2 text-gray-700">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount</p>
                <p className="text-green-500">-${discount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>${(subtotal - discount).toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Shipping Details</h2>
            <form className="space-y-4">
              {Object.keys(formValues).map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    id={field}
                    type="text"
                    value={formValues[field as keyof typeof formValues]}
                    onChange={handleInput}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      formErrors[field as keyof typeof formErrors]
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {formErrors[field as keyof typeof formErrors] && (
                    <p className="text-red-500 text-sm">This field is required</p>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut

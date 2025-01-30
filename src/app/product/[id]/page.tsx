
import CustomerTestimonials from '@/components/AllReviews';
import { BreadcrumbCollapsed } from '@/components/Breadcrupm';
import Detailpage from '@/components/detailpage';
import T_shirts from '@/components/products';
import { client } from '@/sanity/lib/client';
import { Product } from '@/types/products';
import { Check, Minus, Plus } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';


const star = [
  <FaStar key={1} />,
  <FaStar key={2} />,
  <FaStar key={3} />,
  <FaStar key={4} />,
  <FaStar key={5} />,
];

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const query = `
    *[_type == "products" && _id == "${params.id}"][0] {
      _id,
      name,
      "imageUrl": image.asset->url,
      colors,
      price,
      description
    }
  `;

  const product: Product = await client.fetch(query);



  if (!product) {
    return <div className="text-center mt-10">Product not found</div>;
  }



  return (
    <div key={product._id}>
      <BreadcrumbCollapsed />
      <div className="flex flex-col md:flex-row justify-center  sm:justify-evenly sm:mt-10 p-5  sm:p-0 max-w-screen-2xl  mx-auto">
        {/* left */}
        <div className="flex sm:flex-col justify-between items-center w-full sm:w-[152px] order-2 sm:order-1">
          {/* images */}
          <Image
            src={product.imageUrl}
            className="w-[100px] sm:w-full h-[100px] sm:h-[150px]  rounded-[20px]"
            alt={product.name}
            width={550}
            height={550}
          ></Image>
          <Image
            src={product.imageUrl}
            className="w-[100px] sm:w-full h-[100px] sm:h-[150px] sm:mt-3  rounded-[20px]"
            alt={product.name}
            width={550}
            height={550}
          ></Image>
          <Image
            src={product.imageUrl}
            className="w-[100px] sm:w-full h-[100px] sm:h-[150px] sm:mt-3 rounded-[20px]"
            alt={product.name}
            width={550}
            height={550}
          ></Image>
        </div>
        {/* mid div */}
        <div className="w-full sm:w-[444px] h-[260px] sm:h-[500px] mt-5 sm:mt-0 order-1 sm:order-2">
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[95%] rounded-[20px]"
            width={1150}
            height={1150}
          ></Image>
        </div>
        {/* right div */}
        <div className="w-full sm:w-[500px] md:h-[500px] mt-3 order-3">
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          {/* <div className="flex text-yellow-400">{star}</div> */}
          <div className="flex text-yellow-400">
            {/* Map stars correctly */}
            {star.map((icon, index) => (
              <span key={index}>{icon}</span>
            ))}
          </div>
          <p className="font-bold mt-1">
            {product.price}{" "}
          </p>
          <p>
            {product.description}
          </p>
          {/* select color */}
          <div className="mt-5">
            <p className="text-gray-500">Select Colors</p>
            <div className="flex space-x-3 mt-2">
              <div className="w-[37px] h-[37px] bg-[#4F4631] rounded-full  flex justify-center items-center">
                <Check className="text-white opacity-0  hover:opacity-100 cursor-pointer" />
              </div>
              <div className="w-[37px] h-[37px] bg-[#314F4A] rounded-full flex justify-center items-center">
                <Check className="text-white opacity-0  hover:opacity-100 cursor-pointer" />
              </div>
              <div className="w-[37px] h-[37px] bg-[#31344F] rounded-full flex justify-center items-center">
                <Check className="text-white opacity-0  hover:opacity-100 cursor-pointer" />
              </div>
            </div>
          </div>
          {/* Choose Size */}
          <div className="mt-4">
            <p className="text-gray-500">Choose Size</p>
            <div className="flex space-x-3 mt-2">
              <div className="w-[80px] h-[40px] flex justify-center items-center rounded-[62px] bg-[#F0F0F0] text-gray-400">
                Small
              </div>
              <div className="w-[90px] h-[40px] flex justify-center items-center rounded-[62px] bg-[#F0F0F0] text-gray-400">
                Medium
              </div>
              <div className="w-[80px] h-[40px] flex justify-center items-center rounded-[62px] bg-[#F0F0F0] text-gray-400">
                Large
              </div>
              <div className="w-[90px] h-[40px] flex justify-center items-center rounded-[62px] bg-[#F0F0F0] text-gray-400">
                X-Large
              </div>
            </div>
          </div>
          {/* BTNS */}
          <div className="flex justify-start items-center mt-7 space-x-4">
            <div className="w-[100px] h-[40px] flex justify-between p-3 items-center rounded-[62px] bg-[#F0F0F0] text-gray-400">
              <Minus />
              1
              <Plus />
            </div>
            <Link href={`/cart/${product._id}`} key={product._id}>
              <Detailpage product={product} />
            </Link>
          </div>
        </div>
      </div>
      <CustomerTestimonials />
      <T_shirts />
    </div>
  );
}






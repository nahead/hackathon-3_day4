
import CustomerTestimonials from '@/components/AllReviews';
import { BreadcrumbCollapsed } from '@/components/Breadcrupm';
import Detailpage from '@/components/detailpage';
import T_shirts from '@/components/products';
import { client } from '@/sanity/lib/client';
import { Product } from '@/types/products';

import Image from 'next/image';
import { FaStar } from 'react-icons/fa';



export default async function ProductDetail({ params }: { params: { id: string } }) {
  const query = `*[_type == "products" && _id == $id][0] {
    _id,
    name,
    "imageUrl": image.asset->url,
    colors,
    price,
    description
  }`;
  const product: Product = await client.fetch(query, { id: params.id });
  
  if (!product) {
    return <div className="text-center mt-10">Product not found</div>;
  }
  
  // Dynamic rendering improvements
  const starIcons = Array(5).fill(<FaStar />);
  
  return (
    <div key={product._id}>
      <BreadcrumbCollapsed />
      <div className="flex flex-col md:flex-row justify-center sm:justify-evenly p-5 max-w-screen-2xl mx-auto">
        <div className="flex sm:flex-col justify-between items-center w-full sm:w-[152px]">
          {[...Array(3)].map((_, i) => (
            <Image
              key={i}
              src={product.imageUrl}
              className="w-[100px] sm:w-full h-[100px] sm:h-[150px] rounded-[20px] sm:mt-3"
              alt={product.name}
              width={550}
              height={550}
            />
          ))}
        </div>
        <div className="w-full sm:w-[444px] h-[260px] sm:h-[500px]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[95%] rounded-[20px]"
            width={1150}
            height={1150}
          />
        </div>
        <div className="w-full sm:w-[500px]">
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          <div className="flex text-yellow-400">{starIcons.map((icon, i) => <span key={i}>{icon}</span>)}</div>
          <p className="font-bold mt-1">{product.price}</p>
          <p>{product.description}</p>
        <div className='mt-10'>
        <Detailpage product={product} />
        </div>
        </div>
       
      </div>
      <CustomerTestimonials />
      <T_shirts />
    </div>
  );
}  






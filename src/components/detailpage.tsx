'use client'
import { Button } from './ui/button';
import { addToCart } from '@/actions/action';
import { Product } from '@/types/products';
import Swal from 'sweetalert2';

interface DetailPageProps {
  product: Product;
}

const Detailpage: React.FC<DetailPageProps> = ({ product }) => {
  if (!product) {
    return <div className="text-center mt-10">Product not found</div>;
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${product.name} added to cart`,
      showConfirmButton: false,
      timer: 1500,
    });

    addToCart(product);
  };

  return (
    <div>
   
      <Button
        className="bg-black text-white w-40 md:w-[300px] rounded-lg"
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default Detailpage;

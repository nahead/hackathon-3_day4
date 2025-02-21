import { client } from '@/sanity/lib/client';
import { Product } from '@/types/products';
import { BreadcrumbCollapsed } from '@/components/Breadcrupm';
import T_shirts from '@/components/products';
import ProductDetailsClient from '@/components/productdetail';
import CustomerTestimonials from '@/components/(a)/AllReviews';

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const query = `
    *[_type == "products" && _id == "${params.id}"][0] {
      _id,
      name,
      "imageUrl": image.asset->url,
      colors,
      price,
      description,
      category,
      quantity,
      discountPercent,
      "isNew": new,
      sizes,
      "images": gallery[].asset->url,
    }
  `;

  const product: Product = await client.fetch(query);

  if (!product) {
    return <div className="text-center mt-10 text-lg font-semibold text-gray-600">Product not found</div>;
  }

  // Ensure colors and sizes are required
  if (!product.colors || product.colors.length === 0) {
    return <div className="text-center mt-10 text-lg font-semibold text-red-600">Error: Colors are required for this product.</div>;
  }

  if (!product.sizes || product.sizes.length === 0) {
    return <div className="text-center mt-10 text-lg font-semibold text-red-600">Error: Sizes are required for this product.</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {/* Breadcrumb */}
      <div className="mb-4">
        <BreadcrumbCollapsed />
      </div>

      {/* Product Details */}
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10">
        <ProductDetailsClient product={product} />
      </div>

      {/* Customer Reviews */}
      <div className="mt-12 bg-gray-50 rounded-lg shadow-md p-6 md:p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
        <CustomerTestimonials />
      </div>

      {/* Recommended Products */}
      <div className="mt-12">
        <T_shirts />
      </div>
    </div>
  );
}

import React from 'react';
import ProductCard, { Product } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title, subtitle }) => {
  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
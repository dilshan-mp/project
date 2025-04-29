import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      <div className="relative">
        <Link to={`/products/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover object-center"
          />
        </Link>
        
        {/* Tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
              New
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-accent-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
              Featured
            </span>
          )}
          {discount > 0 && (
            <span className="bg-error-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
              -{discount}%
            </span>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="absolute top-2 right-2">
          <button className="bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors">
            <Heart className="h-4 w-4 text-gray-500 hover:text-error-500 transition-colors" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'text-accent-500 fill-accent-500'
                    : i < product.rating
                    ? 'text-accent-500 fill-accent-500 opacity-50'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <button className="bg-primary-50 hover:bg-primary-100 text-primary-700 p-1.5 rounded-full transition-colors">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
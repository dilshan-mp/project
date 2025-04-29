import React, { useEffect, useState } from 'react';
import { Search, Filter, ArrowRight } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';
import { Product } from '../components/products/ProductCard';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';

// Mock products data
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Leather Jacket",
    image: "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.7,
    reviewCount: 128,
    isFeatured: true,
    category: "Apparel"
  },
  {
    id: "2",
    name: "Wireless Bluetooth Headphones with Noise Cancellation",
    image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviewCount: 342,
    isNew: true,
    category: "Electronics"
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 119.99,
    originalPrice: 149.99,
    rating: 4.5,
    reviewCount: 215,
    category: "Electronics"
  },
  {
    id: "4",
    name: "Handcrafted Ceramic Coffee Mug Set",
    image: "https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 39.99,
    rating: 4.3,
    reviewCount: 87,
    isNew: true,
    category: "Home & Kitchen"
  },
  {
    id: "5",
    name: "Professional Chef's Knife",
    image: "https://images.pexels.com/photos/4117472/pexels-photo-4117472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 156,
    category: "Home & Kitchen"
  },
  {
    id: "6",
    name: "Luxury Scented Candle",
    image: "https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 29.99,
    rating: 4.6,
    reviewCount: 94,
    category: "Home Decor"
  },
  {
    id: "7",
    name: "Organic Cotton T-Shirt",
    image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.2,
    reviewCount: 73,
    category: "Apparel"
  },
  {
    id: "8",
    name: "Portable Bluetooth Speaker",
    image: "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.4,
    reviewCount: 128,
    isFeatured: true,
    category: "Electronics"
  }
];

// Featured categories
const FEATURED_CATEGORIES = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    count: 1248
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    count: 2135
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "https://images.pexels.com/photos/1358900/pexels-photo-1358900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    count: 1532
  },
  {
    id: 4,
    name: "Beauty",
    image: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    count: 856
  }
];

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto max-w-7xl">
      {/* Hero Banner */}
      <div className="mb-12 mt-6">
        <div className="relative overflow-hidden bg-gradient-to-r from-primary-700 to-primary-800 rounded-xl shadow-lg">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center"></div>
          <div className="relative z-10 px-8 py-16 md:py-20 md:px-12 lg:py-24 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Discover Premium Products For Every Lifestyle
              </h1>
              <p className="text-primary-100 text-lg mb-8">
                Shop the latest trends with confidence, enjoying exclusive deals and fast shipping on thousands of quality items.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary-700 hover:bg-gray-100"
                >
                  Shop Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Browse Categories
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for products, brands, and more..."
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <Button 
              className="w-full md:w-auto"
              variant="outline"
              leftIcon={<Filter size={16} />}
            >
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
          <a href="#" className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium">
            View All
            <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_CATEGORIES.map((category) => (
            <motion.a
              key={category.id}
              href={`/categories/${category.id}`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="block group relative rounded-lg overflow-hidden shadow-md h-48"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                <p className="text-gray-300 text-sm">{category.count} products</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <a href="#" className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium">
            View All
            <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm p-4 h-[340px]">
                <div className="animate-pulse">
                  <div className="bg-gray-200 h-48 w-full rounded-md mb-4"></div>
                  <div className="bg-gray-200 h-4 w-1/4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-6 w-3/4 rounded mb-3"></div>
                  <div className="bg-gray-200 h-4 w-1/4 rounded mb-2"></div>
                  <div className="flex justify-between">
                    <div className="bg-gray-200 h-6 w-1/3 rounded"></div>
                    <div className="bg-gray-200 h-8 w-8 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProductGrid
            products={products.filter(p => p.isFeatured)}
          />
        )}
      </div>

      {/* New Arrivals */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
          <a href="#" className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium">
            View All
            <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm p-4 h-[340px]">
                <div className="animate-pulse">
                  <div className="bg-gray-200 h-48 w-full rounded-md mb-4"></div>
                  <div className="bg-gray-200 h-4 w-1/4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-6 w-3/4 rounded mb-3"></div>
                  <div className="bg-gray-200 h-4 w-1/4 rounded mb-2"></div>
                  <div className="flex justify-between">
                    <div className="bg-gray-200 h-6 w-1/3 rounded"></div>
                    <div className="bg-gray-200 h-8 w-8 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProductGrid
            products={products.filter(p => p.isNew)}
          />
        )}
      </div>

      {/* All Products */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select className="text-sm border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
              <option>Rating</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm p-4 h-[340px]">
                <div className="animate-pulse">
                  <div className="bg-gray-200 h-48 w-full rounded-md mb-4"></div>
                  <div className="bg-gray-200 h-4 w-1/4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-6 w-3/4 rounded mb-3"></div>
                  <div className="bg-gray-200 h-4 w-1/4 rounded mb-2"></div>
                  <div className="flex justify-between">
                    <div className="bg-gray-200 h-6 w-1/3 rounded"></div>
                    <div className="bg-gray-200 h-8 w-8 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
        
        <div className="mt-10 flex justify-center">
          <Button 
            variant="outline" 
            size="lg"
            className="px-10"
          >
            Load More
          </Button>
        </div>
      </div>
      
      {/* Promotional Banner */}
      <div className="mb-16">
        <div className="bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 flex items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Become a Seller Today!
                </h2>
                <p className="text-secondary-100 mb-6">
                  Join our marketplace and start selling your products to millions of customers. We provide all the tools you need to succeed.
                </p>
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-secondary-700 hover:bg-gray-100"
                  onClick={() => window.location.href = '/seller-registration'}
                >
                  Register as Seller
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 bg-[url('https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center h-64 md:h-auto">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
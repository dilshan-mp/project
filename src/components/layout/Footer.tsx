import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <ShoppingBag className="h-7 w-7 text-primary-500 mr-2" />
              <span className="text-xl font-bold">LuxeMarket</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your premier destination for luxury and everyday items at competitive prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/deals" className="text-gray-400 hover:text-white transition-colors">Deals</Link>
              </li>
              <li>
                <Link to="/seller-registration" className="text-gray-400 hover:text-white transition-colors">Become a Seller</Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Info</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  123 Commerce St, Suite 500<br />
                  San Francisco, CA 94103
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400">support@luxemarket.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} LuxeMarket. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
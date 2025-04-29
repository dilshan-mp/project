import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, ShoppingBag, User, Search, Bell, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <Link to="/" className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-primary-600 mr-2" />
              <span className="text-xl font-semibold text-gray-900">LuxeMarket</span>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/categories" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Categories
              </Link>
              <Link to="/deals" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Deals
              </Link>
              <Link to="/featured" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Featured
              </Link>
            </div>
          </div>

          {/* Middle section - Search Bar (hidden on mobile) */}
          <div className="hidden md:flex md:items-center md:justify-center flex-1 max-w-md px-2">
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <Bell className="h-5 w-5" />
            </button>
            
            <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-primary-600 rounded-full">3</span>
            </button>
            
            {isAuthenticated ? (
              <div className="relative ml-3">
                <div className="flex items-center space-x-3">
                  <button className="bg-gray-200 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                      {user?.name?.charAt(0) || <User className="h-5 w-5" />}
                    </div>
                  </button>
                  <div className="hidden md:block">
                    <div className="text-sm text-gray-700">Hello, {user?.name}</div>
                    <button 
                      onClick={() => logout()}
                      className="text-xs text-primary-600 hover:text-primary-700"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigate('/login')}
                  className="hidden md:inline-flex"
                >
                  Sign in
                </Button>
                <Button 
                  size="sm"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      <div className="block md:hidden border-t border-gray-200 p-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
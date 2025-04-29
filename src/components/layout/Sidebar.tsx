import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, 
  Home, 
  ShoppingBag, 
  Tag, 
  Users, 
  Heart, 
  Clock, 
  Star, 
  Store, 
  User, 
  Settings, 
  HelpCircle,
  PackagePlus 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const handleSellerRegistration = () => {
    closeSidebar();
    navigate('/seller-registration');
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-50"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-0 z-30 h-full w-64 bg-white shadow-xl md:sticky md:shadow-none"
          >
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
              <Link to="/" className="flex items-center" onClick={closeSidebar}>
                <ShoppingBag className="h-8 w-8 text-primary-600 mr-2" />
                <span className="text-xl font-semibold text-gray-900">LuxeMarket</span>
              </Link>
              <button
                className="md:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100"
                onClick={closeSidebar}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {!isAuthenticated && (
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      closeSidebar();
                      navigate('/login');
                    }}
                    fullWidth
                  >
                    Sign in
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      closeSidebar();
                      navigate('/signup');
                    }}
                    fullWidth
                  >
                    Create account
                  </Button>
                </div>
              </div>
            )}
            
            {/* Shop Navigation */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Shop
              </h3>
              <nav className="space-y-1">
                <Link
                  to="/"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
                  onClick={closeSidebar}
                >
                  <Home className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
                  Home
                </Link>
                <Link
                  to="/categories"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
                  onClick={closeSidebar}
                >
                  <ShoppingBag className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
                  Categories
                </Link>
                <Link
                  to="/deals"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
                  onClick={closeSidebar}
                >
                  <Tag className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
                  Deals
                </Link>
                <Link
                  to="/featured"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
                  onClick={closeSidebar}
                >
                  <Star className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
                  Featured
                </Link>
                <Link
                  to="/trending"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
                  onClick={closeSidebar}
                >
                  <Users className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
                  What's Popular
                </Link>
              </nav>
            </div>
            
            {/* Account Navigation (only if authenticated) */}
            {isAuthenticated && (
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Your Account
                </h3>
                <nav className="space-y-1">
                  <Link
                    to="/profile"
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
                    onClick={closeSidebar}
                  >
                    <User className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
                    onClick={closeSidebar}
                  >
                    <Clock className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
                    Orders
                  </Link>
                  <Link
                    to="/favorites"
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
                    onClick={closeSidebar}
                  >
                    <Heart className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
                    Favorites
                  </Link>
                </nav>
              </div>
            )}
            
            {/* Seller Section */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Selling on LuxeMarket
              </h3>
              {user?.isSeller ? (
                <nav className="space-y-1 mb-4">
                  <Link
                    to="/add-product"
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
                    onClick={closeSidebar}
                  >
                    <PackagePlus className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
                    Add Product
                  </Link>
                </nav>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Become a Seller</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    List your products and reach millions of customers.
                  </p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    fullWidth
                    onClick={handleSellerRegistration}
                    leftIcon={<Store size={16} />}
                  >
                    Register as Seller
                  </Button>
                </div>
              )}
            </div>
            
            {/* Help & Support */}
            <div className="p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Help & Settings
              </h3>
              <nav className="space-y-1">
                <Link
                  to="/settings"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
                  onClick={closeSidebar}
                >
                  <Settings className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
                  Settings
                </Link>
                <Link
                  to="/help"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
                  onClick={closeSidebar}
                >
                  <HelpCircle className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
                  Help Center
                </Link>
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      
      {/* Non-mobile sidebar */}
      <aside className="hidden md:block sticky top-16 h-[calc(100vh-4rem)] w-64 flex-shrink-0 border-r border-gray-200 bg-white overflow-y-auto pt-6">
        {/* Desktop sidebar content */}
        {/* Shop Navigation */}
        <div className="px-4 mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Shop
          </h3>
          <nav className="space-y-1">
            <Link
              to="/"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
            >
              <Home className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
              Home
            </Link>
            <Link
              to="/categories"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
            >
              <ShoppingBag className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
              Categories
            </Link>
            <Link
              to="/deals"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
            >
              <Tag className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
              Deals
            </Link>
            <Link
              to="/featured"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
            >
              <Star className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
              Featured
            </Link>
            <Link
              to="/trending"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
            >
              <Users className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
              What's Popular
            </Link>
          </nav>
        </div>
        
        {/* Account Navigation (only if authenticated) */}
        {isAuthenticated && (
          <div className="px-4 mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Your Account
            </h3>
            <nav className="space-y-1">
              <Link
                to="/profile"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
              >
                <User className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
                Profile
              </Link>
              <Link
                to="/orders"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
              >
                <Clock className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
                Orders
              </Link>
              <Link
                to="/favorites"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
              >
                <Heart className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
                Favorites
              </Link>
            </nav>
          </div>
        )}
        
        {/* Seller Section */}
        <div className="px-4 mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Selling on LuxeMarket
          </h3>
          {user?.isSeller ? (
            <nav className="space-y-1 mb-4">
              <Link
                to="/add-product"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
              >
                <PackagePlus className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
                Add Product
              </Link>
            </nav>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Become a Seller</h4>
              <p className="text-sm text-gray-600 mb-3">
                List your products and reach millions of customers.
              </p>
              <Button 
                variant="secondary" 
                size="sm" 
                fullWidth
                onClick={handleSellerRegistration}
                leftIcon={<Store size={16} />}
              >
                Register as Seller
              </Button>
            </div>
          )}
        </div>
        
        {/* Help & Support */}
        <div className="px-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Help & Settings
          </h3>
          <nav className="space-y-1">
            <Link
              to="/settings"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
            >
              <Settings className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
              Settings
            </Link>
            <Link
              to="/help"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-700"
            >
              <HelpCircle className="mr-3 h-5 w-5 text-gray-500 group-hover:text-primary-600" />
              Help Center
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
import React from 'react';
import { ShoppingBag, Store } from 'lucide-react';
import SellerRegistrationForm from '../components/seller/SellerRegistrationForm';

const SellerRegistrationPage: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto pt-6 pb-12">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100">
            <Store className="h-6 w-6 text-primary-600" />
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-gray-900">Seller Registration</h1>
            <p className="text-gray-600">Join our marketplace and start selling your products</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="md:w-2/3">
            <SellerRegistrationForm />
          </div>
          
          <div className="md:w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">Why sell on LuxeMarket?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-success-500 flex items-center justify-center mt-0.5">
                    <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">Access to millions of customers worldwide</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-success-500 flex items-center justify-center mt-0.5">
                    <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">Powerful seller tools and analytics</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-success-500 flex items-center justify-center mt-0.5">
                    <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">Secure payment processing</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-success-500 flex items-center justify-center mt-0.5">
                    <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">Logistics and shipping support</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-success-500 flex items-center justify-center mt-0.5">
                    <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">24/7 seller support</p>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                <h4 className="font-medium text-primary-800 mb-2">Seller Success Rate</h4>
                <p className="text-primary-700 text-sm">
                  94% of our sellers report increased sales within the first 3 months of joining LuxeMarket.
                </p>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Our seller support team is available to assist you with the registration process.
                </p>
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-700">sellers@luxemarket.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRegistrationPage;
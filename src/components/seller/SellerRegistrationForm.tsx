import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Input from '../common/Input';
import Button from '../common/Button';
import { ArrowRight, CheckCircle, Store } from 'lucide-react';

interface SellerRegistrationFormData {
  businessName: string;
  businessEmail: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  taxId: string;
  businessType: string;
  businessDescription: string;
  website?: string;
}

const SellerRegistrationForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SellerRegistrationFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { updateUserStatus } = useAuth();

  const onSubmit = async (data: SellerRegistrationFormData) => {
    try {
      setIsLoading(true);
      
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user's seller status
      updateUserStatus({ isSeller: true });
      
      showToast('Registration submitted successfully!', 'success');
      navigate('/');
    } catch (error) {
      showToast('Failed to submit registration', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Form progress steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 1 ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'
            }`}>
              {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : 1}
            </div>
            <span className="ml-2 text-sm font-medium">Business Info</span>
          </div>
          
          <div className={`flex-1 h-px mx-4 ${currentStep >= 2 ? 'bg-primary-500' : 'bg-gray-200'}`}></div>
          
          <div className={`flex items-center ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 2 ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'
            }`}>
              {currentStep > 2 ? <CheckCircle className="w-5 h-5" /> : 2}
            </div>
            <span className="ml-2 text-sm font-medium">Address</span>
          </div>
          
          <div className={`flex-1 h-px mx-4 ${currentStep >= 3 ? 'bg-primary-500' : 'bg-gray-200'}`}></div>
          
          <div className={`flex items-center ${currentStep >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 3 ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'
            }`}>
              3
            </div>
            <span className="ml-2 text-sm font-medium">Additional Info</span>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Business Information */}
        {currentStep === 1 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-900">
              <Store className="mr-2 text-primary-600" size={22} />
              Business Information
            </h2>
            
            <div className="space-y-4">
              <Input
                label="Business Name"
                placeholder="Your Business Name"
                {...register('businessName', {
                  required: 'Business name is required',
                })}
                error={errors.businessName?.message}
              />
              
              <Input
                label="Business Email"
                type="email"
                placeholder="business@example.com"
                {...register('businessEmail', {
                  required: 'Business email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                error={errors.businessEmail?.message}
              />
              
              <Input
                label="Phone Number"
                placeholder="(555) 123-4567"
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                })}
                error={errors.phoneNumber?.message}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Type
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  {...register('businessType', {
                    required: 'Business type is required',
                  })}
                >
                  <option value="">Select business type</option>
                  <option value="sole_proprietorship">Sole Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="llc">LLC</option>
                  <option value="corporation">Corporation</option>
                  <option value="other">Other</option>
                </select>
                {errors.businessType?.message && (
                  <div className="mt-1 text-xs text-error-500">
                    {errors.businessType?.message}
                  </div>
                )}
              </div>
              
              <Input
                label="Tax ID / EIN"
                placeholder="XX-XXXXXXX"
                {...register('taxId', {
                  required: 'Tax ID is required',
                })}
                error={errors.taxId?.message}
              />
            </div>
            
            <div className="flex justify-end mt-6">
              <Button 
                type="button" 
                onClick={nextStep}
                rightIcon={<ArrowRight size={18} />}
              >
                Next Step
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 2: Address Details */}
        {currentStep === 2 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-900">
              <Store className="mr-2 text-primary-600" size={22} />
              Business Address
            </h2>
            
            <div className="space-y-4">
              <Input
                label="Street Address"
                placeholder="123 Business Street"
                {...register('address', {
                  required: 'Address is required',
                })}
                error={errors.address?.message}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  placeholder="City"
                  {...register('city', {
                    required: 'City is required',
                  })}
                  error={errors.city?.message}
                />
                
                <Input
                  label="State/Province"
                  placeholder="State"
                  {...register('state', {
                    required: 'State is required',
                  })}
                  error={errors.state?.message}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Zip/Postal Code"
                  placeholder="12345"
                  {...register('zipCode', {
                    required: 'Zip code is required',
                  })}
                  error={errors.zipCode?.message}
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    {...register('country', {
                      required: 'Country is required',
                    })}
                  >
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                    <option value="JP">Japan</option>
                  </select>
                  {errors.country?.message && (
                    <div className="mt-1 text-xs text-error-500">
                      {errors.country?.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={prevStep}
              >
                Back
              </Button>
              <Button 
                type="button" 
                onClick={nextStep}
                rightIcon={<ArrowRight size={18} />}
              >
                Next Step
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 3: Additional Information */}
        {currentStep === 3 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-900">
              <Store className="mr-2 text-primary-600" size={22} />
              Additional Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Tell us about your business, products, and services..."
                  {...register('businessDescription', {
                    required: 'Business description is required',
                    minLength: {
                      value: 20,
                      message: 'Please provide at least 20 characters',
                    },
                  })}
                ></textarea>
                {errors.businessDescription?.message && (
                  <div className="mt-1 text-xs text-error-500">
                    {errors.businessDescription?.message}
                  </div>
                )}
              </div>
              
              <Input
                label="Website (optional)"
                placeholder="https://yourbusiness.com"
                helperText="If you have an existing website, please provide the URL"
                {...register('website')}
              />
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Required Documents</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Please prepare the following documents for verification:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                  <li>Business registration certificate</li>
                  <li>Tax identification document</li>
                  <li>Government-issued ID of business owner</li>
                  <li>Bank account information for payments</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  You'll be able to upload these documents after registration.
                </p>
              </div>
              
              <div className="flex items-center mt-4">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700">
                    Seller Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700">
                    Marketplace Policies
                  </a>
                </label>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={prevStep}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                isLoading={isLoading}
              >
                Submit Registration
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SellerRegistrationForm;
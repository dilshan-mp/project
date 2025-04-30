import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FieldName } from "react-hook-form"; // Import FieldName type
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Input from "../common/Input"; // Assuming Input component is correctly implemented
import Button from "../common/Button"; // Assuming Button component is correctly implemented
import { ArrowRight, CheckCircle, Store, AlertCircle } from "lucide-react";

interface SellerRegistrationFormData {
  businessName: string;
  businessEmail: string;
  phoneNumber: string;
  businessType: string;
  taxId: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  businessDescription: string;
  website?: string;
  terms: boolean; // Added for the checkbox
}

// Define fields for each step for validation triggering
const step1Fields: FieldName<SellerRegistrationFormData>[] = [
  "businessName",
  "businessEmail",
  "phoneNumber",
  "businessType",
  "taxId",
];
const step2Fields: FieldName<SellerRegistrationFormData>[] = [
  "address",
  "city",
  "state",
  "zipCode",
  "country",
];
const step3Fields: FieldName<SellerRegistrationFormData>[] = [
  // Fields to validate on final submit if needed beyond basic required
  "businessDescription",
  "website",
  "terms",
];

const SellerRegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    trigger, // <-- Destructure trigger
    formState: { errors },
  } = useForm<SellerRegistrationFormData>({
    mode: "onTouched", // Validate fields once they've been interacted with
    // You could also use 'onChange' or 'onBlur'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { updateUserStatus } = useAuth(); // Assuming this updates context/state

  // Handler for the final form submission
  const onSubmit = async (data: SellerRegistrationFormData) => {
    // handleSubmit already validates ALL fields before calling this function
    console.log("Form Data Submitted:", data);
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update user's seller status in your auth context or backend
      if (updateUserStatus) {
        // Check if updateUserStatus exists
        updateUserStatus({ isSeller: true });
      } else {
        console.warn("updateUserStatus function not found in AuthContext");
        // Handle case where function might not be provided/needed
      }

      showToast("Registration submitted successfully!", "success");
      navigate("/"); // Navigate to dashboard or home page
    } catch (error) {
      console.error("Registration failed:", error);
      showToast("Failed to submit registration. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler to move to the next step *after* validation
  const handleNextStep = async () => {
    let fieldsToValidate: FieldName<SellerRegistrationFormData>[] = [];
    if (currentStep === 1) {
      fieldsToValidate = step1Fields;
    } else if (currentStep === 2) {
      fieldsToValidate = step2Fields;
    }
    // Add more steps here if needed

    const isValid = await trigger(fieldsToValidate); // Trigger validation for current step's fields

    if (isValid) {
      setCurrentStep((prev) => prev + 1); // Move to next step only if valid
    } else {
      // Optional: Focus the first field with an error
      const firstErrorField = fieldsToValidate.find((field) => errors[field]);
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element instanceof HTMLElement) {
          element.focus();
        }
      }
      showToast("Please fix the errors before proceeding.", "warning");
    }
  };

  // Handler to move to the previous step
  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="w-full max-w-3xl p-4 mx-auto sm:p-6 lg:p-8">
      {/* Form progress steps - No changes needed here */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {/* Step 1 Indicator */}
          <div
            className={`flex items-center ${
              currentStep >= 1 ? "text-primary-600" : "text-gray-400"
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                currentStep >= 1
                  ? "bg-primary-100 border-primary-600"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
            </div>
            <span className="hidden ml-2 text-sm font-medium sm:inline">
              Business Info
            </span>
          </div>

          <div
            className={`flex-1 h-0.5 mx-4 ${
              currentStep >= 2 ? "bg-primary-500" : "bg-gray-200"
            }`}
          ></div>

          {/* Step 2 Indicator */}
          <div
            className={`flex items-center ${
              currentStep >= 2 ? "text-primary-600" : "text-gray-400"
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                currentStep >= 2
                  ? "bg-primary-100 border-primary-600"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              {currentStep > 2 ? <CheckCircle className="w-5 h-5" /> : "2"}
            </div>
            <span className="hidden ml-2 text-sm font-medium sm:inline">
              Address
            </span>
          </div>

          <div
            className={`flex-1 h-0.5 mx-4 ${
              currentStep >= 3 ? "bg-primary-500" : "bg-gray-200"
            }`}
          ></div>

          {/* Step 3 Indicator */}
          <div
            className={`flex items-center ${
              currentStep >= 3 ? "text-primary-600" : "text-gray-400"
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                currentStep >= 3
                  ? "bg-primary-100 border-primary-600"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              {"3"}
            </div>
            <span className="hidden ml-2 text-sm font-medium sm:inline">
              Additional Info
            </span>
          </div>
        </div>
      </div>

      {/* Pass the final onSubmit handler to the form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {" "}
        {/* noValidate prevents browser validation */}
        {/* Step 1: Business Information */}
        {currentStep === 1 && (
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm animate-fadeIn">
            <h2 className="flex items-center mb-6 text-xl font-semibold text-gray-900">
              <Store className="mr-2 text-primary-600" size={22} />
              Business Information
            </h2>

            <div className="space-y-4">
              <Input
                label="Business Name"
                id="businessName"
                placeholder="Your Business Name"
                {...register("businessName", {
                  required: "Business name is required",
                })}
                error={errors.businessName?.message}
                aria-invalid={errors.businessName ? "true" : "false"}
              />

              <Input
                label="Business Email"
                id="businessEmail"
                type="email"
                placeholder="business@example.com"
                {...register("businessEmail", {
                  required: "Business email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={errors.businessEmail?.message}
                aria-invalid={errors.businessEmail ? "true" : "false"}
              />

              <Input
                label="Phone Number"
                id="phoneNumber"
                placeholder="(555) 123-4567"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  // Add pattern validation if needed, e.g., for US format:
                  // pattern: {
                  //   value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                  //   message: "Invalid phone number format"
                  // }
                })}
                error={errors.phoneNumber?.message}
                aria-invalid={errors.phoneNumber ? "true" : "false"}
              />

              <div>
                <label
                  htmlFor="businessType"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Business Type
                </label>
                <select
                  id="businessType"
                  className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.businessType ? "border-error-500" : "border-gray-300"
                  }`}
                  {...register("businessType", {
                    required: "Business type is required",
                  })}
                  aria-invalid={errors.businessType ? "true" : "false"}
                >
                  <option value="">Select business type</option>
                  <option value="sole_proprietorship">
                    Sole Proprietorship
                  </option>
                  <option value="partnership">Partnership</option>
                  <option value="llc">LLC</option>
                  <option value="corporation">Corporation</option>
                  <option value="other">Other</option>
                </select>
                {errors.businessType?.message && (
                  <div className="flex items-center mt-1 text-xs text-error-600">
                    <AlertCircle size={14} className="mr-1" />{" "}
                    {errors.businessType?.message}
                  </div>
                )}
              </div>

              <Input
                label="Tax ID / EIN"
                id="taxId"
                placeholder="XX-XXXXXXX"
                {...register("taxId", {
                  required: "Tax ID is required",
                  // Add pattern validation if needed
                })}
                error={errors.taxId?.message}
                aria-invalid={errors.taxId ? "true" : "false"}
              />
            </div>

            <div className="flex justify-end mt-8">
              {/* Use the handleNextStep handler */}
              <Button
                type="button"
                onClick={handleNextStep}
                rightIcon={<ArrowRight size={18} />}
              >
                Next: Address
              </Button>
            </div>
          </div>
        )}
        {/* Step 2: Address Details */}
        {currentStep === 2 && (
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm animate-fadeIn">
            <h2 className="flex items-center mb-6 text-xl font-semibold text-gray-900">
              <Store className="mr-2 text-primary-600" size={22} />
              Business Address
            </h2>

            <div className="space-y-4">
              <Input
                label="Street Address"
                id="address"
                placeholder="123 Business Street"
                {...register("address", {
                  required: "Address is required",
                })}
                error={errors.address?.message}
                aria-invalid={errors.address ? "true" : "false"}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="City"
                  id="city"
                  placeholder="City"
                  {...register("city", {
                    required: "City is required",
                  })}
                  error={errors.city?.message}
                  aria-invalid={errors.city ? "true" : "false"}
                />

                <Input
                  label="State / Province"
                  id="state"
                  placeholder="State / Province"
                  {...register("state", {
                    required: "State/Province is required",
                  })}
                  error={errors.state?.message}
                  aria-invalid={errors.state ? "true" : "false"}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Zip / Postal Code"
                  id="zipCode"
                  placeholder="12345"
                  {...register("zipCode", {
                    required: "Zip/Postal code is required",
                  })}
                  error={errors.zipCode?.message}
                  aria-invalid={errors.zipCode ? "true" : "false"}
                />

                <div>
                  <label
                    htmlFor="country"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.country ? "border-error-500" : "border-gray-300"
                    }`}
                    {...register("country", {
                      required: "Country is required",
                    })}
                    aria-invalid={errors.country ? "true" : "false"}
                  >
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>{" "}
                    {/* Corrected value */}
                    <option value="AU">Australia</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                    <option value="JP">Japan</option>
                    {/* Add more countries as needed */}
                  </select>
                  {errors.country?.message && (
                    <div className="flex items-center mt-1 text-xs text-error-600">
                      <AlertCircle size={14} className="mr-1" />{" "}
                      {errors.country?.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
              {/* Use the handleNextStep handler */}
              <Button
                type="button"
                onClick={handleNextStep}
                rightIcon={<ArrowRight size={18} />}
              >
                Next: Additional Info
              </Button>
            </div>
          </div>
        )}
        {/* Step 3: Additional Information */}
        {currentStep === 3 && (
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm animate-fadeIn">
            <h2 className="flex items-center mb-6 text-xl font-semibold text-gray-900">
              <Store className="mr-2 text-primary-600" size={22} />
              Additional Information
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="businessDescription"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Business Description
                </label>
                <textarea
                  id="businessDescription"
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.businessDescription
                      ? "border-error-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Tell us about your business, products, and services..."
                  {...register("businessDescription", {
                    required: "Business description is required",
                    minLength: {
                      value: 20,
                      message: "Please provide at least 20 characters",
                    },
                    maxLength: {
                      value: 1000, // Example max length
                      message: "Description cannot exceed 1000 characters",
                    },
                  })}
                  aria-invalid={errors.businessDescription ? "true" : "false"}
                ></textarea>
                {errors.businessDescription?.message && (
                  <div className="flex items-center mt-1 text-xs text-error-600">
                    <AlertCircle size={14} className="mr-1" />{" "}
                    {errors.businessDescription?.message}
                  </div>
                )}
              </div>

              <Input
                label="Website (optional)"
                id="website"
                placeholder="https://yourbusiness.com"
                helperText="If you have an existing website, please provide the URL"
                {...register("website", {
                  // Optional: Add URL pattern validation if a value is entered
                  pattern: {
                    value:
                      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                    message:
                      "Please enter a valid URL (e.g., https://example.com)",
                  },
                })}
                error={errors.website?.message}
                aria-invalid={errors.website ? "true" : "false"}
              />

              {/* Required Documents Info Box */}
              <div className="p-4 border border-blue-200 rounded-md bg-blue-50">
                <h3 className="mb-2 text-sm font-medium text-blue-900">
                  Required Documents (Next Step)
                </h3>
                <p className="mb-3 text-sm text-blue-700">
                  Please prepare the following documents. You'll be asked to
                  upload them after submitting this initial registration:
                </p>
                <ul className="pl-5 space-y-1 text-sm text-blue-700 list-disc">
                  <li>Business registration certificate</li>
                  <li>Tax identification document (e.g., EIN confirmation)</li>
                  <li>Government-issued ID of the primary business owner</li>
                  <li>Proof of business address (e.g., utility bill)</li>
                  <li>Bank account information for payouts</li>
                </ul>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="mt-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      className={`w-4 h-4 border rounded text-primary-600 focus:ring-primary-500 ${
                        errors.terms ? "border-error-500" : "border-gray-300"
                      }`}
                      {...register("terms", {
                        required: "You must agree to the terms and conditions",
                      })}
                      aria-invalid={errors.terms ? "true" : "false"}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-medium text-gray-700"
                    >
                      I agree to the{" "}
                      <a
                        href="/seller-terms" // Use actual link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-primary-600 hover:text-primary-700"
                      >
                        Seller Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="/marketplace-policies" // Use actual link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-primary-600 hover:text-primary-700"
                      >
                        Marketplace Policies
                      </a>
                    </label>
                    {errors.terms?.message && (
                      <div className="flex items-center mt-1 text-xs text-error-600">
                        <AlertCircle size={14} className="mr-1" />{" "}
                        {errors.terms?.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
              {/* This is the final submit button */}
              <Button type="submit" isLoading={isLoading}>
                Submit Registration
              </Button>
            </div>
          </div>
        )}
      </form>
      {/* Simple fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SellerRegistrationForm;

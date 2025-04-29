import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '../../context/ToastContext';
import Input from '../common/Input';
import Button from '../common/Button';
import { PackagePlus } from 'lucide-react';

interface AddProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: FileList;
}

const AddProductForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddProductFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const onSubmit = async (data: AddProductFormData) => {
    try {
      setIsLoading(true);
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showToast('Product added successfully!', 'success');
      reset();
    } catch (error) {
      showToast('Failed to add product', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-900">
          <PackagePlus className="mr-2 text-primary-600" size={22} />
          Add New Product
        </h2>

        <div className="space-y-4">
          <Input
            label="Product Name"
            placeholder="Enter product name"
            {...register('name', {
              required: 'Product name is required',
              minLength: {
                value: 3,
                message: 'Product name must be at least 3 characters',
              },
            })}
            error={errors.name?.message}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={4}
              placeholder="Describe your product..."
              {...register('description', {
                required: 'Description is required',
                minLength: {
                  value: 20,
                  message: 'Description must be at least 20 characters',
                },
              })}
            />
            {errors.description?.message && (
              <p className="mt-1 text-xs text-error-500">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register('price', {
                required: 'Price is required',
                min: {
                  value: 0.01,
                  message: 'Price must be greater than 0',
                },
              })}
              error={errors.price?.message}
            />

            <Input
              label="Stock Quantity"
              type="number"
              placeholder="0"
              {...register('stock', {
                required: 'Stock quantity is required',
                min: {
                  value: 0,
                  message: 'Stock cannot be negative',
                },
              })}
              error={errors.stock?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              {...register('category', {
                required: 'Category is required',
              })}
            >
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home & Kitchen</option>
              <option value="books">Books</option>
              <option value="beauty">Beauty</option>
              <option value="sports">Sports</option>
              <option value="toys">Toys</option>
            </select>
            {errors.category?.message && (
              <p className="mt-1 text-xs text-error-500">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              {...register('images', {
                required: 'At least one image is required',
              })}
            />
            {errors.images?.message && (
              <p className="mt-1 text-xs text-error-500">{errors.images.message}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            isLoading={isLoading}
            leftIcon={<PackagePlus size={18} />}
          >
            Add Product
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddProductForm;
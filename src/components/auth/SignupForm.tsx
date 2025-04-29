import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Input from '../common/Input';
import Button from '../common/Button';
import { UserPlus } from 'lucide-react';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      await signup(data.name, data.email, data.password);
      showToast('Account created successfully', 'success');
      navigate('/');
    } catch (error) {
      showToast('Failed to create account', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <div className="mb-6">
        <Input
          label="Full Name"
          placeholder="John Doe"
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
          })}
          error={errors.name?.message}
        />
      </div>

      <div className="mb-6">
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          error={errors.email?.message}
        />
      </div>
      
      <div className="mb-6">
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          error={errors.password?.message}
        />
      </div>
      
      <div className="mb-6">
        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match',
          })}
          error={errors.confirmPassword?.message}
        />
      </div>
      
      <div className="flex items-center mb-6">
        <input
          id="terms"
          type="checkbox"
          className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          {...register('terms', {
            required: 'You must agree to the terms and conditions',
          })}
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I agree to the{' '}
          <a href="#" className="text-primary-600 hover:text-primary-700">
            Terms and Conditions
          </a>
        </label>
      </div>
      
      <div className="mb-6">
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          leftIcon={<UserPlus size={18} />}
        >
          Create Account
        </Button>
      </div>
      
      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
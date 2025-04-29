import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Input from '../common/Input';
import Button from '../common/Button';
import { LogIn } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password);
      showToast('Successfully logged in', 'success');
      navigate('/');
    } catch (error) {
      showToast('Failed to login', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
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
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        <div>
          <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
            Forgot password?
          </a>
        </div>
      </div>
      
      <div className="mb-6">
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          leftIcon={<LogIn size={18} />}
        >
          Sign in
        </Button>
      </div>
      
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-700">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
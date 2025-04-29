import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, helperText, className = '', ...props }, ref) => {
    const inputClasses = `
      px-4 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
      ${error ? 'border-error-500' : 'border-gray-300'}
      ${fullWidth ? 'w-full' : ''}
      ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
      ${className}
    `;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && (
          <label
            htmlFor={props.id || props.name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${props.id || props.name}-error` : helperText ? `${props.id || props.name}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <div id={`${props.id || props.name}-error`} role="alert" className="mt-1 text-xs text-error-500">
            {error}
          </div>
        )}
        {helperText && !error && (
          <div id={`${props.id || props.name}-helper`} className="mt-1 text-xs text-gray-500">
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
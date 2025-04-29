import React from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-error-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-primary-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-success-50 border-success-500';
      case 'error':
        return 'bg-error-50 border-error-500';
      case 'warning':
        return 'bg-warning-50 border-warning-500';
      case 'info':
      default:
        return 'bg-primary-50 border-primary-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`flex items-center p-4 rounded-lg shadow-md border-l-4 ${getBgColor()} min-w-[280px] max-w-md`}
    >
      <div className="flex-shrink-0 mr-3">{getIcon()}</div>
      <div className="flex-1 mr-2">
        <p className="text-sm font-medium text-gray-800">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 rounded-md hover:bg-gray-200 transition-colors"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </motion.div>
  );
};

export default Toast;
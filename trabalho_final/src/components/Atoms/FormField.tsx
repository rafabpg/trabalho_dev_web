import React from 'react';
import Input from './Input'; // Importa o componente Input
import { MaskProps } from '@react-input/mask';

interface FormFieldProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  register: any;
  mask?: MaskProps;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, id, placeholder, register, mask, error, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        mask={mask}
        {...props}
        {...register} // Integra o React Hook Form
        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;

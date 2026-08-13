import type { ControllerRenderProps } from 'react-hook-form';
import { Input } from '@/components/index';

interface TextFieldProps {
  field: ControllerRenderProps<any, any>;
  placeholder?: string;
  type?: string;
}

export function TextField({ field, placeholder, type = 'text' }: TextFieldProps) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      className="h-10"
      {...field}
    />
  );
}

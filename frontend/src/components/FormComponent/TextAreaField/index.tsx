import type { ControllerRenderProps } from 'react-hook-form';
import { Textarea } from '@/components/index';

interface TextAreaFieldProps {
  field: ControllerRenderProps<any, any>;
  placeholder?: string;
}

export function TextAreaField({ field, placeholder }: TextAreaFieldProps) {
  return (
    <Textarea
      placeholder={placeholder}
      className="min-h-[120px] resize-y"
      {...field}
    />
  );
}

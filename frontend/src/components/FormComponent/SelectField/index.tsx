import type { ControllerRenderProps } from 'react-hook-form';
import { Select2 } from '@/components/index';
import type { FieldOption } from '@/types/types';

interface SelectFieldProps {
  field: ControllerRenderProps<any, any>;
  options: FieldOption[];
  placeholder?: string;
  isMulti?: false;
}

export function SelectField({ field, options, placeholder }: SelectFieldProps) {
  return (
    <Select2
      options={options}
      value={options.find((o) => o.value === field.value) || null}
      onChange={(val: any) => field.onChange(val?.value || '')}
      placeholder={placeholder || 'Select an option...'}
      noOptionsMessage={() => 'No item found'}
    />
  );
}

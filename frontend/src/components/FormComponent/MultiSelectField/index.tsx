import type { ControllerRenderProps } from 'react-hook-form';
import { Select2 } from '@/components/index';
import type { FieldOption } from '@/types/types';

interface MultiSelectFieldProps {
  field: ControllerRenderProps<any, any>;
  options: FieldOption[];
  placeholder?: string;
}

export function MultiSelectField({ field, options, placeholder }: MultiSelectFieldProps) {
  const value: FieldOption[] = Array.isArray(field.value)
    ? options.filter((o) => (field.value as string[]).includes(o.value))
    : [];

  return (
    <Select2
      isMulti
      options={options}
      value={value}
      onChange={(selected: any) =>
        field.onChange(selected ? (selected as FieldOption[]).map((s) => s.value) : [])
      }
      placeholder={placeholder || 'Select options...'}
      noOptionsMessage={() => 'No item found'}
    />
  );
}

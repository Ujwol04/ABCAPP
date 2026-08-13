import type { ControllerRenderProps } from 'react-hook-form';
import { Checkbox } from '@/components/index';
import type { FieldOption } from '@/types/types';

interface CheckboxFieldProps {
  field: ControllerRenderProps<any, any>;
  options: FieldOption[];
}

export function CheckboxField({ field, options }: CheckboxFieldProps) {
  const selected: string[] = Array.isArray(field.value) ? field.value : [];

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      field.onChange(selected.filter((v) => v !== value));
    } else {
      field.onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 pt-1">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center gap-2 cursor-pointer text-sm font-medium"
        >
          <Checkbox
            checked={selected.includes(opt.value)}
            onCheckedChange={() => toggle(opt.value)}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  );
}

import type { ControllerRenderProps } from 'react-hook-form';
import { Select2 } from '@/components/index';
import type { FieldOption } from '@/types/types';

/**
 * SingleSelectField – a wrapper around the generic Select2 component for **single** selection.
 * It mirrors the existing SelectField but explicitly forces `isMulti` to `false` and
 * provides a clearer API name for consumers who only need a single‑select dropdown.
 */
interface SingleSelectFieldProps {
  /** React Hook Form field controller */
  field: ControllerRenderProps<any, any>;
  /** Options displayed in the dropdown */
  options: FieldOption[];
  /** Placeholder text when no option is selected */
  placeholder?: string;
}

export function SingleSelectField({ field, options, placeholder }: SingleSelectFieldProps) {
  return (
    <Select2
      // Explicitly set `isMulti` to false (default for Select2) – ensures single selection
      isMulti={false}
      options={options}
      // Map RHF value to an option object; fall back to null for uncontrolled state
      value={options.find((o) => o.value === field.value) || null}
      // RHF expects the raw value; we forward the selected option's value
      onChange={(val: any) => field.onChange(val?.value ?? '')}
      placeholder={placeholder || 'Select an option...'}
      noOptionsMessage={() => 'No item found'}
      isClearable
    />
  );
}

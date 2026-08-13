import { useForm } from 'react-hook-form';
import type { DefaultValues, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/index';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import type { FieldConfig } from '@/types/types';
import { TextField } from '@/components/FormComponent/TextField';
import { TextAreaField } from '@/components/FormComponent/TextAreaField';
import { SelectField } from '@/components/FormComponent/SelectField';

import { MultiSelectField } from '@/components/FormComponent/MultiSelectField';
import { CheckboxField } from '@/components/FormComponent/CheckboxField';
import { EditorField } from '@/components/FormComponent/EditorField';

export type FormMode = 'create' | 'update';

export interface DynamicFormProps<T extends FieldValues> {
  fields: FieldConfig[];
  schema: any; // Yup schema
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => void;
  onCancel?: () => void;
  /** The name of the feature / entity, e.g. "Post", "User", "Event".
   *  When omitted the header shows "Create" / "Update" and the submit
   *  button defaults to "Save Information". */
  featureName?: string;
  /** Controls whether the header reads "Create <featureName>" or "Update <featureName>" */
  mode?: FormMode;
  formDescription?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
}

export function DynamicForm<T extends FieldValues>({
  fields,
  schema,
  defaultValues,
  onSubmit,
  onCancel,
  featureName,
  mode = 'create',
  formDescription,
  submitButtonText,
  cancelButtonText = 'Cancel',
}: DynamicFormProps<T>) {
  const form = useForm<any>({
    resolver: yupResolver(schema) as any,
    defaultValues,
  });

  // Derive a readable title from mode + featureName
  const formTitle = featureName
    ? mode === 'create'
      ? `Create ${featureName}`
      : `Update ${featureName}`
    : mode === 'create'
      ? 'Create'
      : 'Update';

  // Default submit label: explicit prop > mode+name > fallback
  const resolvedSubmitLabel =
    submitButtonText ??
    (featureName
      ? mode === 'create'
        ? `Save ${featureName}`
        : `Update ${featureName}`
      : 'Save Information');

  const renderField = (fieldConfig: FieldConfig, field: any) => {
    switch (fieldConfig.type) {
      case 'select':
        return (
          <FormControl>
            <SelectField
              field={field}
              options={fieldConfig.options || []}
              placeholder={fieldConfig.placeholder}
            />
          </FormControl>
        );

      case 'multiselect':
        return (
          <FormControl>
            <MultiSelectField
              field={field}
              options={fieldConfig.options || []}
              placeholder={fieldConfig.placeholder}
            />
          </FormControl>
        );
      case 'checkbox':
        return (
          <FormControl>
            <CheckboxField
              field={field}
              options={fieldConfig.options || []}
            />
          </FormControl>
        );
      case 'editor':
        return (
          <FormControl>
            <EditorField field={field} />
          </FormControl>
        );
      case 'textarea':
        return (
          <FormControl>
            <TextAreaField field={field} placeholder={fieldConfig.placeholder} />
          </FormControl>
        );
      default:
        return (
          <FormControl>
            <TextField field={field} placeholder={fieldConfig.placeholder} type={fieldConfig.type} />
          </FormControl>
        );
    }
  };

  const isFullWidth = (type: string) =>
    ['editor', 'textarea', 'checkbox', 'multiselect'].includes(type);

  const goBack = () => window.history.back();

  return (
    <div className="w-full">
      {/* ── Header ── */}
      <div className="mb-6 pb-4 border-b border-border">
        {/* Back button row */}
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 mb-3 group"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-150 group-hover:-translate-x-0.5"
          />
          <span>Back</span>
        </button>

        {/* Title + description */}
        <h2 className="text-2xl font-bold text-foreground">{formTitle}</h2>
        {formDescription && (
          <p className="text-sm text-muted-foreground mt-1">{formDescription}</p>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-6">
          {/* ── Fields Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((fieldConfig) => (
              <div
                key={fieldConfig.name}
                className={isFullWidth(fieldConfig.type) ? 'md:col-span-2' : ''}
              >
                <FormField
                  control={form.control}
                  name={fieldConfig.name as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-foreground">
                        {fieldConfig.label}
                      </FormLabel>
                      {renderField(fieldConfig, field)}
                      {fieldConfig.description && (
                        <FormDescription>{fieldConfig.description}</FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          {/* ── Action Buttons (bottom-right) ── */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="px-6"
              >
                {cancelButtonText}
              </Button>
            )}
            <Button
              type="submit"
              className="px-8 bg-blue-600 hover:bg-blue-800 text-white transition-colors duration-200"
            >
              {resolvedSubmitLabel}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

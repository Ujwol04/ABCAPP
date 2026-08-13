import { useMemo } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import JoditEditor from 'jodit-react';

interface EditorFieldProps {
  field: ControllerRenderProps<any, any>;
}

export function EditorField({ field }: EditorFieldProps) {
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Start writing your content here...',
      height: 400,
      theme: 'default',
    }),
    []
  );

  return (
    <div className="border rounded-md overflow-hidden">
      <JoditEditor
        value={field.value || ''}
        config={config}
        onBlur={field.onChange}
        onChange={() => {}}
      />
    </div>
  );
}

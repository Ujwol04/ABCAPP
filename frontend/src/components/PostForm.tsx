import * as yup from 'yup';
import { useState } from 'react';
import { DynamicForm } from '@/components/FormComponent/Form';
import type { FieldConfig } from '@/types/types';

const formSchema = yup.object({
  title: yup.string().min(2, 'Title must be at least 2 characters.'),
  description: yup.string().min(2, 'Description must be at least 2 characters.'),
  category: yup.string().required('Please select a category.'),
  tags: yup.array().of(yup.string()),
  features: yup.array().of(yup.string()),
  content: yup.string().min(10, 'Content must be at least 10 characters.'),
});

type FormValues = yup.InferType<typeof formSchema>;

const postFields: FieldConfig[] = [
  {
    name: 'title',
    label: 'Post Title',
    type: 'text',
    placeholder: 'e.g. How to use React Hook Form',
    description: 'This is the main heading of your post.',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    placeholder: 'Brief description of the post',
  },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    placeholder: 'Select a relevant category',
    description: 'Helps users find your post easier.',
    options: [
      { label: 'Technology', value: 'technology' },
      { label: 'Design', value: 'design' },
      { label: 'Business', value: 'business' },
      { label: 'Science', value: 'science' },
    ],
  },
  {
    name: 'tags',
    label: 'Tags',
    type: 'multiselect',
    placeholder: 'Select one or more tags',
    options: [
      { label: 'React', value: 'react' },
      { label: 'TypeScript', value: 'typescript' },
      { label: 'CSS', value: 'css' },
      { label: 'Node.js', value: 'nodejs' },
    ],
  },
  {
    name: 'features',
    label: 'Post Features',
    type: 'checkbox',
    options: [
      { label: 'Featured Post', value: 'featured' },
      { label: 'Allow Comments', value: 'comments' },
      { label: 'Send Newsletter', value: 'newsletter' },
    ],
  },
  {
    name: 'content',
    label: 'Post Content',
    type: 'editor',
  },
];

// Sample existing data for the update form
const existingPostData: FormValues = {
  title: 'Getting Started with React',
  description: 'A beginner-friendly guide to React.',
  category: 'technology',
  tags: ['react', 'typescript'],
  features: ['featured'],
  content: 'React is a JavaScript library for building user interfaces...',
};

export default function PostForm() {
  // Toggle between 'create' and 'update' demo
  const [mode, setMode] = useState<'create' | 'update'>('create');

  function onSubmit(values: FormValues) {
    console.log(`[${mode.toUpperCase()}] Form submitted with:`, values);
    alert(`[${mode.toUpperCase()}] Saved!\n\n` + JSON.stringify(values, null, 2));
  }

  function onCancel() {
    console.log('Form cancelled');
    alert('Form cancelled — navigating back or closing modal.');
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Demo mode switcher */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setMode('create')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${mode === 'create'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
        >
          Create Mode
        </button>
        <button
          onClick={() => setMode('update')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${mode === 'update'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
        >
          Update Mode
        </button>
      </div>

      <DynamicForm<FormValues>
        key={mode}   // remount to reset form when switching modes
        fields={postFields}
        schema={formSchema}
        defaultValues={mode === 'update' ? existingPostData : {
          title: '',
          description: '',
          category: '',
          tags: [],
          features: [],
          content: '',
        }}
        onSubmit={onSubmit}
        onCancel={onCancel}
        featureName="Post"
        mode={mode}
        formDescription={
          mode === 'create'
            ? 'Fill in the details below to publish a new post to the platform.'
            : 'Edit the details below to update the existing post.'
        }
      />
    </div>
  );
}

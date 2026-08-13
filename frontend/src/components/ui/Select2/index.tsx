import React from 'react';
import Select from 'react-select';
import type { Props as SelectProps, StylesConfig } from 'react-select';

export const select2Styles: StylesConfig<any, any> = {
  control: (base) => ({
    ...base,
    borderColor: 'var(--border)',
    backgroundColor: 'var(--background)',
    color: 'var(--foreground)',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: 'var(--background)',
    border: '1px solid var(--border)',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? 'var(--accent)' : 'var(--background)',
    color: state.isFocused ? 'var(--accent-foreground)' : 'var(--foreground)',
    cursor: 'pointer',
  }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--foreground)',
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: 'var(--accent)',
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: 'var(--accent-foreground)',
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: 'var(--accent-foreground)',
    ':hover': {
      backgroundColor: 'var(--destructive)',
      color: 'var(--destructive-foreground)',
    },
  }),
};

export interface Select2Props extends SelectProps<any, any> {}

export const Select2: React.FC<Select2Props> = (props) => {
  return <Select styles={select2Styles} {...props} />;
};

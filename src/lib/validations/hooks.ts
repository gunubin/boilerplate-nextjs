import React, {InputHTMLAttributes, useEffect, useMemo, useState} from 'react';
import {
  FieldError,
  FieldPath,
  FieldValues,
  useForm as useReactHookForm,
  UseFormProps,
} from 'react-hook-form';

import {createFormResolver, ValidationSchema} from '@/lib/validations/schema';

// TODO:
export type InputProps = {
  name: string;
  // hasError: boolean;
  error?: InputError;
  onChange: InputHTMLAttributes<HTMLElement>['onChange'];
  onBlur: () => void;
};

export type InputError = {
  type: string;
  message: string;
};

export type Fields<T> = {
  [P in keyof T]: InputProps;
};

export function useForm<
  TFieldValues extends FieldValues,
  TSchema extends ValidationSchema<TFieldValues>
>(
  schema: TSchema,
  options: Pick<UseFormProps<TFieldValues>, 'defaultValues'>,
  externalFieldErrors?: Record<string, string[]>
) {
  // Call react-hook-form
  const {
    setValue,
    watch,
    register,
    formState: {isValid, errors},
    handleSubmit,
  } = useReactHookForm({
    ...options,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: createFormResolver(schema),
  });

  // Get all values
  const values = watch();

  const initialFieldsErrorMessages = useMemo(() => {
    return (Object.keys(schema) as FieldPath<TFieldValues>[]).reduce<
      Record<FieldPath<TFieldValues>, string>
    >((acc, name) => {
      const {errorQuery} = schema[name];
      const fieldErrorMessage = externalFieldErrors && errorQuery?.(externalFieldErrors);
      return {
        ...acc,
        [name]: fieldErrorMessage,
      };
    }, {} as Record<FieldPath<TFieldValues>, string>);
  }, [externalFieldErrors, schema]);

  const [fieldsErrorMessages, setFieldsErrorMessages] = useState(initialFieldsErrorMessages);

  useEffect(() => {
    setFieldsErrorMessages(initialFieldsErrorMessages);
  }, [externalFieldErrors, initialFieldsErrorMessages]);

  const fieldProps = React.useMemo(
    () =>
      (Object.keys(schema) as FieldPath<TFieldValues>[]).reduce<Fields<TFieldValues>>(
        (acc, name) => {
          const fieldErrorMessage = fieldsErrorMessages[name];
          const error = {
            ...errors[name],
            ...(fieldErrorMessage && {message: fieldErrorMessage}),
          } as FieldError;
          const hasError = !!error?.message;

          const reg = register(name as FieldPath<TFieldValues>);
          return {
            ...acc,
            [name]: {
              ...(hasError && {error}),
              // hasError,
              ...reg,
            },
          };
        },
        {} as Fields<TFieldValues>
      ),
    [register, schema, errors, fieldsErrorMessages]
  );
  return {
    errors,
    fields: fieldProps,
    handleSubmit,
    isValid,
    setValue,
    values,
  };
}

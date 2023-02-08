import React, {useEffect, useMemo, useState} from 'react';
import {
  FieldError,
  FieldPath,
  FieldValue,
  FieldValues,
  useForm as useReactHookForm,
  UseFormProps,
} from 'react-hook-form';

import {createFormResolver, ValidationSchema} from '@/lib/validations/schema';

export type InputProps<Value = any> = {
  name: string;
  value: Value;
  hasError: boolean;
  error?: InputError;
  onChange: (value: Value) => void;
  onBlur: () => void;
};

export type InputError = {
  type: string;
  message: string;
};

export type Fields<T> = {
  [P in keyof T]: InputProps<T[P]>;
};

// for react-native
// react-native-webで作られたコンポーネントに使用する
export function useFormForRN<
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
    trigger,
    register,
    formState: {isValid, errors, touchedFields},
    handleSubmit,
    reset,
  } = useReactHookForm({
    ...options,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: createFormResolver(schema),
  });

  // Get all values
  const values = watch();

  // Register all fields
  useEffect(() => {
    Object.keys(schema).forEach((name) => {
      register(name as FieldPath<TFieldValues>);
    });
  }, [schema, register]);

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

          const onChange = (value: string | number) => {
            setValue(name, value as FieldValue<TFieldValues>);
            fieldsErrorMessages[name] = '';
            setFieldsErrorMessages(fieldsErrorMessages);
            trigger(name);
          };
          const onBlur = () => {
            if (!touchedFields[name]) {
              // NOTE: Cannot assign true due to DeepMap type definition problem
              (touchedFields as Record<FieldPath<TFieldValues>, true>)[name] = true;
            }
            trigger(name);
          };
          return {
            ...acc,
            [name]: {
              ...(hasError && {error}),
              hasError,
              name,
              onBlur,
              onChange,
              value: values[name],
            },
          };
        },
        {} as Fields<TFieldValues>
      ),
    [schema, setValue, trigger, values, errors, touchedFields, fieldsErrorMessages]
  );
  return {
    errors,
    fields: fieldProps,
    handleSubmit,
    isValid,
    reset,
    setValue,
    values,
  };
}

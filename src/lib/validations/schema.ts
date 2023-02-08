import {FieldErrors, FieldValues, Resolver, UnpackNestedValue} from 'react-hook-form';

import {validate, Validator} from '@/lib/validations/validator';

export type ValidationSchema<
  TFields extends FieldValues = any,
  TFieldErrors = Record<string, string[]> /* FIXME: types */
> = {
  [key in keyof TFields]: {
    errorQuery?: (fieldErrors: TFieldErrors) => string | undefined;
    rules: Validator<any, TFields>[];
  };
};

export function createFormResolver<
  TFields extends FieldValues,
  TSchema extends ValidationSchema<TFields>
>(schema: TSchema): Resolver<TFields> {
  return async (values: UnpackNestedValue<TFields>) => {
    const errors = Object.keys(schema).reduce<FieldErrors<TFields>>((acc, key) => {
      const {rules = []} = schema[key] || {};
      const value = values[key];
      const results = rules.map((rule) => validate(rule, value, values)).filter((v) => !v.isValid);
      const [{message = ''} = {}] = results;
      return {
        ...acc,
        ...(results.length > 0 && {
          [key]: {
            message,
            type: 'validate',
          },
        }),
      };
    }, {} as FieldErrors<TFields>);
    const hasErrors = Object.keys(errors).length > 0;
    return {
      errors: hasErrors ? errors : {},
      values,
    };
  };
}

export function createSchema<T>(definitions: ValidationSchema<Record<keyof T, any>>) {
  return definitions;
}

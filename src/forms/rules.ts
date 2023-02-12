import {ValidatorObject} from '@/domain/lib/types';
import {createValidatorFactory} from '@/lib/validations/validator';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createFieldValidators = (validators: ValidatorObject[], messages: string[]) => {
  return validators.map((validator, index) => {
    return createValidatorFactory<void>({
      message: messages[index] || '',
      type: validator.name,
      validate: validator.validate,
    })();
  });
};

export const required = createValidatorFactory<void>({
  message: '必須項目です',
  type: 'required',
  validate(value) {
    return !!value || value === false;
  },
});

export const maxValue = createValidatorFactory<{
  message: string;
  maximum: number | Date;
}>({
  message: (params) => params.message,
  type: 'maxValue',
  validate(value, _, params) {
    return value <= params.maximum;
  },
});

export const minValue = createValidatorFactory<{
  message: string;
  minimum: number | Date;
}>({
  message: (params) => params.message,
  type: 'minValue',
  validate(value, _, params) {
    return params.minimum <= value;
  },
});
export const minLength = createValidatorFactory<number>({
  message: (params) => `${params}文字以上で入力してください`,
  type: 'minLength',
  validate(value = '', _, params) {
    return value.length >= params;
  },
});
export const maxLength = createValidatorFactory<number>({
  message: (params) => `${params}文字以下で入力してください`,
  type: 'maxLength',
  validate(value = '', _, params) {
    return value.length <= params;
  },
});

export const equal = createValidatorFactory<string>({
  message: '値が一致しません',
  type: 'equal',
  validate: (val: string, values: any, params) => {
    if (!values) {
      return true;
    }
    return values[params] === val;
  },
});

export const validEmail = createValidatorFactory<void>({
  message: 'メールアドレスを入力してください',
  type: 'validEmail',
  validate(value) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  },
});

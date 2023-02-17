import {required} from '@/lib/validations/rules';
import {createSchema} from '@/lib/validations/schema';

export type FormValues = {
  acardNumber: string;
  password: string;
};

export const signInSchema = createSchema<FormValues>({
  acardNumber: {
    rules: [required()],
  },
  password: {
    rules: [required()],
  },
});

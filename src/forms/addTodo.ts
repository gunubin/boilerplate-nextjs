import {required} from '@/forms/rules';
import {createSchema} from '@/lib/validations/schema';

export type FormValues = {
  title: string;
  description?: string;
};

export const addTodoSchema = createSchema<FormValues>({
  description: {
    rules: [],
  },
  title: {
    rules: [required()],
  },
});

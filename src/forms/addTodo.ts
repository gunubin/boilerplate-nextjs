import {TodoTitle} from '@/domain/todo/TodoTitle';
import {createSchema} from '@/lib/validations/schema';

export type FormValues = {
  title: typeof TodoTitle;
  description?: string;
};

export const addTodoSchema = createSchema<FormValues>({
  description: {
    required: false,
  },
  title: {
    required: {message: ''},
    ruleMessages: {
      maxLength: '100文字以下で入力してください',
    },
    valueObject: TodoTitle,
  },
});

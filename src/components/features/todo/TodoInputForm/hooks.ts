import {useMemo} from 'react';

import {Todo} from '@/domain/todo/Todo';
import {addTodoSchema} from '@/forms/addTodo';
import {useForm} from '@/lib/validations/hooks';
import {useAddTodoUseCase} from '@/useCases/todo/addTodoUseCase';

export const useTodoInputForm = () => {
  const [addTodo] = useAddTodoUseCase();

  const {fields, isValid, handleSubmit, errors} = useForm(addTodoSchema, {
    defaultValues: {
      description: '',
      title: '',
    },
  });

  const onPressButton = useMemo(
    () =>
      handleSubmit((values) => {
        const item = Todo.create({description: values.description, title: values.title});
        addTodo({item});
      }),
    [handleSubmit, addTodo]
  );

  return {fields, isValid, onPressButton};
};

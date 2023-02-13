import {useRouter} from 'next/router';
import {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';

import {Todo} from '@/domain/todo/Todo';
import {TodoId} from '@/domain/todo/TodoId';
import {addTodoSchema} from '@/forms/addTodo';
import {RootState} from '@/lib/redux/rootReducer';
import {useForm} from '@/lib/validations/hooks';
import {todoSelectors} from '@/services/domain/todo/redux/todoSlice';
import {useUpdateTodoUseCase} from '@/useCases/todo/updateTodoUseCase';

export const useTodoEditForm = () => {
  const {
    query: {todoId = ''},
  } = useRouter();
  const id = TodoId.create(todoId as string);
  const item = useSelector((state: RootState) => todoSelectors.selectById(state, id));

  const [updateTodo] = useUpdateTodoUseCase();

  const {fields, isValid, handleSubmit, setValue} = useForm(addTodoSchema, {
    defaultValues: {
      description: item?.description,
      title: item?.title,
    },
  });

  useEffect(() => {
    setValue('title', item?.title);
    setValue('description', item?.description);
  }, [setValue, item]);

  const onPressButton = useMemo(
    () =>
      handleSubmit((values) => {
        const item = Todo.create({description: values.description, id, title: values.title || ''});
        updateTodo({item});
      }),
    [handleSubmit, updateTodo, id]
  );

  return {fields, isValid, onPressButton};
};

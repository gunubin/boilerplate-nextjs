import {useRouter} from 'next/router';
import {useEffect, useMemo} from 'react';

import {Todo} from '@/domain/todo/Todo';
import {TodoId} from '@/domain/todo/TodoId';
import {addTodoSchema} from '@/forms/addTodo';
import {useIndicator} from '@/hooks/indicator';
import {createQuery} from '@/lib/useCase/utils';
import {useForm} from '@/lib/validations/hooks';
import {useGetTodoQuery} from '@/services/domain/todo/redux/todoApi';
import {useUpdateTodoUseCase} from '@/useCases/todo/updateTodoUseCase';

export const useTodoEditForm = () => {
  const {
    query: {todoId = ''},
    isReady
  } = useRouter();
  const id = TodoId.create(todoId as string);

  const {data: item} = createQuery(useGetTodoQuery)(id, {skip: !isReady});

  const [updateTodo, {isLoading}] = useUpdateTodoUseCase();

  useIndicator(isLoading)

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

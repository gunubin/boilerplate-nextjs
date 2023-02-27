import {useCallback} from 'react';

import {TodoId} from '@/domain/todo/TodoId';
import {createQuery} from '@/lib/useCase/utils';
import {useNavigation} from '@/services/app/navigation/Navigation';
import {useGetTodoListQuery} from '@/services/domain/todo/redux/todoApi';
import {useRemoveTodoUseCase} from '@/useCases/todo/removeTodoUseCase';

export const useTodoList = () => {
  const [removeTodo] = useRemoveTodoUseCase();
  const {data: list} = createQuery(useGetTodoListQuery, {indicator: true})();

  const nav = useNavigation();

  const onPressItem = useCallback(
    (id: TodoId) => {
      nav.navigate('/todo/[todoId]', {todoId: id});
    },
    [nav]
  );
  const onPressRemove = useCallback(
    (id: TodoId) => {
      removeTodo({id});
    },
    [removeTodo]
  );
  return {list, onPressItem, onPressRemove};
};

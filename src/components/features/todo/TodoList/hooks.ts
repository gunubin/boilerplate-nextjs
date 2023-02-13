import {useCallback} from 'react';
import {useSelector} from 'react-redux';

import {TodoId} from '@/domain/todo/Todo';
import {useNavigation} from '@/services/app/navigation/Navigation';
import {todoSelectors} from '@/services/domain/todo/redux/todoSlice';
import {useRemoveTodoUseCase} from '@/useCases/todo/removeTodoUseCase';

export const useTodoList = () => {
  const [removeTodo] = useRemoveTodoUseCase();
  const list = useSelector(todoSelectors.selectAll);
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

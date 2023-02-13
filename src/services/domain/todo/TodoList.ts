import {ITodoListService} from '@/domain/todo/types';
import {ReduxProvider} from '@/lib/redux/ReduxProvider';
import {todoAdded, todoRemoved} from '@/services/domain/todo/redux/todoSlice';

export const createTodoList = (): ITodoListService => {
  const redux = ReduxProvider.create();
  return {
    add: async ({item}) => {
      redux.dispatch(todoAdded(item));
    },
    remove: async ({id}) => {
      redux.dispatch(todoRemoved(id));
    },
    update: ({item}) => {
      redux.dispatch(todoAdded(item));
    },
  };
};

import {ITodoListService} from '@/domain/todo/types';
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@/services/domain/todo/redux/todoApi';

export const useTodoList = (): ITodoListService => {
  const [createTodo] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  return {
    add: async ({item}) => {
      return createTodo(item).unwrap();
    },
    remove: async ({id}) => {
      return deleteTodo(id).unwrap();
    },
    update: ({item}) => {
      return updateTodo(item).unwrap();
    },
  };
};

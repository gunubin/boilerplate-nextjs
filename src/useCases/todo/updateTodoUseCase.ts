import {Todo} from '@/domain/todo/Todo';
import {createUseCaseFactory} from '@/lib/useCase/utils';
import {useTodoList} from '@/services/domain/todo/TodoList';

type Params = {
  item: Todo;
};

export const useUpdateTodoUseCase = createUseCaseFactory<Params>(() => {
  const todoList = useTodoList();
  return async function removeTodoUseCase({item}) {
    await todoList.update({item});
  };
});

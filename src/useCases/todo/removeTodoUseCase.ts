import {TodoId} from '@/domain/todo/Todo';
import {createUseCaseFactory} from '@/lib/useCase/utils';
import {createTodoList} from '@/services/domain/todo/TodoList';

type Params = {
    id: TodoId;
};

export const useRemoveTodoUseCase = createUseCaseFactory<Params>(() => {
    const todoList = createTodoList();
    return async function removeTodoUseCase({id}) {
        todoList.remove({id})
    };
});

import {Todo} from '@/domain/todo/Todo';
import {createUseCaseFactory} from '@/lib/useCase/utils';
import {createTodoList} from '@/services/domain/todo/TodoList';

type Params = {
    item: Todo;
};

export const useAddTodoUseCase = createUseCaseFactory<Params>(() => {
    const todoList = createTodoList();
    return async function addTodoUseCase({item}) {
        todoList.add({item})
    };
});

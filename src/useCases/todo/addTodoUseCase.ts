
import {Todo} from '@/domain/todo/Todo';
import {createUseCaseFactory} from '@/lib/useCase/utils';
import {useTodoList} from '@/services/domain/todo/TodoList';

type Params = {
    item: Todo;
};

export const useAddTodoUseCase = createUseCaseFactory<Params>(() => {
    const todoList = useTodoList();
    return async function addTodoUseCase({item}) {
        await todoList.add({item})
    };
});

import {TodoId} from '@/domain/todo/TodoId';
import {ReduxProvider} from '@/lib/redux/ReduxProvider';
import {createUseCaseFactory} from '@/lib/useCase/utils';
import {createMessageDialog} from '@/services/app/modal/MessageDialog';
import {useTodoList} from '@/services/domain/todo/TodoList';
import {todoApi} from '@/services/domain/todo/redux/todoApi';

type Params = {
    id: TodoId;
};

export const useRemoveTodoUseCase = createUseCaseFactory<Params>(() => {
    const todoList = useTodoList();
    const dialog = createMessageDialog()
    const redux = ReduxProvider.create()
    return async function removeTodoUseCase({id}) {
        const {data: todos} = todoApi.endpoints.getTodoList.select()(redux.getState())
        const todo = todos?.find(t => t.id === id)
        const ret = await dialog.show({
            labels: ['キャンセル', '削除'],
            message: `${todo?.title}を削除してもよろしいですか？`,
            title: 'TODO削除'
        })
        if (ret === '削除') {
            await todoList.remove({id})
        }
    };
});

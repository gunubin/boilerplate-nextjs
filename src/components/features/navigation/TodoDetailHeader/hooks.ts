import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';

import {TodoId} from '@/domain/todo/TodoId';
import {RootState} from '@/lib/redux/rootReducer';
import {todoSelectors} from '@/services/domain/todo/redux/todoSlice';


export const useTodoDetailHeader = () => {
    const {
        query: {todoId = ''},
    } = useRouter();
    const id = TodoId.create(todoId as string);
    const item = useSelector((state: RootState) => todoSelectors.selectById(state, id));

   return {
       item
   } 
}

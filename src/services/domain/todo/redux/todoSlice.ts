import {createEntityAdapter, createSelector, createSlice} from '@reduxjs/toolkit';

import {Todo} from '@/domain/todo/Todo';
import {RootState} from '@/lib/redux/rootReducer';

const todoEntityAdapter = createEntityAdapter<Todo>();

const selectState = (state: RootState) => state.todo;

const baseSelectors = todoEntityAdapter.getSelectors(selectState);

const todoSlice = createSlice({
  initialState: todoEntityAdapter.getInitialState,
  name: 'todo',
  reducers: {
    todoAdded: todoEntityAdapter.upsertOne,
    todoRemoved: todoEntityAdapter.removeOne,
  },
});

export const todoSelectors = {
  selectAll: baseSelectors.selectAll,
};
export const {todoAdded, todoRemoved} = todoSlice.actions;
export default todoSlice.reducer;

import {createEntityAdapter, createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ModalId} from '@/adapters/services/modal/ModalId';
import {ModalPayload} from '@/adapters/services/modal/types';
import {RootState} from '@/lib/redux/rootReducer';

const modalEntityAdapter = createEntityAdapter<ModalPayload>();

const selectState = (state: RootState) => state.modal;
const baseSelectors = modalEntityAdapter.getSelectors(selectState);
const selectLatestModal = createSelector(baseSelectors.selectAll, (all) => all[all.length - 1]);

const modalSlice = createSlice({
  initialState: modalEntityAdapter.getInitialState(),
  name: 'modal',
  reducers: {
    hid: (state, action: PayloadAction<{id: ModalId; label?: string}>) => {
      return modalEntityAdapter.removeOne(state, action.payload.id);
    },
    showed: modalEntityAdapter.upsertOne,
  },
});

export const actions = modalSlice.actions;
export const modalSelectors = {
  selectLatestModal,
};
export default modalSlice.reducer;

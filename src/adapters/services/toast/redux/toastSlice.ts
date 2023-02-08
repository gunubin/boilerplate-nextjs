import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';

import {ToastStatus} from '@/adapters/services/toast/types';
import {RootState} from '@/lib/redux/rootReducer';

type ToastState = {
  id: string;
  message: string;
  status?: ToastStatus;
};

const sliceName = 'toast';
const toastEntityAdapter = createEntityAdapter<ToastState>();
const selectState = (state: RootState) => state.toast;
const baseSelectors = toastEntityAdapter.getSelectors<RootState>(selectState);

const slice = createSlice({
  initialState: toastEntityAdapter.getInitialState(),
  name: sliceName,
  reducers: {
    hid: toastEntityAdapter.removeOne,
    showed: toastEntityAdapter.upsertOne,
  },
});

export const actions = slice.actions;
export const toastSelectors = {
  selectById: baseSelectors.selectById,
  selectIds: baseSelectors.selectIds,
};
export default slice.reducer;

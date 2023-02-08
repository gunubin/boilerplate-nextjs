import {createEntityAdapter, createSelector, createSlice} from '@reduxjs/toolkit';

import {BlockingIndicatorPayload} from '@/adapters/services/modal/BlockingIndicatorPayload';
import {RootState} from '@/lib/redux/rootReducer';

const indicatorEntityAdapter = createEntityAdapter<BlockingIndicatorPayload>();

const selectState = (state: RootState) => state.indicator;
const baseSelectors = indicatorEntityAdapter.getSelectors(selectState);
const selectLatestIndicator = createSelector(baseSelectors.selectAll, (all) => all[all.length - 1]);

const indicatorSlice = createSlice({
  initialState: indicatorEntityAdapter.getInitialState(),
  name: 'indicator',
  reducers: {
    cleared: indicatorEntityAdapter.removeAll,
    hid: indicatorEntityAdapter.removeOne,
    showed: indicatorEntityAdapter.upsertOne,
  },
});

export const actions = indicatorSlice.actions;
export const indicatorSelectors = {
  selectById: indicatorEntityAdapter.getSelectors().selectById,
  selectLatestIndicator,
};
export default indicatorSlice.reducer;

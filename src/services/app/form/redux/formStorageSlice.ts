import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '@/lib/redux/rootReducer';

import {FormStorageEntity, FormStorageName, FormStorageEntities} from '../types';

type FormState = Partial<FormStorageEntities>;

const initialState: FormState = {};

const selectState = (state: RootState): FormState => state.formStorage;
const selectForm = <TFormName extends FormStorageName>(formName: TFormName) =>
  createSelector(selectState, (state) => {
    return state[formName];
  });

const formStorageSlice = createSlice({
  initialState,
  name: 'form',
  reducers: {
    reset: (state, action: PayloadAction<{name: FormStorageName}>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {[action.payload.name]: _, ...form} = state;
      return form;
    },
    stored: (state, action: PayloadAction<{name: FormStorageName; entity: FormStorageEntity}>) => {
      const {[action.payload.name]: currentForm} = state as any;
      return {
        ...state,
        [action.payload.name]: {
          ...currentForm,
          ...action.payload.entity,
        },
      };
    },
  },
});

export const formSelectors = {
  selectForm,
};
export const actions = formStorageSlice.actions;
export default formStorageSlice.reducer;

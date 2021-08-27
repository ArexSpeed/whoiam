import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { CategoryPayload, SubcategoryType } from 'types';
import category from 'pages/api/category';


type Word = {
  value: string;
  subId: string;
};

interface State {
  category: CategoryPayload;
  words: Word[];
  addInfo: string;
}

const initialState: State = {
  category: {
    category: '',
    subcategory: '',
    subId: ''
  },
  words: [],
  addInfo: ''
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryPayload>) => {
      state.category = action.payload;
      state.words.push({
        value: '',
        subId: state.category.subId
      });
    },
    addValue: (state) => {
      state.words.push({
        value: '',
        subId: state.category.subId
      });
    },
    removeValue: (state) => {
      state.words.pop();
    },
    changeValue: (state, action) => {
      state.words[action.payload.id].value = action.payload.value;
    },
    setAddInfo : (state, action: PayloadAction<string>) => {
      state.addInfo = action.payload;
    },
    reset: (state) => {
      state.category = {
        category: '',
        subcategory: '',
        subId: ''
      };
      state.words = [];
      state.addInfo = ''
    },
    resetWords: (state) => {
      state.words = [];
    }
  }
});

export const { setCategory, addValue, removeValue, changeValue, setAddInfo, reset, resetWords } = adminSlice.actions;

export const adminCategory = (state: RootState) => state.admin.category;
export const adminWords = (state: RootState) => state.admin.words;
export const adminAddInfo = (state: RootState) => state.admin.addInfo;

export default adminSlice.reducer;

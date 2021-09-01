import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { CategoryPayload, WordsType } from 'types';

type Word = {
  value: string;
  subId: string;
};

interface State {
  category: CategoryPayload;
  words: WordsType[];
  newWords: Word[];
  addInfo: string;
}

const initialState: State = {
  category: {
    category: '',
    subcategory: '',
    subId: ''
  },
  words: [],
  newWords: [],
  addInfo: ''
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryPayload>) => {
      state.category = action.payload;
      state.newWords.push({
        value: '',
        subId: state.category.subId
      });
    },
    setWords: (state, action: PayloadAction<WordsType[]>) => {
      state.words = action.payload;
    },
    addWordValue: (state) => {
      state.newWords.push({
        value: '',
        subId: state.category.subId
      });
    },
    removeWordValue: (state) => {
      state.newWords.pop();
    },
    changeWordValue: (state, action) => {
      state.newWords[action.payload.id].value = action.payload.value;
    },
    setAddInfo: (state, action: PayloadAction<string>) => {
      state.addInfo = action.payload;
    },
    reset: (state) => {
      state.category = {
        category: '',
        subcategory: '',
        subId: ''
      };
      state.newWords = [];
      state.addInfo = '';
    },
    resetWords: (state) => {
      state.newWords = [];
    }
  }
});

// eslint-disable-next-line prettier/prettier
export const { setCategory, setWords, addWordValue, removeWordValue, changeWordValue, setAddInfo, reset, resetWords } = adminSlice.actions;

export const adminCategory = (state: RootState) => state.admin.category;
export const adminWords = (state: RootState) => state.admin.words;
export const adminNewWords = (state: RootState) => state.admin.newWords;
export const adminAddInfo = (state: RootState) => state.admin.addInfo;

export default adminSlice.reducer;

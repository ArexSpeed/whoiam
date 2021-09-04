import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { CategoryPayload, WordsApiType } from 'types';

type NewCategoryAndWord = {
  category: string;
  subcategory: string;
  subId: string;
  addBy: string;
  createdAt: number;
};
type NewWord = {
  value: string;
  subId: string;
  addBy: string;
  createdAt: number;
};

type NewWordPayload = {
  addBy: string;
  createdAt: number;
};

interface State {
  category: CategoryPayload;
  words: WordsApiType[];
  newWords: NewWord[];
  addInfo: string;
  sortValue: string;
}

const initialState: State = {
  category: {
    category: '',
    subcategory: '',
    subId: ''
  },
  words: [],
  newWords: [],
  addInfo: '',
  sortValue: 'dateAsc'
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<NewCategoryAndWord>) => {
      state.category = {
        category: action.payload.category,
        subcategory: action.payload.subcategory,
        subId: action.payload.subId
      };
      state.newWords.push({
        value: '',
        subId: state.category.subId,
        addBy: action.payload.addBy,
        createdAt: action.payload.createdAt
      });
    },
    setWords: (state, action: PayloadAction<WordsApiType[]>) => {
      state.words = action.payload;
    },
    addWordValue: (state, action: PayloadAction<NewWordPayload>) => {
      state.newWords.push({
        value: '',
        subId: state.category.subId,
        addBy: action.payload.addBy,
        createdAt: action.payload.createdAt
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
    changeSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    reset: (state) => {
      state.category = {
        category: '',
        subcategory: '',
        subId: ''
      };
      state.newWords = [];
      state.addInfo = '';
      state.sortValue = 'dateAsc';
    },
    resetWords: (state) => {
      state.newWords = [];
    }
  }
});

// eslint-disable-next-line prettier/prettier
export const { setCategory, setWords, addWordValue, removeWordValue, changeWordValue, setAddInfo, changeSortValue, reset, resetWords } = adminSlice.actions;

export const adminCategory = (state: RootState) => state.admin.category;
export const adminWords = (state: RootState) => state.admin.words;
export const adminNewWords = (state: RootState) => state.admin.newWords;
export const adminAddInfo = (state: RootState) => state.admin.addInfo;
export const adminSortValue = (state: RootState) => state.admin.sortValue;

export default adminSlice.reducer;

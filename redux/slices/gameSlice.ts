import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { CategoryPayload, SubcategoryType } from 'types';

type Question = {
  question: string;
  answer: string;
};

interface State {
  subcategories: SubcategoryType[];
  category: CategoryPayload;
  word: string;
  questions: Question[];
}

const initialState: State = {
  subcategories: [],
  category: {
    category: '',
    subcategory: '',
    subId: ''
  },
  word: '',
  questions: []
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setSubcategories: (state, action: PayloadAction<SubcategoryType[]>) => {
      state.subcategories = action.payload;
    },
    setCategory: (state, action: PayloadAction<CategoryPayload>) => {
      state.category = action.payload;
    },
    setWord: (state, action: PayloadAction<string>) => {
      state.word = action.payload;
    },
    setQuestion: (state, action: PayloadAction<Question>) => {
      state.questions.push(action.payload);
    },
    reset: (state) => {
      state.category = {
        category: '',
        subcategory: '',
        subId: ''
      };
      state.word = '';
      state.questions = [];
    }
  }
});

export const { setSubcategories, setCategory, setWord, setQuestion, reset } = gameSlice.actions;

export const allSubcategories = (state: RootState) => state.game.subcategories;
export const selectedCategory = (state: RootState) => state.game.category;
export const selectedWord = (state: RootState) => state.game.word;
export const selectedQuestions = (state: RootState) => state.game.questions;

export default gameSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type Question = {
  question: string;
  answer: string;
};

type Category = {
  category: string;
  subcategory: string;
  subId: string;
};

interface State {
  category: string;
  subcategory: string;
  subId: string;
  word: string;
  questions: Question[];
}

const initialState: State = {
  category: '',
  subcategory: '',
  subId: '',
  word: '',
  questions: []
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload.category;
      state.subcategory = action.payload.subcategory;
      state.subId = action.payload.subId;
    },
    setWord: (state, action: PayloadAction<string>) => {
      state.word = action.payload;
    },
    setQuestion: (state, action: PayloadAction<Question>) => {
      state.questions.push(action.payload);
    },
    reset: (state) => {
      state.category = '';
      state.subcategory = '';
      state.subId = '';
      state.word = '';
      state.questions = [];
    }
  }
});

export const { setCategory, setWord, setQuestion, reset } = gameSlice.actions;

export const selectedCategory = (state: RootState) => state.game.category;
export const selectedSubcategory = (state: RootState) => state.game.subcategory;
export const selectedSubId = (state: RootState) => state.game.subId;
export const selectedWord = (state: RootState) => state.game.word;
export const selectedQuestions = (state: RootState) => state.game.questions;

export default gameSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

type Question = {
  question: string;
  answer: string;
};

type Category = {
  category: string;
  subcategory: string;
};

interface State {
  category: string;
  subcategory: string;
  questions: Question[];
}

const initialState: State = {
  category: '',
  subcategory: '',
  questions: []
};

export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload.category;
      state.subcategory = action.payload.subcategory;
    },
    setQuestion: (state, action: PayloadAction<Question>) => {
      console.log(action.payload, 'acrion');
      state.questions.push(action.payload);
    },
    reset: (state) => {
      state.category = '';
      state.subcategory = '';
      state.questions = [];
    }
  }
});

export const { setCategory, setQuestion, reset } = slice.actions;

export const selectedCategory = (state: RootState) => state.slice.category;
export const selectedSubcategory = (state: RootState) => state.slice.subcategory;
export const selectedQuestions = (state: RootState) => state.slice.questions;

export default slice.reducer;

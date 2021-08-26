import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type Category = {
  category: string;
  subcategory: string;
  subId: string;
};

type Word = {
  value: string;
};

interface State {
  category: Category;
  words: Word[];
}

const initialState: State = {
  category: {
    category: '',
    subcategory: '',
    subId: ''
  },
  words: [
    {
      value: ''
    }
  ]
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload;
    },
    addValue: (state) => {
      state.words.push({
        value: ''
      });
    },
    removeValue: (state) => {
      state.words.pop();
    },
    changeValue: (state, action) => {
      state.words[action.payload.id].value = action.payload.value;
    },
    reset: (state) => {
      state.category = {
        category: '',
        subcategory: '',
        subId: ''
      };
      state.words = [
        {
          value: ''
        }
      ];
    }
  }
});

export const { setCategory, addValue, removeValue, changeValue, reset } = adminSlice.actions;

export const adminCategory = (state: RootState) => state.admin.category;
export const adminWords = (state: RootState) => state.admin.words;

export default adminSlice.reducer;

// baseSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

export interface BaseState {
  today: string;
}

const initialState: BaseState = {
  today: dayjs().add(0, 'day').format('YYYY-MM-DD'),
};

const BaseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {},
});

export const {} = BaseSlice.actions;
export const baseReducer = BaseSlice.reducer;

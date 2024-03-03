// baseSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Event } from 'types/Events'

export interface BaseState {
  events: Event[]
}

const initialState: BaseState = {
  events: [],
}

const BaseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload
    },
  },
})

export const { setEvents } = BaseSlice.actions
export const baseReducer = BaseSlice.reducer

// baseSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { EventsRoot } from '../../types/Events';
import { GamesRoot } from '../../types/Games';

export interface BaseState {
  today: string;
  events: EventsRoot[];
  games: GamesRoot[];
}

const initialState: BaseState = {
  today: dayjs().add(0, 'day').format('YYYY-MM-DD'),
  events: [],
  games: [],
};

const BaseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<EventsRoot[]>) => {
      state.events = action.payload;
    },
    setGames: (state, action: PayloadAction<GamesRoot[]>) => {
      state.games = action.payload;
      /*
      state.games = action.payload.map((game) => ({
        ...game,
        percentage: game.percentage.map((percent) => ({
          ...percent,
          timestamp: dayjs(percent.timestamp).format('HH:mm'),
        })),
        odds: game.odds.map((odd) => ({
          ...odd,
          timestamp: dayjs(odd.timestamp).format('HH:mm'),
        })),
      }));
      */
    },
  },
});

export const { setEvents, setGames } = BaseSlice.actions;
export const baseReducer = BaseSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../src/redux/store';

type CounterType = {
    id: number;
    value: number;
};

interface CounterState {
    counters: CounterType[];
}

const initialState: CounterState = {
    counters: [{ id: 0, value: 0 }],
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<Pick<CounterType, 'id'>>) => {
            const findCountId = state.counters.find((obj) => obj.id === action.payload.id);
            if (findCountId) {
                findCountId.value += 1;
            }
        },

        decrement: (state, action: PayloadAction<Pick<CounterType, 'id'>>) => {
            const findCountId = state.counters.find((obj) => obj.id === action.payload.id);
            if (findCountId) {
                findCountId.value -= 1;
            }
        },

        addCounter: (state) => {
            state.counters.push({
                id: Math.floor(Math.random() * 100),
                value: state.counters.reduce((sum, obj) => obj.value + sum, 0),
            });
        },

        removeCounter(state, action: PayloadAction<Pick<CounterType, 'id'>>) {
            state.counters = state.counters.filter((countId) => countId.id !== action.payload.id);
        },
    },
});

export const { increment, decrement, addCounter, removeCounter } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter;

export default counterSlice.reducer;

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
        increment: (state, action: PayloadAction<CounterType>) => {
            const findCountId = state.counters.find((obj) => obj.id === action.payload.id);
            if (findCountId) {
                findCountId.value += 1;
            }

            // передаешь сюда как-то уникальный айдишник кликнутого счетчика
            // state.counters[props.id] += 1;
        },

        decrement: (state, action: PayloadAction<CounterType>) => {
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

        removeCounter(state, action: PayloadAction<CounterType>) {
            state.counters = state.counters.filter((countId) => countId.id !== action.payload.id);
        },

        // addCounter: (state, action: PayloadAction<CounterType>) => {
        //     const findItem = state.counters.find((obj) => obj.id === action.payload.id);

        //     if (findItem) {
        //         findItem.value++;
        //     } else {
        //         state.counters.push({
        //             ...action.payload,
        //             value: 1,
        //         });
        //     }
        //     state.counters[0].id = Math.floor(Math.random() * 100);
        //     // state.counters = {...state.counters, [getUniqId()]: sum(Object.getValues(state.counters))}
        // },
    },
});

export const { increment, decrement, addCounter, removeCounter } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter;

export default counterSlice.reducer;

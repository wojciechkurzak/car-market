import {createSlice} from '@reduxjs/toolkit';
import cars from '../../carsTemp';

const counterSlice = createSlice({
    name: 'counter',
    initialState: cars,
    reducers: {},
});

export const {} = counterSlice.actions;

export default counterSlice;

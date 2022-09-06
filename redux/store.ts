import {configureStore} from '@reduxjs/toolkit';
import carsSlice from './slices/cars-slice';

const store = configureStore({
    reducer: {
        cars: carsSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

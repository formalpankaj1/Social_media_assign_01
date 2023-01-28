import { configureStore } from '@reduxjs/toolkit';
import authslice from './authslice';
import postslice from './postslice';
import specificUserSlice from './specificUserSlice';

const store = configureStore({
    reducer: {
        posts: postslice,
        auth: authslice,
        specificUser: specificUserSlice,
    },
});

export default store;
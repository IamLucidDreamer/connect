import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist';
import reducers from './reducers/index'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['appInApp']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer
});

export default store
import { combineReducers, configureStore, createStore, Store } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import uiSlice from "./slices/uiSlice";
import tasksSlice from "./slices/tasksSlice";
import type { Reducers } from "../../types/store/store";

const reducers: Reducers = {
    ui: uiSlice,
    tasks: tasksSlice
}

const rootReducer = combineReducers(reducers);

const persistConfig = {
  key: 'root',
  storage,
};

// Persist the reducer for keeping the store state for routing 
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

// Get and export sotre's type for further use 
export type StoreState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
export default store;
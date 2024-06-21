import { configureStore, Store } from "@reduxjs/toolkit";

import uiSlice from "./slices/uiSlice";
import type Reducers from "../../types/store/store";

const reducers: Reducers = {
    ui: uiSlice,
}

const store: Store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type AppDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
export default store;
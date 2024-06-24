"use client";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store";
import type { ProviderProps } from "../../types/global";

const StoreProvider = ({ children }: ProviderProps) => (
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            {children}
        </PersistGate>
    </Provider>
);

export default StoreProvider;
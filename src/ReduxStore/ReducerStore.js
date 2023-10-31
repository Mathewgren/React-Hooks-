import rootReducer from "./index";
import { configureStore } from "@reduxjs/toolkit";

export const Store = configureStore({ reducer: rootReducer });

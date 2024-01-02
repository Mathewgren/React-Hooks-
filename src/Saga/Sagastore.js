import rootReducer from "./Sagarootindex";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../Service/MockAPI/SagaAPI";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);

export default Store;

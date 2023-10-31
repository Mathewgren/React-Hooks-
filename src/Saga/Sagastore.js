import rootReducer from "../Reducer/index";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../../Redux/Services/SagaApi";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);

export default Store;

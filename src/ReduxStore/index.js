import { combineReducers } from "@reduxjs/toolkit";
import reducer from "./ReduxReducer";

const rootReducer = combineReducers({
  reducer: reducer,
});
export default rootReducer;

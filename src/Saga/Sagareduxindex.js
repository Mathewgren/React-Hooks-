import { combineReducers } from "@reduxjs/toolkit";
import reducer from "../../Redux/Reducer/reducer";
import Sagareducer from "../../Redux/Reducer/SagaReducer";

const rootReducer = combineReducers({
  reducer: reducer,
  Sagareducer: Sagareducer,
});
export default rootReducer;

import { combineReducers } from "redux";
import freeFields from "./gameFields";

const allReducers = combineReducers({
  freeFields,
});

export default allReducers;

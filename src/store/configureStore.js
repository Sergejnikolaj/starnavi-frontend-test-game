import { applyMiddleware, createStore } from "redux";
import allReducers from "../reducers/index";
import logger from "redux-logger";
import thunk from "redux-thunk";

export const store = createStore(allReducers, applyMiddleware(logger, thunk));

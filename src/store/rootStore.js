import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {userReducer} from "../containers/Auth/reducer";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";


let rootReducer = combineReducers({
    user: userReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

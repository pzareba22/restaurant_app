import { combineReducers } from "redux";
import dishReducer from "./dishReducer";
import baskterReducer from "./baskterReducer";
import userReducer from "./userReducer";

export default combineReducers({
    dishes: dishReducer,
    basket: baskterReducer,
    user: userReducer,
});

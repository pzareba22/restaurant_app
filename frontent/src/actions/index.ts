import { IDish, IOrder, IUser } from "../constants/constants";
import axios from "axios";

export const addDish = (dish: IDish) => ({
    type: "ADD_DISH",
    payload: dish,
});

export const removeDish = (dish: IDish) => {
    return {
        type: "REMOVE_DISH",
        payload: dish,
    };
};

export const updateDish = (dish: IDish) => {
    return {
        type: "UPDATE_DISH",
        payload: dish,
    };
};

export const addToBasket = (dish: IDish) => {
    return {
        type: "ADD",
        payload: dish,
    };
};

export const removeFromBasket = (dish: IDish) => {
    return {
        type: "REMOVE",
        payload: dish,
    };
};

export const clearBasket = () => {
    return {
        type: "CLEAR",
        payload: null,
    };
};

export const fetchDishes = () => {
    return async (dispatch: any, getState: any) => {
        const res = await axios.get("localhost:3001/api/dishes");
        dispatch({ type: "FETCH_DISHES", payload: res.data });
    };
};

export const loginUser = (user: IUser) => {
    return {
        type: "LOGIN",
        payload: user,
    };
};

export const logoutUser = () => {
    return {
        type: "LOGOUT",
        payload: null,
    };
};

export const addOrder = (order: IOrder) => {
    return {
        type: "ADD_ORDER",
        payload: order,
    };
};

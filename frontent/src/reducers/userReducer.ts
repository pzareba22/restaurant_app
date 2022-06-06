import { IUser } from "../constants/constants";

const emptyUser: IUser = {
    username: "Anonim",
    isAdmin: false,
    isManager: false,
    JWT: "",
    isBanned: true,
    reviews: [],
    orders: [],
};

const initialState =
    JSON.parse(window.localStorage.getItem("userData") as string) || emptyUser;

export default (state: IUser = initialState, action: any) => {
    switch (action.type) {
        case "LOGIN":
            window.localStorage.setItem(
                "userData",
                JSON.stringify(action.payload)
            );
            return action.payload;

        case "LOGOUT":
            window.localStorage.setItem("userData", JSON.stringify(emptyUser));
            return emptyUser;

        case "ADD_ORDER":
            const newState = state;
            newState.orders.push(action.payload);
            return newState;

        default:
            return state;
    }
};

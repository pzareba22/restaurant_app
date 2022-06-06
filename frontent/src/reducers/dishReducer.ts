import { IDish, dishes } from "../constants/constants";

export default (state: Array<IDish> = [], action: any) => {
    switch (action.type) {
        case "ADD_DISH":
            return [...state, action.payload];
        case "REMOVE_DISH":
            return [...state.filter((dish) => dish !== action.payload)];

        case "UPDATE_DISH":
            const newState = [...state];
            for (let i = 0; i < newState.length; i++) {
                if (newState[i].name == action.payload.name) {
                    const new_id = newState[i]._id;
                    newState[i] = action.payload;
                    newState[i]._id = new_id;
                    break;
                }
            }
            return newState;

        case "FETCH_DISHES":
            return Object.values(action.payload);
        default:
            return state;
    }
};

const initialState: any = { size: 0 };

export default (state = initialState, action: any) => {
    switch (action.type) {
        case "ADD":
            if (action.payload.name in state) {
                const id = action.payload.name;

                if (state[id].count + 1 > state[id].dish.dayAmount) {
                    return state;
                }
                const newEntry = {
                    ...state[id],
                    count: state[id].count + 1,
                };
                return {
                    ...state,
                    [id]: newEntry,
                    size: state.size + 1,
                };
            } else {
                const id = action.payload.name;
                const newEntry = {
                    dish: action.payload,
                    count: 1,
                };
                return {
                    ...state,
                    [id]: newEntry,
                    size: state.size + 1,
                };
            }

        case "REMOVE":
            if (!(action.payload.name in state)) {
                return state;
            }

            const id = action.payload.name;
            if (state[id].count > 1) {
                const newEntry = {
                    count: state[id].count - 1,
                    dish: action.payload,
                };
                return {
                    ...state,
                    [id]: newEntry,
                    size: state.size - 1,
                };
            } else {
                const newState = { ...state };
                delete newState[id];

                return {
                    ...newState,
                    size: state.size - 1,
                };
            }

        case "CLEAR":
            console.log("clearing basket");

            return initialState;

        default:
            return state;
    }
};

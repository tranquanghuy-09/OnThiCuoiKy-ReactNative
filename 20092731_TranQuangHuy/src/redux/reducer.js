const initialState = {
    id: "",
    username: "",
    password: "",
    english: [],
    vietnamese: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                id: action.user.id,
                username: action.user.username,
                password: action.user.password,
                english: action.user.english,
                vietnamese: action.user.vietnamese
            };
        case "ADD_VOCABULARY":
            return {
                ...state,
                english: [...state.english, { id: state.english.length + 1, content: action.english }],
                vietnamese: [...state.vietnamese, {id: state.vietnamese.length + 1, content: action.vietnamese}]
            };
        default:
            return state;
    }
}

export default reducer;
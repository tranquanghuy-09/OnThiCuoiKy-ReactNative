const initialState = {
    id: '',
    username: '',
    password: '',
    inputmoney: [],
    outputmoney: [],
    balance : 0
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USER':
            return{
                ...state,
                id: action.user.id,
                username: action.user.username,
                password: action.user.password,
                inputmoney: action.user.inputmoney,
                outputmoney: action.user.outputmoney,
                balance: action.user.balance
            };
            case 'ADD_INPUT':
                const inputMoney = parseInt(action.inputmoney, 10); // Chuyển đổi thành số
                return {
                    ...state,
                    inputmoney: [...state.inputmoney, { id: state.inputmoney.length + 1, money: inputMoney }],
                    balance: state.balance + inputMoney
                };
            
            case 'ADD_OUTPUT':
                const outputMoney = parseInt(action.outputmoney, 10); // Chuyển đổi thành số
                return {
                    ...state,
                    outputmoney: [...state.outputmoney, { id: state.outputmoney.length + 1, money: outputMoney }],
                    balance: state.balance - outputMoney
                };
            
    }
}
export default reducer;
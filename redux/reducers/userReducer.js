const initialState = {
    users: [],
    userData: null,
    errors: [],
    message: ''
};

const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SIGN_UP':
            if (action.payload.success) {
                return {
                    ...state,
                    message: action.payload.message,
                    errors: []
                };
            } else {
                return {
                    ...state,
                    errors: action.payload.message,
                    message: ''
                };
            }
        case 'LOGIN':
            if (action.payload.success) {
                return {
                    ...state,
                    userData: action.payload.response.data,
                    message: action.payload.message,
                    errors: []
                };
            } else {
                return {
                    ...state,
                    errors: action.payload.message,
                    message: ''
                };
            }

        case 'LOGOUT':
            return {
                    ...state,
                    userData: null,
                    message: '',
                    errors: []
                };
        default:
            return state;
    }
}

export default userReducer;
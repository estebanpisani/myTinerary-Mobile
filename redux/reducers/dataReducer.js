const initialState = {
    countries: []
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_COUNTRIES':
            let countries = action.payload.map(country => country.name.common)
            return {
                ...state,
                countries: countries.sort(),
            };
        default:
            return state;
    }
}

export default dataReducer;
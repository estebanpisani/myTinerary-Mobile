const initialState = {
    cities: [],
    filteredCities: [],
    city: null
};

const cityReducer = (state=initialState, action) => {
    
    switch (action.type) {
        case 'GET_CITIES':
            return {
                ...state,
                cities: action.payload,
                filteredCities: action.payload
            };
        
        case 'GET_CITY_BY_ID':
            // let city = state.cities.filter(city => city._id === action.payload)
            return {
                ...state,
                city: action.payload,
            }
    
        case 'FILTER_CITIES':
            let results = state.cities.filter(city => city.name.toLowerCase().startsWith(action.payload.trim().toLowerCase()));
            return {
                ...state,
                filteredCities: results
            }
        default:
            return state;
    }
}

export default cityReducer;
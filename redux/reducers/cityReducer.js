const initialState = {
    cities: [],
    filteredCities: [],
    city: {}
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
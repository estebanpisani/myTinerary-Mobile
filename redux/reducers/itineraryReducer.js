const initialState = {
    itineraries: []
};

const itineraryReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_ITINERARIES':
            return {
                ...state,
                itineraries: action.payload,
            };

        case 'GET_ITINERARIES_BY_CITY':
            return {
                ...state,
                itineraries: action.payload,
            };
        
        default:
            return state;
    }
}

export default itineraryReducer;
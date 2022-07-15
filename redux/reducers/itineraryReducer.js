const initialState = {
    itineraries: [],
    itinerary: null
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

        case 'GET_ITINERARY_BY_ID':
            // let itinerary = state.itineraries.filter(itinerary=>itinerary._id===action.payload)
            return {
                ...state,
                itinerary: action.payload,
                // itinerary: itinerary[0]
            };
        default:
            return state;
    }
}

export default itineraryReducer;
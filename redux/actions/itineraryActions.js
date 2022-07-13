import axios from "axios";
import url from '../../url'

const itineraryActions = {
    getItineraries: () => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.get(url + '/itineraries');
                dispatch({
                    type: 'GET_ITINERARIES',
                    payload: res.data.response.itineraries
                })
            } catch (error) {
                console.log(error);
            }
        };
    },
    getItinerariesByCity: (id) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.get(url + '/cities/' + id + '/itineraries');
                dispatch({
                    type: 'GET_ITINERARIES_BY_CITY',
                    payload: res.data.response
                })
            } catch (error) {
                console.log(error);
            }
        };
    },
    getItineraryById: (id) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.get(url + '/itineraries/' + id);
                dispatch({
                    type: 'GET_ITINERARY_BY_ID',
                    payload: res.data.response.itinerary
                })
            } catch (error) {
                console.log(error);
            }
        }
    },
    like: (id) => {
        const token = localStorage.getItem('Token');
        return async (dispatch, getState) => {
            try {
                const res = await axios.put(url + '/itineraries/' + id + '/like', {}, {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                return res.data.response
            } catch (error) {
                if (error.response.status === 401) {
                    console.log(error.response.data)
                }
            }
        }
    },
    addComment: (id, comment) => {
        const token = localStorage.getItem('Token');
        return async (dispatch, getState) => {
            try {
                const res = await axios.post(url + '/itineraries/' + id + '/comment', { comment }, {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                return res.data
            } catch (error) {
                if (error.response.status === 401) {
                    console.log(error.response.data)
                }
            }
        }
    },
        updateComment: (id, comment) => {
        const token = localStorage.getItem('Token');
        return async (dispatch, getState) => {
            try {
                const res = await axios.put(url + '/itineraries/' + id + '/comment', { comment }, {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                return res.data.response
            } catch (error) {
                if (error.response.status === 401) {
                    console.log(error.response.data)
                }
            }
        }
    },
    deleteComment: (id) => {
        const token = localStorage.getItem('Token');
        // console.log(id)
        return async (dispatch, getState) => {
            try {
                const res = await axios.delete(url + '/itineraries/' + id + '/comment', {
                    headers: { 'Authorization': 'Bearer ' + token }
                    });
                return res.data.response
            } catch (error) {
                if (error.response.status === 401) {
                    console.log(error.response.data)
                }
            }
        }
    },

}

export default itineraryActions;
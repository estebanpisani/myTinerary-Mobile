import axios from "axios";
import url from '../../url'

const cityActions = {

    getCities: () => {
        return async(dispatch, getState) => {
            try{
                const res = await axios.get(url+'/cities');
                dispatch({
                    type:'GET_CITIES',
                    payload: res.data.response.cities
                })
            } catch(error){
                console.log(error);
            }
        };
    },

    getCityById: (id) => {
        return async(dispatch, getState) => {
            try {
                const res = await axios.get(url+'/cities/'+id);
                dispatch({
                    type: 'GET_CITY_BY_ID',
                    payload: res.data.response.city
                })
            } catch(error){
                console.log(error);
            }
        }
    },
    filterCities: (input) => {
        return (dispatch, getState) => {
            dispatch({
                type:'FILTER_CITIES',
                payload: input
            })
        }
    }

}

export default cityActions;
import axios from "axios";
import url from '../../url'

const activityActions = {

    getActivitiesByItinerary: (id) => {
        return async(dispatch, getState) => {
            try{
                const res = await axios.get(url+'/itineraries/'+id+'/activities');
                return(res.data.response);
            } catch(error){
                console.log(error);
            }
        };
    }
}

export default activityActions;
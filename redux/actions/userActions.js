import axios from "axios";
import url from '../../url'

import { AsyncStorage } from 'react-native';


const userActions = {

    signUp: (userData) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post(url + '/auth/signup', userData);
                // console.log(res);
                dispatch({
                    type: 'SIGN_UP',
                    payload: res.data
                })
            } catch (error) {
                console.log(error);
            }
        };
    },
    login: (userCredentials) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post(url + '/auth/login', userCredentials);
                if (res.data.success) {
                    await AsyncStorage.setItem(
                        '@token',
                        res.data.response.token
                    );
                }
                dispatch({
                    type: 'LOGIN',
                    payload: res.data
                })
            } catch (error) {
                console.log(error);
            }
        };
    },
    logout: () => {
        return async (dispatch, getState) => {
            await AsyncStorage.removeItem('@token');
            dispatch({
                type: 'LOGOUT'
            })
        }
    },
    verifyToken: (token) => {
        return async (dispatch, getState) => {

            await axios.get(url + '/auth', {
                headers: { 'Authorization': 'Bearer ' + token }
            })
                .then(res => {
                    // console.log(res)
                    if (res.data.success) {
                        dispatch({
                            type: 'LOGIN',
                            payload: res.data
                        })
                    } else {
                        AsyncStorage.removeItem('@token');
                    }
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        dispatch({
                            type: 'LOGOUT'
                        });
                        AsyncStorage.removeItem('@token');
                    }
                })
        }

    },
    cleanState: () => {
        return async (dispatch, getState) => {
            dispatch({
                type: 'CLEAN'
            })
        }
    }

}

export default userActions;
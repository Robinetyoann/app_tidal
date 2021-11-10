import { 
    LOAD_MERIDIENS,
    LOAD_MERIDIENS_SUCCESS,
    LOAD_MERIDIENS_ERROR,
    meridienReducer } from './meridienReducer.js';

const loadMeridiens = () => {
    return {
        type: LOAD_MERIDIENS
    }
}

const loadMeridiensSuccess = (todos) => {
    return {
        type: LOAD_MERIDIENS_SUCCESS,
        payload: todos
    }
}

const loadMeridiensError = (errors) => {
    return {
        type: LOAD_MERIDIENS_ERROR,
        payload: errors
    }
}

export const getMeridiens = async () => {
    meridienReducer(undefined, loadMeridiens());
    return await fetch(CONFIG.API_HOST+'/meridiens')
        .then(response => response.json())
        .then(response => {
            return meridienReducer(undefined, loadMeridiensSuccess(response));
        })
        .catch(error => {
            return meridienReducer(undefined, loadMeridiensError(error));
        });
}
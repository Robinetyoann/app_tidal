const initialState = {
    loading: false,
    meridiens: [],
    error: ''
}

export const LOAD_MERIDIENS = 'LOAD_MERIDIENS';
export const LOAD_MERIDIENS_SUCCESS = 'LOAD_MERIDIENS_SUCCESS';
export const LOAD_MERIDIENS_ERROR = 'LOAD_MERIDIENS_ERROR';

export const meridienReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MERIDIENS:
            return {
                ...state,
                loading: true
            }
        case LOAD_MERIDIENS_SUCCESS:
            return {
                ...state,
                loading: false,
                meridiens: action.payload,
                error: ''
            }
        case LOAD_MERIDIENS_ERROR:
            return {
                ...state,
                loading: false,
                meridiens: [],
                error: action.payload
            }

        default:
            return state
    }
}
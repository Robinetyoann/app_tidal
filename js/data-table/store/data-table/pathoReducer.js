const initialState = {
    loading: false,
    pathologies: [],
    error: ''
}

export const LOAD_PATHOLOGIES = 'LOAD_PATHOLOGIES';
export const LOAD_PATHOLOGIES_SUCCESS = 'LOAD_PATHOLOGIES_SUCCESS';
export const LOAD_PATHOLOGIES_ERROR = 'LOAD_PATHOLOGIES_ERROR';

export const pathoReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PATHOLOGIES:
            return {
                ...state,
                loading: true
            }
        case LOAD_PATHOLOGIES_SUCCESS:
            return {
                ...state,
                loading: false,
                pathologies: action.payload,
                error: ''
            }
        case LOAD_PATHOLOGIES_ERROR:
            return {
                ...state,
                loading: false,
                pathologies: [],
                error: action.payload
            }

        default:
            return state
    }
}
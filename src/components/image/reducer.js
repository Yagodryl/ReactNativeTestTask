import ImageService from "../ImageService";

export const GET_IMAGE_STARTED = 'image/GET_IMAGE_STARTED';
export const GET_IMAGE_SUCCESS = 'image/GET_IMAGE_SUCCESS';
export const GET_IMAGE_FAILED = 'image/GET_IMAGE_FAILED';

const initialState = {
    data: {},
    loading: false,
    error: false
}

export const imageReducer = (state = initialState, action) => {
    
    let newState = state;
    switch (action.type) {
        case GET_IMAGE_STARTED: {
            newState = {
                ...state,
                loading: true,
                error: false
            }

        }
            break;
        case GET_IMAGE_SUCCESS: {
            newState = {
                ...state,
                loading: false,
                data: action.payload,
                error: false
            }
        }
            break;
        case GET_IMAGE_FAILED: {
            newState = {
                ...state,
                loading: false,
                error: true
            }
        }
            break;
        default:
            return newState
    }
    return newState;
}

export const getImage = (id) => {

    return dispatch => {
        dispatch(getImageActions.started());
        ImageService.getImage(id)
            .then(response => {
                dispatch(getImageActions.success(response));
            }, error => { throw error; })
            .catch(() => {
                dispatch(getImageActions.failed());
            })
    }
}

export const getImageActions = {
    started: () => {
        return {
            type:  GET_IMAGE_STARTED
        };
    },
    success: response => {
        return {
            type:  GET_IMAGE_SUCCESS,
            payload: response.data.urls
        };
    },
    failed: () => {
        return {
            type:  GET_IMAGE_FAILED
        };
    }
}
import ImageService from "../ImageService";

export const GET_IMAGES_STARTED = 'listImages/GET_IMAGES_STARTED';
export const GET_IMAGES_SUCCESS = 'listImages/GET_IMAGES_SUCCESS';
export const GET_IMAGES_FAILED = 'listImages/GET_IMAGES_FAILED';

const initialState = {
    data: [],
    loading: false,
    error: false
}

export const listImagesReducer = (state = initialState, action) => {

   // console.log('---state---',action);
    let newState = state;
    switch (action.type) {
        case GET_IMAGES_STARTED:{
            //console.log("GET_IMAGES_STARTED")
            newState ={
                ...state,
                loading: true,
                error: false
            }
            break;
        }
        case GET_IMAGES_SUCCESS:{
            //console.log("GET_IMAGES_SUCCESS")
            newState = {
                ...state,
                loading: false,
                data: action.payload,
                error: false
            }
            break;

        }
        case GET_IMAGES_FAILED:{
           // console.log("GET_IMAGES_FAILED")
            newState ={
                ...state,
                loading: false,
                error: true
            }
            break;
        }
        default:{
            return newState;
        }

    }
    return newState;

}



export const getListImages = () => {
    return dispatch => {
        
        dispatch(getListImagesActions.started());
        ImageService.getListImages()
            .then(response => {
                dispatch(getListImagesActions.success(response));
            },error => {throw error;})
            .catch(() => {
                dispatch(getListImagesActions.failed());
            })
    }
}

export const getListImagesActions = {
    started: () => {
        return {
            type: GET_IMAGES_STARTED
        };
    },
    success: response => {
        //console.log("response",response)
        return {
            type: GET_IMAGES_SUCCESS,
            payload: response.data
        };
    },
    failed: () => {
        return {
            type: GET_IMAGES_FAILED
        };
    }
};
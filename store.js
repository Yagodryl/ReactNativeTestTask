import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

//reducers
import {listImagesReducer} from "./src/components/listImages/reducer"
import {imageReducer} from "./src/components/image/reducer"

const rootReducer = combineReducers({
    listImages: listImagesReducer,
    image: imageReducer
});

const configureStore = () => {
    return createStore(rootReducer, compose(applyMiddleware(thunk)));
}

export default configureStore;
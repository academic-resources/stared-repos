import {
    ADD_STRAINSELECTION,
    DELETE_STRAINSELECTION,
    SET_CURRENT,
    CLEAR_CURRENT
} from '../types';

export default (state, action) => {
    switch(action.type){
        case ADD_STRAINSELECTION:
            return{
                ...state,
                strainSelection: [...state.strainSelection, action.payload]
            }
    }
}
import React, { useReducer } from 'react'
import { v4 as uuid } from 'uuid';
import StrainSelectContext from './strainSelectContext';
import StrainSelectReducer from './StrainSelectReducer'

import {
    ADD_STRAINSELECTION,
    DELETE_STRAINSELECTION,
    SET_CURRENT,
    CLEAR_CURRENT
} from '../types';

const StrainSelectionState = props => {
    const initialState = {
        strainSelection: [],
        current: null
    }

    const [state, dispatch] = useReducer(StrainSelectReducer, initialState);

    //Add Strain Selection
   
    const addStrainSelection = strainSelection =>{
        dispatch({ type: ADD_STRAINSELECTION, payload: strainSelection})
    }

    
    //Delete Strain Selection

    //Set Current Selection,

    // Clear Current Selection

    return (
        <StrainSelectContext.Provider value={{
            strainSelection: state.strainSelection,
            addStrainSelection
        }}>
            { props.children }
        </StrainSelectContext.Provider>
    )

}

export default StrainSelectionState;
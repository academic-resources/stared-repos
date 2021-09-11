import React from 'react';

import StrainSelctionForm from './StrainSelectionForm';
import StrainSelectionState from '../context/strainsSelectContext/StrainSelectionState'

export const Strains = () => {
    return (
        <StrainSelectionState>
        <div>
            <div>
                <StrainSelctionForm/>
            </div>

            
            
        </div>
        </StrainSelectionState>
    )
}

export default Strains

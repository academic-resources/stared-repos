import React from 'react';
import PropTypes from 'prop-types';

const Action = props => {
    return(
        <div>
            <h3>{props.description}</h3>
            <h5>Project #{props.project_id}</h5>
            <p>{props.notes}</p>
            <button onClick={props.delete(props.id)}>Delete me!</button>
        </div>
    );
};

Action.propTypes = {
    notes: PropTypes.string,
    description: PropTypes.string,
    project_id: PropTypes.number
};

export default Action;
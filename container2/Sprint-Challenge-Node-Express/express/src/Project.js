import React from 'react';
import PropTypes from 'prop-types';


const Project = props => {
    return(
        <div>
            <h3>{props.name}</h3>
            <p>{props.description}</p>
            <button onClick={props.delete(props.id)}>Delete me!</button>
        </div>
    );
};

Project.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string
};

export default Project;
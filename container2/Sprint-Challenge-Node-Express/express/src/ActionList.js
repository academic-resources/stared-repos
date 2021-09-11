import React from 'react';
import Action from './Action';

class ActionList extends React.Component{
    render(){
        return(
            <div>
                <h1>Actions</h1>
                <ul>
                    {this.props.actions.map(action => {
                        return(
                            <Action 
                                project_id={action.project_id}
                                description={action.description}
                                notes={action.notes}
                                key={action.id}
                                id={action.id}
                                delete={this.props.delete}
                            />
                        )
                    })}
                </ul>
            </div>
        )
    }
};

ActionList.defaultProps = {
    projects: []
};

export default ActionList;
import React from 'react';
import Project from './Project';

class ProjectList extends React.Component{
    render(){
        return(
            <div>
                <h1>Projects</h1>
                <ul>
                    {this.props.projects.map(project => {
                        return(
                            <Project 
                                name={project.name}
                                description={project.description}
                                key={project.id}
                                id={project.id}
                                delete={this.props.delete}
                            />
                        )
                    })}
                </ul>
            </div>
        )
    }
};

ProjectList.defaultProps = {
    projects: []
};

export default ProjectList;
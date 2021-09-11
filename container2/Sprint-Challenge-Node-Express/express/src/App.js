import React, { Component } from 'react';
import axios from 'axios';
import {Route, NavLink} from 'react-router-dom';

import './App.css';
import ProjectList from './ProjectList';
import ActionList from './ActionList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      actions: []
    }
  }

  componentDidMount = () => {
    axios.get('https://sprintnodeexpress.herokuapp.com/projects')
      .then( response => {
        if(typeof response.data.message === 'string'){
          Promise.reject("Error: the projects can't be retrieved.")
        }
        this.setState({ projects: response.data })
      })
      .catch(err => console.log(err))
    axios.get('https://sprintnodeexpress.herokuapp.com/actions')
      .then(response=>{
        if(typeof response.data.message === 'string'){
          Promise.reject("Error: the actions can't be retrieved")
        }
        this.setState({actions: response.data})
      })
      .catch(err => console.log(err))
  }

  deleteProject = (id) => {
    return() => {
      axios.delete(`https://sprintnodeexpress.herokuapp.com/projects/${id}`)
        .then(response => {
          axios.get(`https://sprintnodeexpress.herokuapp.com/projects`)
            .then(response => {
              if(typeof response.data.message === 'string'){
                Promise.reject("Error: the projects can't be retrieved")
              }
              this.setState({ projects: response.data })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
  }

  deleteAction = (id) => {
    return() => {
      axios.delete(`https://sprintnodeexpress.herokuapp.com/actions/${id}`)
        .then(response => {
          axios.get(`https://sprintnodeexpress.herokuapp.com/actions`)
            .then(response => {
              if(typeof response.data.message === 'string'){
                Promise.reject("Error: the actions can't be retrieved")
              }
              this.setState({ actions: response.data })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
  }


  render() {
    console.log(this.state.projects);
    return (
      <div>
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/projects'>Projects</NavLink>
          <NavLink to='/actions'>Actions</NavLink>
          <NavLink to='/add-project'>Add New Project</NavLink>
          <NavLink to='/add-action'>Add New Action</NavLink>
        </nav>

        <Route exact path='/' render={(props)=> <ProjectList {...props} projects={this.state.projects} delete={this.deleteProject} /> } />
        <Route path='/actions' render={(props)=> <ActionList {...props} actions={this.state.actions} delete={this.deleteAction} />} />

      </div>
    );
  }
}

export default App;

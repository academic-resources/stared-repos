import React from 'react';
import { Mutation } from 'react-apollo';
import Mutations from '../../graphql/mutations';
const { NEW_ABODE } = Mutations;

class AbodeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', coordinates: '' };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e, newEmblem) {
    const { name, coordinates } = this.state;
    e.preventDefault();
    newEmblem({
      variables: { name: name, coordinates: coordinates }
    }).then(data => {
      this.setState({
        name: '',
        coordinates: '',
        message: `New emblem "${name}" created`
      });
    });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    return (
      <Mutation
        mutation={NEW_ABODE}
        // update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newAbode, { data }) => {
          return (
            <div>
              <form onSubmit={e => this.handleSubmit(e, newAbode)}>
                <input
                  type='text'
                  placeholder='Name'
                  value={this.state.name}
                  onChange={this.update('name')}
                />
                <input
                  type='text'
                  placeholder='Coordinates'
                  value={this.state.coordinates}
                  onChange={this.update('coordinates')}
                />

                <button type='submit'>Create Abode</button>
              </form>
              <p>{this.state.message}</p>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default AbodeCreate;

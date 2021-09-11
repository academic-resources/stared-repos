import React from 'react';
import { Mutation } from 'react-apollo';
import Mutations from '../../graphql/mutations';
const { NEW_EMBLEM } = Mutations;

class EmblemCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e, newEmblem) {
    const { name } = this.state;
    e.preventDefault();
    newEmblem({
      variables: { name: name }
    }).then(data => {
      this.setState({
        name: '',
        message: `New emblem "${name}" created`
      });
    });
  }

  render() {
    return (
      <Mutation
        mutation={NEW_EMBLEM}
        // update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newEmblem, { data }) => {
          return (
            <div>
              <form onSubmit={e => this.handleSubmit(e, newEmblem)}>
                <input
                  type='text'
                  placeholder='Name'
                  value={this.state.name}
                  onChange={this.update('name')}
                />
                <button type='submit'>Create Emblem</button>
              </form>
              <p>{this.state.message}</p>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default EmblemCreate;

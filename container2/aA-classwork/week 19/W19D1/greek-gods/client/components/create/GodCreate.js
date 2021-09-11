import React from 'react';
import { Mutation } from 'react-apollo';
import Mutations from '../../graphql/mutations';
const { NEW_GOD } = Mutations;
import Queries from '../../graphql/queries';
const { FETCH_GODS } = Queries;

class GodCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', type: 'god', description: '', message: '' };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e, newGod) {
    e.preventDefault();
    const { name, type, description } = this.state;
    newGod({
      variables: {
        name: name,
        type: type,
        description: description
      }
    }).then(data => {
      console.log(data);
      this.setState({
        message: `New god "${name}" created successfully`,
        name: '',
        type: 'god',
        description: ''
      });
    });
  }

  updateCache(
    cache,
    {
      data: { newGod }
    }
  ) {
    let gods;
    try {
      gods = cache.readQuery({ query: FETCH_GODS });
    } catch (err) {
      return;
    }
    if (gods) {
      let godArray = gods.gods;

      cache.writeQuery({
        query: FETCH_GODS,
        data: { gods: godArray.concat(newGod) }
      });
    }
  }

  render() {
    return (
      <Mutation
        mutation={NEW_GOD}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newGod, { data }) => {
          return (
            <div>
              <form onSubmit={e => this.handleSubmit(e, newGod)}>
                <input
                  type='text'
                  value={this.state.name}
                  placeholder='Name'
                  onChange={this.update('name')}
                />
                <textarea
                  onChange={this.update('description')}
                  value={this.state.description}
                  placeholder='Description'
                />

                <select onChange={this.update('type')}>
                  <option value='god'>God</option>
                  <option value='goddess'>Goddess</option>
                </select>
                <button type='submit'>Create</button>
              </form>
              <p>{this.state.message}</p>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default GodCreate;

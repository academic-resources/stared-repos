import React from 'react';
import axios from 'axios';

export default class UserList extends React.Component {

  state = {

    users: null

  }

  componentDidMount() {

    axios.get('http://localhost:8443/users/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.dir(err));

  }

  render() {

    if (!this.state.users)
      return <h1>Loading users...</h1>

    return (

      <div className='users'>

        {this.state.users.map(user => (
          <div className='user'>

            <p>{user.username}</p>

            <ul>
              {user.quotes.map(quote => <li>{quote.quote}</li>)}
            </ul>

          </div>
        ))}

      </div>

    )

  }

}

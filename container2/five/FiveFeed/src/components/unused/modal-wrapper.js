import React from 'react';

import './modal.css';

export default class Modal extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      search: '',
      users: [{
        name: 'Kohei Arai',
      }, {
        name: 'A B',
      }, {
        name: 'X Y'
      }],
      searchResult: [],
    }

    this.onClick = this.onClick.bind(this);
    this.onModalClick = this.onModalClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClick() {
    this.props.hideModal();
  }

  onChange(e) {
    const v = e.target.value;
    this.setState((state, props) => {
      return {
        search: v,
        searchResult: state.users.filter(user => user.name.toLowerCase().indexOf(v) >= 0),
      }
    })
  }

  onModalClick(e) {
    e.stopPropagation();

  }

  render() {
    const {
      loading,
      search,
      searchResult,
    } = this.state;

    return this.props.isModalOn && (
      <div id="modal-wrapper" onClick={this.onClick}>
        <div id="modal" onClick={this.onModalClick}>
          <h4 className="title">Add new curator</h4>
          <div className="body">
            <input type="text" placeholder="Please input the name..." value={search} onChange={this.onChange} />
            {loading && (
              <p>Loading...</p>
            )}
            {search.length > 0 && searchResult.map(user => (
              <div key={user.name}>{user.name}</div>
            ))
            }
          </div>
          <div className="footer">
            <button onClick={this.props.hideModal}>Close</button>
          </div>
        </div>
      </div>
    )
  }
}
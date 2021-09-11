import React from 'react';

export class Warn extends React.Component {
  componentDidMount() {
    console.error(this.props.message);
  }
  render() {
    return null;
  }
}

export class Todo extends React.Component {
  componentDidMount() {
    console.error(`TODO: ${this.props.message}`);
  }
  render() {
    return null;
  }
}

import React from 'react';


class SortOptions extends React.Component {
  render () {
    return(
      <ul className={`sort-options-selection ${this.props.reveal}`}>
        <li>Sort options coming soon!</li>
      </ul>
    );
  }
}

export default SortOptions;

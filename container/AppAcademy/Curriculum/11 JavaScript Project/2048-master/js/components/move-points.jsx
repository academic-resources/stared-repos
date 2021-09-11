import React from 'react';

class MovePoints extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movePoints: props.game.movePoints
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ movePoints: newProps.game.movePoints })
  }

  componentWillUpdate() {
    document.getElementById('move-points').classList.remove('fade');
  }

  componentDidUpdate() {
    setTimeout(() => {
      document.getElementById('move-points').classList.add('fade');
    }, 1)
  }

  render() {
    return (
      <div id="move-points" className="fade">
        {
          this.state.movePoints > 0 ? <h2>{ this.state.movePoints }+</h2> : null
        }
      </div>
    )
  }
}

export default MovePoints;

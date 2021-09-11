import React from 'react';


class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = { index: 0 };
    this.updateIdx = this.updateIdx.bind(this);
    console.dir(this.props);
  }

  selectedArticle(i) {
    if (i === this.state.index) {
      return <article>{this.props.tabs[this.state.index].content}</article>
    }
  }

  updateIdx(i) {
    this.setState({ index: i })
  }

  render() {
    const tabs = this.props.tabs.map((obj, i) => {
      return (
        <div key={i} className="tab">
          <h1 onClick={() => this.updateIdx(i)}>{obj.title}</h1>
        </div>
      )
    });

    const content = this.props.tabs.map((obj, i) => {
      return (
        <article>{this.selectedArticle(i)}</article>
      )
    });  
    
    
    return (
      <div className="tabs-group">
        <div className="headers">{tabs}</div>
        <div className="content">{content}</div>
      </div>
    )
  }
}

export default Tabs



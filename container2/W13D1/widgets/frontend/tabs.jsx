import React from 'react';

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {selectedTab: 0};
    this.selectTab = this.selectTab.bind(this);
  }

  selectTab(idx) {
    this.setState({selectedTab: idx});
  }

  render() {
    return (
      <div className='tabs-container'>
        <h1>Tabs</h1>
        <div className='tabs'>
          <Headers selectedTab={this.state.selectedTab} onSelectTab={this.selectTab} tabs={this.props.tabs}/>
          <div className='tab-content'>
            <p>{this.props.tabs[this.state.selectedTab].content}</p>
          </div>
        </div>
      </div>
    )
  }
}

class Headers extends React.Component {
  render() {
    const headers = this.props.tabs.map((tab, idx) => {
      const title = tab.title;
      let selected = '';
      if (this.props.selectedTab === idx) selected = 'selected';
      
      return (
        <li key={idx} className={selected} onClick={() => this.props.onSelectTab(idx)}>{title}</li>
      );
    });
    return (
      <ul className='tab-header'>{headers}</ul>
    )
  }
}
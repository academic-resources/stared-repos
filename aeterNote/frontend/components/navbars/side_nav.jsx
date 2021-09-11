import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class SideNav extends React.Component {

  constructor(props) {
    super(props);


    // this.handleClose = this.handleClose.bind(this);
  }

  // handleClose() {
  //   document.getElementById('notebooks').addClass('slideleft');
  //   setTimeout(() => this.updateNotebookTab(), 2000);
  //
  //
  // }

  render() {
    return(
      <nav className='side-nav'>
        <div className='nav-logo'>

        </div>
        <div className='note-buttons'>
          <div className='side-nav-button note-new-button'
            onClick={() => {
              this.props.newNote();
              this.props.history.push('/notes');
            }}>
          </div>
          <div className='side-nav-button notebooks-button'
            onClick={() => this.props.updateNotebookTab()}>
          </div>
          <div className='side-nav-button note-index-button'
            onClick={() => {
              this.props.closeTabs();
              this.props.history.push('/notes');
            }}>
          </div>
          <div className='side-nav-button tag-index-button'
            onClick={() => this.props.updateTagTab()}>
          </div>
        </div>
        <button className='logout-button' onClick={() => this.props.logout()}>Logout</button>
      </nav>
    );
  }
}


export default withRouter(SideNav);

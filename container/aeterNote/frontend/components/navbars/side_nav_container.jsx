import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import {
  updateNotebookTab,
  updateTagTab,
  updateSelectedNote,
  closeTabs
} from '../../actions/ui_actions';

import SideNav from './side_nav';

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    updateNotebookTab: () => dispatch(updateNotebookTab()),
    updateTagTab: () => dispatch(updateTagTab()),
    newNote: () => dispatch(updateSelectedNote(false)),
    closeTabs: () => dispatch(closeTabs())
  };
};

export default connect(null, mapDispatchToProps)(SideNav);

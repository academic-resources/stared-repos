import { connect } from 'react-redux';
import {
  fetchNotebook,
  fetchNotebooks,
  createNotebook,
  updateNotebook,
  deleteNotebook
} from '../../actions/notebook_actions';
import {
  updateNotebookFormModal,
  updateNotebookSelected,
  updateDeleteWarning,
  updateNotebookTab
 } from '../../actions/ui_actions';
import NotebookIndex from './notebooks_index';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  let revealIndex;
    if (state.ui.notebook_tab === null ) {
      revealIndex = "hidden";
    } else if (state.ui.notebook_tab) {
      revealIndex = "reveal-notebook";
    } else {
      revealIndex = "hide-notebook";
    }
  const revealModal = (state.ui.notebook_tab) ? "reveal-modal-bg" : "hide-modal-bg";


  return {
    reveal: revealIndex,
    revealModal: revealModal,
    notebooks: Object.values(state.notebooks),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    updateNotebookFormModal: () => dispatch(updateNotebookFormModal()),
    updateNotebookSelected: notebookId => dispatch(updateNotebookSelected(notebookId)),
    deleteWarning: () => dispatch(updateDeleteWarning()),
    notebookTab: () => dispatch(updateNotebookTab()),
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebookIndex));

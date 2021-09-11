import { connect } from 'react-redux';
import EditNotebookForm from '../notebooks/edit_notebook_form';
import {
  updateEditNotebook,
  updateDeleteWarning
} from '../../actions/ui_actions';
import {
  updateNotebook,
  removeNotebookErrors
} from '../../actions/notebook_actions';

const mapStateToProps = state => {
  const revealIndex = (state.ui.edit_notebook) ?
  "reveal-notebook-edit-form" : "hide-notebook-edit-form";
  const notebook = (state.notebooks[state.ui.current_notebook]) ?
    state.notebooks[state.ui.current_notebook] : {id: false, title: ''};
  return {
    reveal: revealIndex,
    id: notebook.id,
    title: notebook.title,
    errors: state.errors.notebooks,
    formType: 'Update'
  };
};

const mapDisptachToProps = dispatch => {
  return {
    updateEditNotebook: () => dispatch(updateEditNotebook()),
    processForm: notebook => dispatch(updateNotebook(notebook)),
    removeErrors: () => dispatch(removeNotebookErrors()),
    deleteWarning: () => dispatch(updateDeleteWarning())
  };
};


export default connect(mapStateToProps, mapDisptachToProps)(EditNotebookForm);

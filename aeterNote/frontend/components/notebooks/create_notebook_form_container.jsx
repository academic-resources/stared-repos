import { connect } from 'react-redux';
import NoteForm from '../notebooks/notebook_form';
import { updateNotebookFormModal } from '../../actions/ui_actions';
import {
  createNotebook,
  removeNotebookErrors
} from '../../actions/notebook_actions';

const mapStateToProps = state => {
  const revealIndex = (state.ui.notebook_form_modal) ? "reveal-notebook-form" : "hide-notebook-form";
  return {
    reveal: revealIndex,
    title: "",
    errors: state.errors.notebooks,
    formType: 'Create'
  };
};

const mapDisptachToProps = dispatch => {
  return {
    updateNotebookFormModal: () => dispatch(updateNotebookFormModal()),
    processForm: notebook => dispatch(createNotebook(notebook)),
    removeErrors: () => dispatch(removeNotebookErrors())
  };
};


export default connect(mapStateToProps, mapDisptachToProps)(NoteForm);

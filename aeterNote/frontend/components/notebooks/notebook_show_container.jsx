import { connect } from 'react-redux';
import NotebookShow from './notebook_show';
import { fetchNotes } from '../../actions/note_actions';
import {
  updateSortOptions ,
  updateEditNotebook
} from '../../actions/ui_actions';

const mapStateToProps = state => {
  const revealShow = (state.ui.current_notebook) ? "reveal-show" : "hide-show";
  const revealSort = (state.ui.sort_options) ? "reveal-sort" : "hide-sort";
  const notebook = (state.notebooks[state.ui.current_notebook]) ?
    state.notebooks[state.ui.current_notebook] :
    {title: '', note_ids:[]};
  const locked = (
    Object.values(state.notebooks).length === 0 ||
    !(state.ui.current_notebook)) ? 'locked' : '';
  const noteCount = (notebook.note_ids) ? notebook.note_ids.length : 0;
  const notes = notebook.note_ids.map(noteId => state.notes[noteId]);
  return {
    notebook: notebook,
    noteCount: noteCount,
    notes: notes,
    revealShow: revealShow,
    revealSort: revealSort,
    locked: locked
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSortOptions: () => dispatch(updateSortOptions()),
    updateEditNotebook: () => dispatch(updateEditNotebook()),
    fetchNotes: () => dispatch(fetchNotes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotebookShow);

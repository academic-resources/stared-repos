import { connect } from 'react-redux';
import TagShow from './tag_show';
import { fetchNotes } from '../../actions/note_actions';
import {
  updateSortOptions
} from '../../actions/ui_actions';

const mapStateToProps = state => {
  const revealShow = (state.ui.current_tag) ? "reveal-tag-show" : "hide-tag-show";
  const revealSort = (state.ui.sort_options) ? "reveal-sort" : "hide-sort";
  const tag = (state.tags[state.ui.current_tag]) ?
    state.tags[state.ui.current_tag] :
    {label: '', note_ids:[]};
  const locked = (
    Object.values(state.tags).length === 0 ||
    !(state.ui.current_tag)) ? 'locked' : '';
  const noteCount = (tag.note_ids) ? tag.note_ids.length : 0;
  const notes = tag.note_ids.map(noteId => state.notes[noteId]);
  return {
    tag: tag,
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
    fetchNotes: id => dispatch(fetchNotes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagShow);

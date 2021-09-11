import React from 'react';
import { connect } from 'react-redux';
import {
  fetchTags,
  addTagging,
  deleteTagging,
} from '../../actions/tag_actions';
import {
  fetchNote
} from '../../actions/note_actions';


class NoteTagList extends React.Component {
  render () {
    const { tags } = this.props;
    const { tagIds } = this.props;
    const { noteId } = this.props;
    return (

      <div className='tags-taggings'>
        <p className='tag-list-label'>TAGS:</p>
        <ul className='tags-list'>
          { tags.map(tag => {
            return tagIds.includes(tag.id) ?
            <li className='tagged'
              key={tag.id}
              onClick={() => this.props.deleteTagging({ note_id: noteId, tag_id: tag.id }).then(
                () => this.props.resetNote(noteId)
              )
              }
            >{tag.label}</li> :
            <li className='untagged'
              key={tag.id}
              onClick={() => this.props.addTagging({ note_id: noteId, tag_id: tag.id }).then(
                () => this.props.resetNote(noteId)
              )
              }
              >{tag.label}</li>;
            })
          }
        </ul>
      </div>
    );

  }
}

const mapStateToProps = state => {
  const currentNote = state.notes[state.ui.selected_note];
  const tagIds = currentNote ?
    currentNote.tag_ids : [];
  return {
    noteId: state.ui.selected_note,
    tagIds: tagIds,
    tags: Object.values(state.tags),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTagging: (tagging) => dispatch(deleteTagging(tagging)),
    addTagging: (tagging) => dispatch(addTagging(tagging)),
    resetTags: () => dispatch(fetchTags()),
    resetNote: (id) => dispatch(fetchNote(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteTagList);

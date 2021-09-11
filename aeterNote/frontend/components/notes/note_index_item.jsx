import React from "react";
import { connect } from "react-redux";
import {
  updateSelectedNote,
  updateNoteDeleteWarning,
} from "../../actions/ui_actions";

class NoteIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { note } = this.props;
    const selectNote = this.props.updateSelectedNote;
    if (note.id) {
      return (
        <div className="notebook-item-container">
          <li className="note-item" onClick={() => selectNote(note.id)}>
            <h5>
              {note.title}
              <div className="note-item-buttons">
                <div
                  className="button-note"
                  onClick={() => this.props.deleteWarning()}
                >
                  <img src={window.staticImages.whiteTrashCan} />
                </div>
              </div>
            </h5>
            <div className="note-content-container">
              <p className="note-content">{note.plain_text}</p>
            </div>
          </li>
          <div className="bottom-border"></div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelectedNote: (noteId) => dispatch(updateSelectedNote(noteId)),
    deleteWarning: () => dispatch(updateNoteDeleteWarning()),
  };
};

export default connect(null, mapDispatchToProps)(NoteIndexItem);

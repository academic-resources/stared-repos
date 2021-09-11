import React from 'react';
import { connect } from 'react-redux';
import { updateNoteDeleteWarning } from '../../actions/ui_actions';
import { deleteNote } from '../../actions/note_actions';
import { fetchNotebooks } from '../../actions/notebook_actions';

class NoteDelete extends React.Component {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    const note = Object.assign({}, this.state);
    this.props.processForm(this.props.id).then(
      newNote => {
        this.props.fetchNotebooks();
        this.props.deleteWarning();
      }
    );
  }

  render () {
    const id = this.props.id;
    const title = this.props.title;
    const { deleteWarning } = this.props;
    const { reveal } = this.props;
    return(
      <div className={`form-modal ${reveal}`} >
        <div className='container'>
          <img className='plus-logo'src={window.staticImages.grayTrashCan}/>
          <h3>
            {`${this.props.formType.toUpperCase()} NOTE`}
            <div className='bottom-border'/>
          </h3>
          <form
            className='notebook-form'
            onSubmit={this.handleSubmit}>

            <h3 className='delete-script'>
              Are you sure you want to delete <p className='delete-title'>{title}?</p>
            </h3>

            <div className='form-buttons'>
              <button className='notebook-button notebook-cancel' onClick={(e) => {
                  e.preventDefault();
                  deleteWarning();
                }}>
                Cancel
              </button>
              <input className='notebook-button notebook-submit'
                type='submit'
                value={`${this.props.formType}`}/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const revealIndex = (state.ui.note_delete_warning) ? "reveal-note-delete-warning" : "hide-note-delete-warning";
  const note = (state.notes[state.ui.selected_note]) ?
    state.notes[state.ui.selected_note] : {id: false, title: ''};
  return {
    reveal: revealIndex,
    id: note.id,
    title: note.title,
    formType: 'Delete'
  };
};

const mapDisptachToProps = dispatch => {
  return {
    deleteWarning: () => dispatch(updateNoteDeleteWarning()),
    processForm: id => dispatch(deleteNote(id)),
    fetchNotebooks: () => dispatch(fetchNotebooks())
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(NoteDelete);

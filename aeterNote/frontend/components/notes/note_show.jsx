import React from 'react';
import Note from './note_container';
import NoteDeleteWarning from './note_delete_warning';

class NoteShow extends React.Component {
  render () {
    return(
      <div className='note-modal-wrapper'>
        <NoteDeleteWarning />
        <Note />
      </div>


    );
  }
}

export default NoteShow;

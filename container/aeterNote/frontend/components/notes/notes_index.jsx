import React from 'react';
import SortOptions from '../notebooks/sort_options';
import NoteIndexItem from './note_index_item';

class NoteIndex extends React.Component {

  componentDidMount() {

    this.props.fetchNotes();
  }

  render () {
    const { notes } = this.props;
    const { noteCount } = this.props;
    return(
      <div className='notes-index'>
        <header className='notes-header'>
          <h3 className='placeholder'>NOTES</h3>
          <div className='note-count-options'>
            <p>{`${noteCount} NOTES`}</p>
            <div className='sort-options' onClick={this.props.updateSortOptions}>
              Options <img src={window.staticImages.downArrow}/>
            <SortOptions reveal={this.props.revealSort}/>
            </div>
          </div>
        </header>
        <ul className='notes-ul'>
          {notes.map(note => {
            return <NoteIndexItem
                      key={note.id}
                      note={note} />;
          })}
        </ul>
      </div>
    );
  }
}

export default NoteIndex;

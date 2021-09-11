import React from 'react';
import SortOptions from './sort_options';
import EditNotebook from './update_notebook_form_container';
import NoteIndexItem from '../notes/note_index_item';


class NotebookShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteCount: this.props.noteCount
    };
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    this.setState({ noteCount: newProps.noteCount });
  }

  componentDidMount() {
    this.props.fetchNotes();
  }

  render () {
    const { notebook } = this.props;
    const { noteCount } = this.props;
    const notes = (this.props.notes[0]) ? this.props.notes : [{id: ''}];
    return(
      <div className={`${this.props.revealShow}`}>

      <div className={`notebook-show`} >
        <header className='notebook-header'>
          <img className={this.props.locked}
            src={window.staticImages.infoI}
            onClick={this.props.updateEditNotebook}/>
          <EditNotebook />
          <h3 className='notebook-title'>{notebook.title}</h3>
        </header>
        <div className='note-info'>
          <div className='count-options'>
            <p>{`${noteCount} notes`}</p>
            <div className='sort-options' onClick={this.props.updateSortOptions}>
              Options <img src={window.staticImages.downArrow}/>
            <SortOptions reveal={this.props.revealSort}/>
            </div>
          </div>
          <div className='notes-index'>
            <ul className='notes-ul notebook-show-notes'>
              {
                notes.map(note => {
                  if(note)
                return <NoteIndexItem
                          key={note.id}
                          note={note} />;
              })}
            </ul>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default NotebookShow;

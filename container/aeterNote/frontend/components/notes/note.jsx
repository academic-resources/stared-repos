import React from 'react';
import ReactQuill from 'react-quill';
import { merge } from 'lodash';
import NotebookSelect from './notebook_selector';
import NoteTagsList from './note_tags_list';

class QuillNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.note;
    merge(this.state, {
      saveAction: (this.props.note.id) ?
          this.props.updateNote : this.props.createNote,
      notebook_id: (this.props.note.notebook_id)
    });

    this.update = this.update.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSaveAction = this.handleSaveAction.bind(this);
    this.collectNotebook = this.collectNotebook.bind(this);
  }


  componentWillReceiveProps(newProps) {
    console.log(newProps);
    if(newProps.note.id !== this.props.note.id)
    {this.setState({
      id: newProps.note.id,
      title: newProps.note.title,
      content: newProps.note.content,
      plain_text: newProps.note.plain_text,
      notebook_id: newProps.note.notebook_id,
      notebook: newProps.notebook,
      notebooks: newProps.notebooks,
      tag_ids: newProps.note.tag_ids,
      tags: newProps.tags,
      taggings: newProps.taggings

    });
    this.setState((newProps.note.id) ?
        { saveAction: newProps.updateNote } :
        { saveAction: newProps.createNote });}
    if(newProps.taggings !== this.props.taggings) {
      this.setState(
        {
          tags: newProps.tags,
          taggins: newProps.taggings
        });
    }
  }

  componentDidMount() {

    if (this.props.note.id) {
      this.props.fetchNote(this.props.note.id);
    }
  }

  update(field) {
    return e => this.setState({[field]: e.target.value});
  }

  handleEditorChange(content, delta, source, editor) {
    this.setState({
      content: content,
      plain_text: editor.getText().trim()
    });
  }

  handleSaveAction() {
    const note = {
      id: this.state.id,
      title: this.state.title,
      content: this.state.content,
      plain_text: this.state.plain_text,
      notebook_id: this.state.notebook_id,
    };
    this.state.saveAction(note).then(
      () => {
        this.props.resetNotebooks();
        this.props.resetTags();
      }
    );

  }

  collectNotebook(notebookId) {


    this.setState({ notebook_id: notebookId });


  }

  render() {
    const { tags } = this.props;
    const { tag_ids } = this.props;
    const toolbar = [
      [{ 'font': [] }],
      ['italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],

      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],

      ['clean']
    ];
    let errorBox = ['note-errors'];
    if (this.props.noteErrors.length > 0) { errorBox.push('flash'); }
    return (

    <main className='note-new-edit'>
      <form className='note-show'>
        <div className='action-tools'>
          <div className={`delete-note-trash ${this.props.lockDelete}`}
            onClick={() => this.props.deleteWarning()}>
          </div>
          <div className='notebook-select-modal-holder'>
            <div className='notebook-select'
              onClick={() => this.props.notebookSelector()}>
              {(this.props.notebooks[this.state.notebook_id]) ?
                this.props.notebooks[this.state.notebook_id].title :
                ''}
              <img src={window.staticImages.downArrow}/>
            </div>
            <NotebookSelect
              reveal={this.props.revealSelector}
              notebooks={Object.values(this.props.notebooks)}
              collectNotebook={this.collectNotebook}/>
          </div>
          <NoteTagsList />
        </div>
        <div className='title-save'>
          <ul className={errorBox.join(' ')}>
            {
              this.props.noteErrors.map((error, i) => (
                <li key={i}>{error}</li>
              ))
            }
          </ul>
          <input className='note-title-edit'
            type='text'
            value={this.state.title}
            onChange={this.update('title')}
            placeholder="Title your new note"/>
          <button className="notebook-button save-button"
            onClick={(e) => {
              e.preventDefault();
              this.handleSaveAction();
            }}>
            Save
          </button>
        </div>
      </form>
        <ReactQuill
          modules={{toolbar}}
          value={this.state.content}
          ref={ editor => { this.editor = editor; }}
          onChange={this.handleEditorChange}
          />


    </main>

      );
  }
}


export default QuillNote;

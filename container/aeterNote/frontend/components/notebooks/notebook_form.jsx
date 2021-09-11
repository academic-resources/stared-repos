import React from 'react';

class NoteForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: this.props.title
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.removeErrors();
  }

  componentWillReceiveProps() {
    this.setState({ title: '' });
  }

  handleSubmit(e) {
    e.preventDefault();
    const notebook = Object.assign({}, this.state);
    this.props.processForm(notebook).then(
      newNotebook => this.props.updateNotebookFormModal()
    );
  }

  update(field) {
    return e => this.setState({[field]: e.target.value});
  }

  render () {
    const { reveal } = this.props;
    const { updateNotebookFormModal } = this.props;
    return(
      <div className={`form-modal ${reveal}`} >
        <div className='container'>
          <img className='plus-logo'src={window.staticImages.notebookPlus}/>
          <h3>
            {`${this.props.formType.toUpperCase()} NOTEBOOK`}
            <div className='bottom-border'/>
          </h3>
          <form
            className='notebook-form'
            onSubmit={this.handleSubmit}>

            <ul className='errors'>
              {
                this.props.errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))
              }
            </ul>

            <input
              className="title"
              type='text'
              placeholder="Title your notebook"
              value={this.state.title}
              onChange={this.update('title')}/>
            <div className='form-buttons'>
              <button className='notebook-button notebook-cancel' onClick={(e) => {
                  e.preventDefault();
                  updateNotebookFormModal();
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

export default NoteForm;

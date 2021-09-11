import React from 'react';
import { connect } from 'react-redux';
import { updateDeleteWarning } from '../../actions/ui_actions';
import { deleteNotebook } from '../../actions/notebook_actions';

class NoteBookDelete extends React.Component {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    const notebook = Object.assign({}, this.state);
    this.props.processForm(this.props.id).then(
      newNotebook => this.props.deleteWarning()
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
            {`${this.props.formType.toUpperCase()} NOTEBOOK`}
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
  const revealIndex = (state.ui.delete_warning) ? "reveal-delete-warning" : "hide-delete-warning";
  const notebook = (state.notebooks[state.ui.current_notebook]) ?
    state.notebooks[state.ui.current_notebook] : {id: false, title: ''};
  return {
    reveal: revealIndex,
    id: notebook.id,
    title: notebook.title,
    formType: 'Delete'
  };
};

const mapDisptachToProps = dispatch => {
  return {
    deleteWarning: () => dispatch(updateDeleteWarning()),
    processForm: id => dispatch(deleteNotebook(id))
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(NoteBookDelete);

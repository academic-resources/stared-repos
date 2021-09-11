import React from 'react';
import { connect } from 'react-redux';
import { updateTagDeleteWarning } from '../../actions/ui_actions';
import { deleteTag } from '../../actions/tag_actions';
import { fetchTags } from '../../actions/tag_actions';

class TagDelete extends React.Component {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    const tag = Object.assign({}, this.state);
    this.props.processForm(this.props.id).then(
      newTag => {
        this.props.fetchTags();
        this.props.deleteWarning();
      }
    );
  }

  render () {
    const id = this.props.id;
    const label = this.props.label;
    const { deleteWarning } = this.props;
    const { reveal } = this.props;
    return(
      <div className={`form-modal ${reveal}`} >
        <div className='container'>
          <img className='plus-logo'src={window.staticImages.grayTrashCan}/>
          <h3>
            {`${this.props.formType.toUpperCase()} TAG`}
            <div className='bottom-border'/>
          </h3>
          <form
            className='notebook-form'
            onSubmit={this.handleSubmit}>

            <h3 className='delete-script'>
              Are you sure you want to delete <p className='delete-title'>{label}?</p>
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
  const revealIndex = (state.ui.tag_delete_warning) ? "reveal-tag-delete-warning" : "hide-tag-delete-warning";
  const tag = (state.tags[state.ui.current_tag]) ?
    state.tags[state.ui.current_tag] : {id: false, title: ''};
  return {
    reveal: revealIndex,
    id: tag.id,
    label: tag.label,
    formType: 'Delete'
  };
};

const mapDisptachToProps = dispatch => {
  return {
    deleteWarning: () => dispatch(updateTagDeleteWarning()),
    processForm: id => dispatch(deleteTag(id)),
    fetchTags: () => dispatch(fetchTags())
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(TagDelete);

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  updateTagSelected,
  updateTagDeleteWarning
} from '../../actions/ui_actions';


class TagIndexItem extends React.Component {
  constructor(props){
    super(props);

  }

  render(){
    const tagId = this.props.tag.id;
    const taggingCount = this.props.tag.note_ids.length;
    return(
      <div className= 'tag-item-container'>
        <li className='tag-item'
            onClick={() => {
              this.props.selectTag(tagId);
              this.props.history.push('/tags');
            } }>
          <div className='tag-description'>
            <h5 className='tag-label'>
              {this.props.tag.label}
            </h5>
            <p className='tag-count'>{`${taggingCount}`}</p>
          </div>
          <div className='tag-item-buttons'>
            <button className='button-tag'
              onClick={() => {
                this.props.selectTag(tagId);
                this.props.deleteWarning();}
              }>
              <div className='button-tag' />
            </button>
          </div>

        </li>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectTag: tagId => dispatch(updateTagSelected(tagId)),
    deleteWarning: () => dispatch(updateTagDeleteWarning()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(TagIndexItem));

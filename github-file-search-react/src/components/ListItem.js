import React from 'react';
import moment from 'moment';
import { AiFillFolder, AiOutlineFile, AiOutlineRight } from 'react-icons/ai';
import PropTypes from 'prop-types';

const ListItem = ({
  index,
  type,
  name,
  comment,
  modified_time,
  isSearchView,
  counter
}) => {
  const isSelected = counter === index;

  return (
    <React.Fragment>
      <div className={`list-item ${isSelected ? 'active' : ''}`}>
        <div className="file">
          {isSearchView && (
            <span
              className={`arrow-icon ${isSelected ? 'visible' : 'invisible'}`}
            >
              <AiOutlineRight color="#0366d6" />
            </span>
          )}
          <span className="file-icon">
            {type === 'folder' ? (
              <AiFillFolder color="#79b8ff" size="20" />
            ) : (
              <AiOutlineFile size="18" />
            )}
          </span>
          <span
            className="label"
            dangerouslySetInnerHTML={{ __html: name }}
          ></span>
        </div>
        {!isSearchView && (
          <React.Fragment>
            <div className="comment">{comment}</div>
            <div className="time" title={modified_time}>
              {moment(modified_time).fromNow()}
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

ListItem.propTypes = {
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  modified_time: PropTypes.string.isRequired,
  isSearchView: PropTypes.bool,
  counter: PropTypes.number
};

export default ListItem;

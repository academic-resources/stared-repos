import React from 'react';
import ListItem from './ListItem';
import PropTypes from 'prop-types';

const FilesList = ({ files, isSearchView, counter }) => {
  return (
    <div className="list">
      {files.length > 0 ? (
        files.map((file, index) => {
          return (
            <ListItem
              key={file.id}
              {...file}
              index={index}
              isSearchView={isSearchView}
              counter={counter}
            />
          );
        })
      ) : (
        <div>
          <h3 className="no-result">No matching files found</h3>
        </div>
      )}
    </div>
  );
};

FilesList.propTypes = {
  files: PropTypes.array.isRequired,
  isSearchView: PropTypes.bool,
  counter: PropTypes.number
};

export default FilesList;

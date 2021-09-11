import React from 'react';

const InfoMessage = () => {
  return (
    <div className="info-message">
      You've activated the <em>file finder</em>. Start typing to filter the file
      list. Use <span className="navigation">↑</span> and{' '}
      <span className="navigation">↓</span> to navigate,{' '}
      <span className="navigation">esc</span> to exit.
    </div>
  );
};

export default InfoMessage;

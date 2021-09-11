import React from "react";
import PropTypes from 'prop-types';

function Error({ errObj }) {
  return (
    <div className="card h-667 md:h-auto md:min-h-90vh center-flex text-center">
      <p>
        Something went wrong: {errObj.message}.<br />
        Please try again later.
      </p>
    </div>
  );
}

export default Error;

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

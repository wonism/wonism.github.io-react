import React, { PropTypes } from 'react';

const propTypes = {
  location: PropTypes.object.isRequired,
};

function PageNotFound({ location }) {
  return (
    <div>
      <h2>
        Page not found
      </h2>
      <p>
        the path, <code>{location.pathname}</code>, did not match any React Router routes.
      </p>
    </div>
  );
}

PageNotFound.propTypes = propTypes;

export default PageNotFound;


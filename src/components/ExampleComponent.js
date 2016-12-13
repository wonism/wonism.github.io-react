import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  children: PropTypes.element,
};

function ExampleComponent({ children }) {
  return (
    <div>
      {
        children ||
        <div>
          <Link to="/example/two-deep?a=1&b=2&c=3#abc">
            Example two deep with query and hash
          </Link>
          &nbsp;/&nbsp;
          <Link to="/example/two-deep">
            Example two deep without query and hash
          </Link>
        </div>
      }
    </div>
  );
}

ExampleComponent.propTypes = propTypes;

export default ExampleComponent;


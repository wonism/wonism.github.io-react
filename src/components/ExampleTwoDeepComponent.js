import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  location: PropTypes.object.isRequired,
};

class ExampleTwoDeepComponent extends Component {
  constructor(props) {
    super(props);
    this.queryPresent = Object.keys(this.props.location.query).length !== 0;
    this.hashPresent = this.props.location.hash !== '';
    this.queryStringTitle = () => {
      if (this.queryPresent) return 'The query string field-value pairs are : ';
      return 'No query string in the url';
    };
    this.hashFragmentTitle = () => {
      if (this.hashPresent) return 'The hash fragment is : ';
      return 'No hash fragment in the url';
    };
  }

  render() {
    return (
      <div>
        <div>
          <div>{this.queryStringTitle()}</div>
          <ul>
            {Object.keys(this.props.location.query).map((el, i) =>
              <li key={i}>
                {el}: {this.props.location.query[el]}
              </li>
            )}
          </ul>
        </div>
        <div>
          <div>{this.hashFragmentTitle()}</div>
          <ul>
            {this.hashPresent ? <li>{this.props.location.hash.slice(1)}</li> : null}
          </ul>
        </div>
      </div>
    );
  }
}

ExampleTwoDeepComponent.propTypes = propTypes;

export default ExampleTwoDeepComponent;


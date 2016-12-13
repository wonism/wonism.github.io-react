import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  children: PropTypes.element.isRequired,
  routes: PropTypes.array.isRequired,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.generateMapMenu = () => {
      let path = '';

      function nextPath(route) {
        path += (
          (path.slice(-1) === '/' ? '' : '/') +
          (route.path === '/' ? '' : route.path)
        );

        return path;
      }

      return (
        this.props.routes.
          filter(route => route.mapMenuTitle).
          map((route, index, arr) => (
            <span key={index}>
              <Link to={nextPath(route)}>{route.mapMenuTitle}</Link>
              {(index + 1) < arr.length && ' / '}
            </span>
          ))
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Single Page Apps for GitHub Pages</h1>
        <p>Menus</p>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>&nbsp;
            </li>
            <li>
              <Link to="/example">example</Link>&nbsp;
            </li>
            <li>
              <Link to="/example/two-deep?a=1&b=2&c=3#abc">example/two-deep (with query and hash)</Link>
            </li>
            <li>
              <Link to="/example/two-deep">example/two-deep (without query and hash)</Link>
            </li>
          </ul>
        </nav>
        <hr />
        <p>Breadcrumbs</p>
        <nav className="breadcrumbs">
          {this.generateMapMenu()}
        </nav>
        <hr />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;


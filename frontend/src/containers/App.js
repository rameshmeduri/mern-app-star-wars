import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import materialTheme from 'utils/materialTheme';
import MainApp from 'app/index';
import SignIn from './SignIn';
import { setInitUrl } from 'actions/authActions';


const RestrictedRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

class App extends Component {

  componentDidMount() {
    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
  }

  render() {
    const { match, location, user, initURL } = this.props;
    if (location.pathname === '/') {
      if (user === null) {
          return ( <Redirect to={'/signin'}/> );
      } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
          return ( <Redirect to={'/app/search_planet'}/> );
      } else {
          return ( <Redirect to={initURL}/> );
      }
  }

    return (
      <MuiThemeProvider theme={createMuiTheme(materialTheme)}>
        <div className="app-main">
          <RestrictedRoute
            path={`${match.url}app`}
            user={user}
            component={MainApp}
          />
          <Route path="/signin" component={SignIn} />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  sideNavColor: state.settings.sideNavColor,
  user: state.auth.user,
  initURL: state.auth.initURL
});

export default connect(mapStateToProps, { setInitUrl })(App);

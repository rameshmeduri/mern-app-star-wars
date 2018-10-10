import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from 'components/Header/index';
import Sidebar from 'containers/SideNav/index';
import Footer from 'components/Footer';
import { COLLAPSED_DRAWER, FIXED_DRAWER } from 'actions/types';
import SearchPlanet from './routes/SearchPlanet';



class App extends React.Component {
  render() {
    const { match, drawerType } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? 'fixed-drawer'
      : drawerType.includes(COLLAPSED_DRAWER)
        ? 'collapsible-drawer'
        : 'mini-drawer';
    return (
      <div className={`app-container ${drawerStyle}`}>
        <Sidebar />
        <div className="app-main-container">
          <div className="app-header">
            <Header />
          </div>
          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Route
                exact
                path={`${match.url}/search_planet`}
                component={SearchPlanet}
              />
            </div>
            <Footer />
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  drawerType: state.settings.drawerType
});
export default connect(mapStateToProps)(App);

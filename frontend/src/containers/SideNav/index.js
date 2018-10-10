import $ from 'jquery';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';

import SidenavContent from './SidenavContent';
import { COLLAPSED_DRAWER, FIXED_DRAWER } from 'actions/types';
import { toggleCollapsedNav, updateWindowWidth } from 'actions/settingActions';

class SideNav extends React.PureComponent {
  onToggleCollapsedNav = (e) => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.props.updateWindowWidth($(window).width());
    });
  }

  render() {
    const { navCollapsed, drawerType, width } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? 'd-xl-flex'
      : drawerType.includes(COLLAPSED_DRAWER)
        ? ''
        : 'd-flex';
    let type = 'permanent';
    if (
      drawerType.includes(COLLAPSED_DRAWER) ||
      (drawerType.includes(FIXED_DRAWER) && width < 1200)
    ) {
      type = 'temporary';
    }

    return (
      <div className={`app-sidebar d-none ${drawerStyle}`}>
        <Drawer
          className="app-sidebar-content"
          variant={type}
          open={type.includes('temporary') ? navCollapsed : true}
          onClose={this.onToggleCollapsedNav}
          classes={{
            paper: 'side-nav'
          }}
        >
          <h1
            className="text-center"
            style={{ marginTop: '20px', marginBottom: '0' }}
          >
            STAR WARS
          </h1>
          <SidenavContent />
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  navCollapsed: state.settings.navCollapsed,
  drawerType: state.settings.drawerType,
  width: state.settings.width
});

export default withRouter(
  connect(mapStateToProps, { toggleCollapsedNav, updateWindowWidth })(SideNav)
);

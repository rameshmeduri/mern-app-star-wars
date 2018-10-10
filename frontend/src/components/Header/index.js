import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { logoutUser } from 'actions/authActions';

const styles = (theme) => ({
  flex: {
    flexGrow: 1
  }
});

class Header extends React.Component {
  state = { anchorEl: null };

  handleMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  onClose = () => {
    this.setState({ anchorEl: null });
  };

  onLogout = () => {
    this.setState({ anchorEl: null });
    this.props.logoutUser();
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <AppBar className="app-main-header">
        <Toolbar className="app-toolbar" disableGutters={false}>
          <div className={classes.flex}></div>
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            ><AccountCircle /></IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={this.onClose}
            >
              <MenuItem onClick={this.onClose}>
                <i className="zmdi zmdi-account zmdi-hc-fw mr-2" />
                Profile
              </MenuItem>
              <MenuItem onClick={this.onLogout}>
                <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2" />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

let styledHeader = withStyles(styles)(Header);

const mapStateToProps = (state) => ({
  drawerType: state.settings.drawerType
});

export default connect(mapStateToProps, { logoutUser })(styledHeader);

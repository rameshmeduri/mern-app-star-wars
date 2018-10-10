import React, { Component } from 'react';
import { withStyles, TextField } from '@material-ui/core';
import JSONP from 'browser-jsonp';
import Suggestions from './Suggestions';

const API_URL = 'https://api.github.com/search/users';


const styles = (theme) => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    fontSize: '14px'
  }
});


class Search extends Component {
  state = {
    error: false,
    user: '',
    results: []
  };

  getInfo = () => {
    let that = this;
    JSONP({
      url: `${API_URL}?q=${this.state.user}`,
      success: function (res) {
        let usersArr = res.data.items;
        let arr = usersArr.map((user) => user.login);
        that.setState({ results: arr });
      }
    });
  }

  onChange = (e) => {
    this.setState({
      'user': e.target.value
    }, () => {
      if (this.state.user) {
        this.getInfo();
      } else {
        this.setState({ results: [] });
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          label="Search User"
          value={this.state.user}
          onChange={this.onChange}
          className={classes.textField}
        />
        <br />
        <br />
        <Suggestions results={this.state.results} />
      </div>
    )
  }
}

export default withStyles(styles)(Search);

import React, { Component } from 'react';
import { Paper, withStyles } from '@material-ui/core';
import ContainerHeader from 'components/ContainerHeader/index';
import Search from './Search';

const styles = (theme) => ({
  paper: {
    width: '100%',
    padding: theme.spacing.unit * 3
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '40px 0'
  }
});

class SearchPlanet extends Component {

  render() {
    const { classes, match } = this.props;
    return (
      <div className="app-wrapper">        
        <ContainerHeader match={match} title="Search Planet" />
        <Paper className={classes.paper}>
          <div className="content-section implementation">
            
              <Search />
            
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(SearchPlanet);


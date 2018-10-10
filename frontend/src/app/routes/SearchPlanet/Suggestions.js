import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function Suggestions(props) {
  const { classes, results } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        {
          results.map((user, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={user} />
            </ListItem>
          ))
        }
      </List>
    </div>
  );
}

export default withStyles(styles)(Suggestions);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  }
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div className="spinner">
      <CircularProgress 
        className={classes.progress} 
        color="inherit"
        size={40}
        left={-20}
        top={10}
        style={{marginLeft: '50%'}} />
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);
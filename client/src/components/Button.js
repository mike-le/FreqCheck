import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    leftIcon: {
      marginRight: theme.spacing.unit,
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
    iconSmall: {
      fontSize: 20,
    },
  });

function IconLabelButtons(props) {
    const { classes } = props;
    return (
        <div className='uploadbutton'>
        <input
            accept=".txt"
            className={classes.input}
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={props.onChange}
        />
        <label htmlFor="raised-button-file">
            <Button variant="contained" component="span" color="default" className={classes.button}>
            Upload
                <CloudUploadIcon className={classes.rightIcon} />
            </Button>
        </label> 
        </div>
    );
}
    
IconLabelButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(IconLabelButtons);
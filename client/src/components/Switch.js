import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
    colorSwitchBase: {
      color: green[0],
      '&$colorChecked': {
        color: green[500],
        '& + $colorBar': {
          backgroundColor: green[500],
        },
      },
    },
    colorBar: {},
    colorChecked: {},
    label: {
        color: grey[50],
        fontWeight: 600
    }
});

function SwitchLabels(props){
    const { classes } = props;

    return (
        <div className='switch'>
        <FormGroup row>
        <FormControlLabel
            control={
            <Switch
                checked={props.stopWords}
                onChange={props.handleChange('stopWord')}
                value="stopWord"
                classes={{
                    switchBase: classes.colorSwitchBase,
                    checked: classes.colorChecked,
                    bar: classes.colorBar,
                    root: classes.switch
                }}
            />
            }     
            label="Stop Word"   
            classes={{ label: classes.label }}
        />
        </FormGroup>
        </div>
    );
}

SwitchLabels.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(SwitchLabels);

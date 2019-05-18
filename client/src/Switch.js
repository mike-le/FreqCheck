import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabels(props){
    return (
        <div className='switch'>
        <FormGroup row>
        <FormControlLabel
            control={
            <Switch
                checked={props.stopWords}
                onChange={props.handleChange('stopWord')}
                value="stopWord"
                color="primary"
            />
            }
            label="Stop Words"
        />
        </FormGroup>
        </div>
    );
}

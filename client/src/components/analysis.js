import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    }
});

class InteractiveList extends React.Component {
    state = {
        dense: false,
        secondary: false,
    };

    render() {
        const { classes } = this.props;
        const { dense, } = this.state;

    
        return (
            <div className='list-grid'>
            <Grid container 
           
            spacing={24}
            direction="column"
            justify="center"
            >
                <div className={classes.demo}>
                <List dense={dense}>
                    <ListItem>
                        <ListItemAvatar>
                            <IconButton>
                                <FolderIcon />
                            </IconButton>
                        </ListItemAvatar>
                        <ListItemText
                        classes={{ text: this.props.classes.selected }}
                        primary= { this.props.analysis['name'] }
                        secondary={ moment(this.props.analysis['date']).fromNow() }
                        />
                        <ListItemSecondaryAction>
                        <IconButton aria-label="Delete">
                            <DeleteIcon/>
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
                </div>
            </Grid>
            </div>
        );
    }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InteractiveList);

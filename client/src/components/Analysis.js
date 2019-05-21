import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import ModalContent from './ModalContent';

const styles = theme => ({
    demo: {
        backgroundColor: theme.palette.background.paper,
    }
});

class InteractiveList extends React.Component {
    state = {
        dense: false,
        secondary: false,
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
      };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { dense } = this.state;

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
                        <IconButton onClick={this.handleOpen}>
                            <FolderIcon/>
                        </IconButton>
                        <ModalContent 
                            open={this.state.open} 
                            close={this.handleClose}
                            analysis={this.props.analysis}>
                        </ModalContent>
                        <ListItemText
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

const InteractiveListWrapped = withStyles(styles)(InteractiveList)

export default InteractiveListWrapped;

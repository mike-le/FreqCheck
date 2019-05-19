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
import Modal from '@material-ui/core/Modal';

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
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    }
});

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

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
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose}
                            >
                            <div style={getModalStyle()} className={classes.paper}>
                                <div className="modalHeader">
                                    {this.props.analysis['name']}
                                </div>
                                <div className="modalsubHeader">
                                    ({this.props.analysis['stopword'] ? "Stop words filtered" : "Stop words included" })
                                </div>
                                <table className="mainTable">
                                    <thead className='thead-dark'>
                                        <tr>
                                            <th scope='col'>Id</th>
                                            <th className="nameCol" scope="col">Name</th>
                                            <th className="countCol" scope="col">Count</th>            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.analysis['data'].map((pair, i) => 
                                            <tr key={i+1}>
                                                <td>{ i+1 }.</td>
                                                <td className="nameCol">{ Object.keys(pair)[0] }</td>
                                                <td className="countCol">{ Object.values(pair)[0] }</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Modal>
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

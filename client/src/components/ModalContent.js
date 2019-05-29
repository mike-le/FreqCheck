import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
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

class ModalContent extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.open}
                onClose={this.props.close}
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
                                <tr key={ i+1 }>
                                    <td>{ i+1 }.</td>
                                    <td className="nameCol">{ Object.keys(pair)[0] }</td>
                                    <td className="countCol">{ Object.values(pair)[0] }</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Modal>
        )}
}

ModalContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ModalContentWrapped = withStyles(styles)(ModalContent)

export default ModalContentWrapped;

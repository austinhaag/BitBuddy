import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TechnicalsTable from './components/TechnicalsTable';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    height: '94vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Technicals extends React.Component {

  constructor(props) {
      super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      <CssBaseline />
        <main className={classes.content}>
          <div className={classes.tableContainer}>
            <TechnicalsTable />
          </div>
        </main>
      </div>
    );
  }
}

Technicals.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Technicals);

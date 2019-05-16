import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { formatMarketCap } from '../helpers';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
		loading: {
				alignItems: 'center',
    justifyContent: 'center',
				marginTop: 300,
				marginLeft: '50%',
		},
		icon: {
			width: 25,
			height:25,
		},
		iconAndName: {
    display: 'flex',
				alignItems: 'center',
    justifyContent: 'left',
  },
		name: {
			margin: 10,
		},
		total: {
			marginBottom: 15,
		}
});


function PortfolioTable(props) {
  const { classes } = props;

  /*
    Show loading spinner instead of table while data is being fetched
  */

  if(props.isLoading) {
    return (<div className={classes.loading}><CircularProgress className={classes.progress} /></div>)
  }

  /*
    Display Error message if Coinmarketcap API fails
  */

  if(props.isError) {
    return (<Paper>
              <Typography variant="headline" component="h3">
                Error!
              </Typography>
              <Typography component="p">
                Unable to fetch data
              </Typography>
            </Paper>)
  }

  return (
			<div>
				<Typography className={classes.total} color="textSecondary" align="center" variant="subheading"><b>Total Value:</b> ${props.totalValue}</Typography>
				<Paper>
				<Table>
      <TableHead>
        <TableRow>
          {
            props.coinColumns.map((column) => {
              return (<TableCell>{column}</TableCell>)
            })
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {props.coinData.map(n => {
          return (
            <TableRow key={n.rank}>
              <TableCell>{n.rank}</TableCell>
              <TableCell>
																<div className={classes.iconAndName}>
																	<Avatar alt={n.symbol} src={`https://raw.githubusercontent.com/cjdowner/cryptocurrency-icons/master/128/color/${n.symbol.toLowerCase()}.png`} className={classes.icon} />
																	<div className={classes.name}>
																		{n.name}
																	</div>
																</div>
														</TableCell>
              <TableCell>${formatMarketCap(n.price)}</TableCell>
              <TableCell>
              <TextField
                id="number"
                value={props.portfolio[n.symbol]}
                type="number"
                onChange={e => props.handlePortfolioChange(e.target.value, n.symbol)}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
              </TableCell>
              <TableCell>${formatMarketCap((props.portfolio[n.symbol] * n.price))}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
				</Paper>
				</div>
  );
}

PortfolioTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PortfolioTable);

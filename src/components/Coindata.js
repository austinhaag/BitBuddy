import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({

});

const Coindata = props => (
			<Table>
					<TableHead>
							<TableRow>
									<TableCell><Typography color="textSecondary" align="center" variant="body2"><b>Cryptocurrencies:</b> {props.active_cryptocurrencies}</Typography></TableCell>
									<TableCell><Typography color="textSecondary" align="center" variant="body2"><b>Markets:</b> {props.active_markets}</Typography></TableCell>
									<TableCell><Typography color="textSecondary" align="center" variant="body2"><b>Market Cap:</b> ${props.total_market_cap}</Typography></TableCell>
									<TableCell><Typography color="textSecondary" align="center" variant="body2"><b>24h Vol:</b> ${props.total_volume_24h}</Typography></TableCell>
									<TableCell><Typography color="textSecondary" align="center" variant="body2"><b>BTC Dominance:</b> {props.bitcoin_percentage_of_market_cap}%</Typography></TableCell>
							</TableRow>
					</TableHead>
			</Table>
);

Coindata.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Coindata);

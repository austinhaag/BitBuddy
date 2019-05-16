import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Coindata from "./components/Coindata";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import { renderChangePercent, formatMarketCap, formatMarketPrice, formatMarketVolume } from './helpers';

const GLOBAL_COIN_API = 'https://api.coinmarketcap.com/v2/global/';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing.unit*2,
		paddingRight: theme.spacing.unit*2,
		paddingBottom: theme.spacing.unit*2,
    height: '94vh',
    overflow: 'auto',
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
	}
});

class Market extends Component {
  constructor() {
    super();
    this.state = {
			data: [],
			g_coin_val: {
				active_cryptocurrencies: undefined,
				active_markets: undefined,
				bitcoin_percentage_of_market_cap: undefined,
				total_market_cap: undefined,
				total_volume_24h: undefined
			},
		};
  }

  componentDidMount() {
    fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=50`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));

		fetch(GLOBAL_COIN_API)
			.then(response => response.json())
			.then(json => {
				this.setState({
					g_coin_val: {
						active_cryptocurrencies: json.data.active_cryptocurrencies.toLocaleString(),
						active_markets: json.data.active_markets.toLocaleString(),
						bitcoin_percentage_of_market_cap: json.data.bitcoin_percentage_of_market_cap,
						total_market_cap: json.data.quotes.USD.total_market_cap.toLocaleString(),
						total_volume_24h: json.data.quotes.USD.total_volume_24h.toLocaleString()
					}
				});
			});
  }
  render() {
		
		const { classes } = this.props;

    return (
			<div className={classes.root}>
				<CssBaseline />
				<main className={classes.content}>
					<Coindata
						active_cryptocurrencies= {this.state.g_coin_val.active_cryptocurrencies}
						active_markets= {this.state.g_coin_val.active_markets}
						bitcoin_percentage_of_market_cap= {this.state.g_coin_val.bitcoin_percentage_of_market_cap}
						total_market_cap= {this.state.g_coin_val.total_market_cap}
						total_volume_24h= {this.state.g_coin_val.total_volume_24h}
					/>
					<div>
						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>#</TableCell>
										<TableCell>Coin</TableCell>
										<TableCell>USD</TableCell>
										<TableCell>Market Cap</TableCell>
										<TableCell>Volume (24h)</TableCell>
										<TableCell>% Change (24h)</TableCell>
										<TableCell>% Change (7d)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{this.state.data.map(coin => (
											<TableRow key={coin.id}>
													<TableCell component="th" scope="row">{coin.rank}</TableCell>
													<TableCell>
														<div className={classes.iconAndName}>
															<Avatar alt={coin.symbol} src={`https://raw.githubusercontent.com/cjdowner/cryptocurrency-icons/master/128/color/${coin.symbol.toLowerCase()}.png`} className={classes.icon} />
															<div className={classes.name}>
																{coin.name}
															</div>
														</div>
													</TableCell>
													<TableCell>${formatMarketPrice(coin.price_usd)}</TableCell>
													<TableCell>${formatMarketCap(coin.market_cap_usd)}</TableCell>
													<TableCell>${formatMarketVolume(coin["24h_volume_usd"])}</TableCell>
													<TableCell>{renderChangePercent(coin.percent_change_24h)}</TableCell>
													<TableCell>{renderChangePercent(coin.percent_change_7d)}</TableCell>
											</TableRow>
									))}
								</TableBody>
							</Table>
						</Paper>
					</div>
				</main>
			</div>
    );
  }
}
export default withStyles(styles)(Market);

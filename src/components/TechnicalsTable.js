import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const styles = theme => ({
  root: {
    flexGrow: 1,
				textAlign: 'center',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
		table: {
    minWidth: 100,
  },
		formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
		form:{
				display: 'inline-block',
				marginBottom: 10
		}
});

class TechnicalsTable extends Component {

  constructor(props) {
    super(props);
				const { classes } = props;
    this.state = {
					recommended: [],
					s_moving_averages: [],
					e_moving_averages: [],
					oscillators: [],
					pivots: [],
					exchangePair: "BTCUSDT",
					candle: 15
				};
				this.componentDidMount.bind(this);
				this.handleCandle = this.handleCandle.bind(this);
				this.handleExchangePair = this.handleExchangePair.bind(this);
				this.getData.bind(this);
  }

		handleCandle(event) {
				this.setState({candle: event.target.value});
				this.getData(this.state.exchangePair, event.target.value);
		}

		handleExchangePair(event) {
				this.setState({exchangePair: event.target.value});
				this.getData(event.target.value, this.state.candle);
		}

		getData(exchangePair, candle){
			this.state.s_moving_averages = [];
			this.state.e_moving_averages = [];
			this.state.oscillators = [];
			this.state.recommended = [];
			this.state.pivots = [];
			//Python data collection from TV
			client.invoke("get_technicals", exchangePair, candle, (error, res) => {
							if(error) {
											console.error(error);
							} else {
											var jsonData = JSON.parse(res);

											var recommended = jsonData.recommended;
											var s_moving_averages = jsonData.s_moving_averages;
											var e_moving_averages = jsonData.e_moving_averages;
											var oscillators = jsonData.oscillators;
											var pivots = jsonData.pivots;

											var keys = Object.keys(recommended);
											var ordered = {};
											keys.sort().forEach(function(key) {
											  ordered[key] = keys[key];
											});
											var keys = Object.keys(ordered)
											var i = 0;
											var tempData = this.state.recommended; //Store previous data if it exists

											while(i < keys.length)
											{
												tempData.push( { id: i, key: keys[i], value: recommended[keys[i]] } ) //Push the new data in
												i++;
											}
											this.setState({ tempData }) //Store back in the state
											//////
											var keys = Object.keys(s_moving_averages);
											ordered = {};
											keys.sort(function(a, b){return a.substring(3)-b.substring(3)}).forEach(function(key) {
											  ordered[key] = keys[key];
											});
											var keys = Object.keys(ordered)
											i = 0;
											var tempData = this.state.s_moving_averages; //Store previous data if it exists

											while(i < keys.length)
											{
												tempData.push( { id: i, key: keys[i], value: s_moving_averages[keys[i]] } ) //Push the new data in
												i++;
											}
											this.setState({ tempData }) //Store back in the state
											//////
											var keys = Object.keys(e_moving_averages);
											ordered = {};
											keys.sort(function(a, b){return a.substring(3)-b.substring(3)}).forEach(function(key) {
											  ordered[key] = keys[key];
											});
											var keys = Object.keys(ordered)
											i = 0;
											var tempData = this.state.e_moving_averages; //Store previous data if it exists

											while(i < keys.length)
											{
												tempData.push( { id: i, key: keys[i], value: e_moving_averages[keys[i]] } ) //Push the new data in
												i++;
											}
											this.setState({ tempData }) //Store back in the state
											//////
											var keys = Object.keys(oscillators);
											ordered = {};
											keys.sort().forEach(function(key) {
											  ordered[key] = keys[key];
											});
											var keys = Object.keys(ordered)
											i = 0;
											var tempData = this.state.oscillators; //Store previous data if it exists

											while(i < keys.length)
											{
												tempData.push( { id: i, key: keys[i], value: oscillators[keys[i]] } ) //Push the new data in
												i++;
											}
											this.setState({ tempData }) //Store back in the state
											//////
											var keys = Object.keys(pivots);

											i = 0;
											var tempData = this.state.pivots; //Store previous data if it exists

											while(i < keys.length)
											{
												tempData.push( { id: i, key: keys[i], value: pivots[keys[i]] } ) //Push the new data in
												i++;
											}
											this.setState({ tempData }) //Store back in the state
											//////
										}
			});
		}


  componentDidMount() {
			this.getData(this.state.exchangePair, this.state.candle);
  }

  render() {
				const { classes } = this.props;

				return (
					<div className={classes.root}>
					<form className={classes.form} autoComplete="off">
							<FormControl className={classes.formControl}>
									<InputLabel htmlFor="candle-simple">Candle</InputLabel>
									<Select
											value={this.state.candle}
											onChange={this.handleCandle}
											inputProps={{
													name: 'candle',
													id: 'candle-simple',
											}}
									>
											<MenuItem value={1}>1 Minute</MenuItem>
											<MenuItem value={5}>5 Minute</MenuItem>
											<MenuItem value={15}>15 Minute</MenuItem>
											<MenuItem value={60}>1 Hour</MenuItem>
											<MenuItem value={240}>4 Hour</MenuItem>
									</Select>
							</FormControl>
					</form>

					<form className={classes.form} autoComplete="off">
							<FormControl className={classes.formControl}>
									<InputLabel htmlFor="exchange-pair-simple">Exchange Pair</InputLabel>
									<Select
											value={this.state.exchangePair}
											onChange={this.handleExchangePair}
											inputProps={{
													name: 'exchange-pair',
													id: 'exchange-pair-simple',
											}}
									>
											<MenuItem value={"BTCUSDT"}>BTCUSDT (Bitcoin)</MenuItem>
											<MenuItem value={"ETHUSDT"}>ETHUSDT (Ethereum)</MenuItem>
											<MenuItem value={"XRPUSDT"}>XRPUSDT (Ripple)</MenuItem>
											<MenuItem value={"BCHABCUSDT"}>BCHABCUSDT (Bitcoin Cash)</MenuItem>
											<MenuItem value={"LTCUSDT"}>LTCUSDT (Litecoin)</MenuItem>
											<MenuItem value={"EOSUSDT"}>EOSUSDT (EOS)</MenuItem>
											<MenuItem value={"BNBUSDT"}>BNBUSDT (Binance Coin)</MenuItem>
											<MenuItem value={"XLMUSDT"}>XLMUSDT (Stellar)</MenuItem>
											<MenuItem value={"ADAUSDT"}>ADAUSDT (Cardano)</MenuItem>
											<MenuItem value={"TRXUSDT"}>TRXUSDT (Tron)</MenuItem>
											<MenuItem value={"XMRUSDT"}>XMRUSDT (Monero)</MenuItem>
											<MenuItem value={"DASHUSDT"}>DASHUSDT (Dash)</MenuItem>
											<MenuItem value={"IOTAUSDT"}>IOTAUSDT (IOTA)</MenuItem>
									</Select>
							</FormControl>
					</form>

					<Grid container spacing={24}>
							<Grid item xs={6}>
								<Paper className={classes.root}>
										<Table className={classes.table}>
												<TableHead>
														<TableRow>
																<TableCell>Signal</TableCell>
																<TableCell align="right">Value</TableCell>
														</TableRow>
												</TableHead>
												<TableBody>
														{this.state.recommended.map(n => (
																<TableRow key={n.id}>
																		<TableCell component="th" scope="row">
																				{n.key}
																		</TableCell>
																		<TableCell align="right">{n.value}</TableCell>
																</TableRow>
														))}
												</TableBody>
										</Table>
								</Paper>
							</Grid>
							<Grid item xs={6}>
								<Paper className={classes.root}>
										<Table className={classes.table}>
												<TableHead>
														<TableRow>
																<TableCell>Oscillator</TableCell>
																<TableCell align="right">Value</TableCell>
														</TableRow>
												</TableHead>
												<TableBody>
														{this.state.oscillators.map(n => (
																<TableRow key={n.id}>
																		<TableCell component="th" scope="row">
																				{n.key}
																		</TableCell>
																		<TableCell align="right">{n.value}</TableCell>
																</TableRow>
														))}
												</TableBody>
										</Table>
								</Paper>
							</Grid>
							<Grid item xs={6}>
								<Paper className={classes.root}>
										<Table className={classes.table}>
												<TableHead>
														<TableRow>
																<TableCell>Simple Moving Average</TableCell>
																<TableCell align="right">Value</TableCell>
														</TableRow>
												</TableHead>
												<TableBody>
														{this.state.s_moving_averages.map(n => (
																<TableRow key={n.id}>
																		<TableCell component="th" scope="row">
																				{n.key}
																		</TableCell>
																		<TableCell align="right">{n.value}</TableCell>
																</TableRow>
														))}
												</TableBody>
										</Table>
								</Paper>
							</Grid>
							<Grid item xs={6}>
								<Paper className={classes.root}>
										<Table className={classes.table}>
												<TableHead>
														<TableRow>
																<TableCell>Estimated Moving Average</TableCell>
																<TableCell align="right">Value</TableCell>
														</TableRow>
												</TableHead>
												<TableBody>
														{this.state.e_moving_averages.map(n => (
																<TableRow key={n.id}>
																		<TableCell component="th" scope="row">
																				{n.key}
																		</TableCell>
																		<TableCell align="right">{n.value}</TableCell>
																</TableRow>
														))}
												</TableBody>
										</Table>
								</Paper>
							</Grid>
							<Grid item xs={12}>
								<Paper className={classes.root}>
										<Table className={classes.table}>
												<TableHead>
														<TableRow>
																<TableCell>Pivot</TableCell>
																<TableCell align="center">Classic</TableCell>
																<TableCell align="center">Fibonacci</TableCell>
																<TableCell align="center">Camarilla</TableCell>
																<TableCell align="center">Woodie</TableCell>
														</TableRow>
												</TableHead>
												<TableBody>
														{this.state.pivots.map(n => (
																<TableRow key={n.id}>
																		<TableCell component="th" scope="row">
																				{n.key}
																		</TableCell>
																		<TableCell align="center">{n.value.Classic}</TableCell>
																		<TableCell align="center">{n.value.Fibonacci}</TableCell>
																		<TableCell align="center">{n.value.Camarilla}</TableCell>
																		<TableCell align="center">{n.value.Woodie}</TableCell>
																</TableRow>
														))}
												</TableBody>
										</Table>
								</Paper>
							</Grid>
						</Grid>
		    </div>
				);
  }
}

TechnicalsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TechnicalsTable);

import React, { Component } from 'react'
import axios from 'axios';
import api from './data/api-keys'
import _ from 'lodash'
import Table from './components/PortfolioTable.js';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit*2,
    height: '94vh',
    overflow: 'auto',
  }
});

class Portfolio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      coinData: [],
      coinColumns:[
        '#',
        'Coin',
        'Price',
        'Holdings',
        'Value'
      ],
      portfolio: {},
      totalValue: 0
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  /*
    Handler for detecting changes to portfolio
  */

  handlePortfolioChange(value, symbol) {
    let portfolio = this.state.portfolio;
    portfolio[symbol] = value;
    this.setState({
      portfolio: portfolio
    });
    this.updateLocalStorage();
    this.getTotal();
  }

  /*
    Calculate total portfolio Value
  */

  getTotal() {
    let total = 0;
    this.state.coinData.forEach((coin) => {
      total += coin.price * this.state.portfolio[coin.symbol];
    })
    console.log("Total", total);
    this.setState({
      totalValue: total.toFixed(2)
    })
    localStorage.setItem("totalValue", total.toFixed(2))
  }

  /*
    Update local storage with current portfolio
  */

  updateLocalStorage() {
    let keys = Object.keys(this.state.portfolio);
    keys.forEach((key) => {
      localStorage.setItem(key, this.state.portfolio[key]);
    });
  }


  /*
    Fetch Coin data and conversion data from API
  */

  fetchData() {
    axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      method: 'GET',
      params: {
        limit: 50
      },
      headers: {
        'X-CMC_PRO_API_KEY': api.key
      }
    }).then((res) => {
        // Success response for CoinmarketCap API
        let data = res.data
        this.setState({
          loading: false
        });
        this.makeData(data);
    }, () => {
      this.setState({
        loading: false,
        error: true
      })
    });
  }

  /*
    Reorganize data for the app
  */

  makeData(coins) {
    let coinData = [];
    let portfolio = {};
    coins.data.forEach((coin) => {
      coinData.push({
        name: coin.name,
        symbol: coin.symbol,
        rank: coin.cmc_rank,
        price: coin.quote.USD.price
      });
      portfolio[coin.symbol] = localStorage.getItem(coin.symbol) || 0;
    });
    this.setState({
      coinData: coinData,
      portfolio: portfolio
    });
    this.getTotal();
  }

  render() {
			const { classes } = this.props;
    return (
      <div className={classes.root}>
      <CssBaseline />
        <div className={classes.content}>
          <div>
			      <Table
              isLoading={this.state.loading}
              isError={this.state.error}
              coinData={this.state.coinData}
              coinColumns={this.state.coinColumns}
              portfolio={this.state.portfolio}
              handlePortfolioChange={this.handlePortfolioChange.bind(this)}
              totalValue={this.state.totalValue}>
            </Table>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Portfolio);

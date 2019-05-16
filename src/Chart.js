import React from 'react';
import TradingViewWidget from 'react-tradingview-widget';

class Chart extends React.Component {

  render() {
    return (
						<div style = {{height:'94vh'}}>
							<TradingViewWidget
					    symbol="BINANCE:BTCUSDT"
					    autosize
					  />
						</div>
    );
  }
}

export default (Chart);

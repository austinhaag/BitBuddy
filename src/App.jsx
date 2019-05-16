
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import Chart from "./Chart"
import Market from "./Market"
import Technicals from "./Technicals"
import News from "./News"
import Portfolio from "./Portfolio"

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Zerorpc from 'zerorpc';

const client = new Zerorpc.Client();
client.connect("tcp://127.0.0.1:4242")

client.invoke("echo", "server ready", (error, res) => {
  if(error || res !== 'server ready') {
    console.error(error)
  } else {
    console.log("server is ready")
  }
})

const routing = (
  <Router>
    <div>
      <AppBar id="title-bar" position="static">
        <Toolbar>
					<div id="nav-bar">
						<NavLink id="nav-item" activeClassName="active" to="/market">
								<Button color="inherit">
										Market
								</Button>
						</NavLink>
						|
						<NavLink id="nav-item" activeClassName="active" to="/news">
								<Button color="inherit">
										News
								</Button>
						</NavLink>
						|
						<NavLink id="nav-item" activeClassName="active" to="/technicals">
								<Button color="inherit">
										Technicals
								</Button>
						</NavLink>
						|
						<NavLink id="nav-item" activeClassName="active" to="/portfolio">
								<Button color="inherit">
										Portfolio
								</Button>
						</NavLink>
						|
						<NavLink id="nav-item" activeClassName="active" to="/chart">
								<Button color="inherit">
										Chart
								</Button>
						</NavLink>
					</div>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path="/chart" component={Chart} />
				<Route path="/technicals" component={Technicals} />
				<Route path="/market" component={Market} />
				<Route path="/news" component={News} />
				<Route path="/portfolio" component={Portfolio} />
        <Route component={Market} />
      </Switch>

    </div>
  </Router>
);

const render = () => {
  ReactDOM.render(routing, document.getElementById('root'));
}

render();

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from "react";
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';

const NEWS_API = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=863b5fc5d2dae8bfa9f9eb9e318b91670b121f2e3fba1362e865c23824dc1a27';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit*2,
    height: '94vh',
		float: 'left',
		clear:'both',
		overflow: 'auto',
  },
	card: {
    minWidth: 200,
		marginBottom: 10,
		height: 300,
		overflow: 'auto',
  },
  title: {
    fontSize: 15,
  },
	appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
	webpage: {
		margin: "auto",
		width: "100%",
		height: "100vh"
	},
	loading: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 300,
		marginLeft: '50%',
	}
});

var escapeChars = { lt: '<', gt: '>', quot: '"', apos: "'", amp: '&' };

function unescapeHTML(str) {//modified from underscore.string and string.js
	return str.replace(/\&([^;]+);/g, function(entity, entityCode) {
		var match;

		if ( entityCode in escapeChars) {
			return escapeChars[entityCode];
		} else if ( match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
			return String.fromCharCode(parseInt(match[1], 16));
		} else if ( match = entityCode.match(/^#(\d+)$/)) {
			return String.fromCharCode(~~match[1]);
		} else {
			return entity;
		}
	});
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class News extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			data: [],
			url: "http://validator.w3.org/",
			title: "None",
			open: false
		};
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClickOpen(url, title) {
		this.setState({url: url, title: title, open: true});
	}

	handleClose(event) {
		this.setState({open: false});
	}

	componentDidMount() {
		fetch(NEWS_API)
			.then(res => res.json())
			.then(result => {
				this.setState({
					data: result.Data,
					isLoading: false
				});
			});
	}
  render() {
    const { classes } = this.props;

		if(this.state.isLoading) {
			return (<div className={classes.loading}><CircularProgress className={classes.progress} /></div>)
		}

		return (
			<div className={classes.root}>
			<CssBaseline />
				<main className={classes.content}>
					<Grid container spacing={16}>
						{this.state.data.map(article => (
							<Grid item xs={4} key={article.url}>
								<Paper>
									<Card className={classes.card}>
										<CardContent>
											<CardActions>
												<Button size="small" onClick={(evt) => {
													evt.preventDefault();
													this.handleClickOpen(article.url, article.title);
												}}>
													<Typography className={classes.title} color="textSecondary" gutterBottom>
														<b>{article.title}</b>
													</Typography>
												</Button>
											</CardActions>
											<Typography component="p">
												{unescapeHTML(article.body)}
											</Typography>
										</CardContent>
									</Card>
								</Paper>
							</Grid>
						))}
					</Grid>
				</ main>
				<Dialog
					fullScreen
					open={this.state.open}
					onClose={this.handleClose}
					TransitionComponent={Transition}
					>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
								<CloseIcon />
							</IconButton>
							<Typography variant="h7" color="inherit" className={classes.flex}>
								{this.state.title}
							</Typography>
						</Toolbar>
					</AppBar>
					<div>
						<iframe src={this.state.url} className={classes.webpage}></iframe>
					</div>
				</Dialog>
			</div>
		);
  }
}

News.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(News);

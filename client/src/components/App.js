import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import { connect } from 'react-redux';
import * as actions from '../actions';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

const App = (props) => { //1
	const { fetchUser } = props;

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	return (
		<div className="container">
			<BrowserRouter>
				<div>
                    <Header />
					<Route exact path="/" component={Landing} />
					<Route exact path="/surveys" component={Dashboard} />
					<Route path="/surveys/new" component={SurveyNew} />
				</div>
			</BrowserRouter>
		</div>
	);
};

// const mapDispatchToProps = dispatch => {
// 	return {
// 		fetchUser: () => dispatch(fetchUser())
// 	};
// }

const mapActionsToProps = {
	fetchUser: actions.fetchUser
}

export default connect(null, mapActionsToProps)(App);

//1 BrowserRouter only accept AT MOST 1 child

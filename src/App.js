import React from 'react';
// import logo from './logo.svg';
import './App.css';
import SwaggerUI from './components/swaggerUI';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<Router>
                <Switch>
                	<Route exact={true} path="/" component={SwaggerUI} />
                	<Route exact={true} path="/:type/:method" component={SwaggerUI} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;

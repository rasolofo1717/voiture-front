import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.scss';

import LoginLayout from './layouts/LoginLayout';
import AppLayout from './layouts/AppLayout';

import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import CommentPage from './components/CommentPage';

import { Provider } from 'react-redux';
import store from './store';

const LoginLayoutRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(matchProps) => (
				<LoginLayout>
					<Component {...matchProps} />
				</LoginLayout>
			)}
		/>
	);
};

const AppLayoutRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(matchProps) => (
				<AppLayout>
					<Component {...matchProps} />
				</AppLayout>
			)}
		/>
	);
};

function App() {
	return (
		<Provider store={store}>
			<div className='App'>
				<BrowserRouter>
					<Switch>
						<Route exact path='/'>
							<Redirect to='/signin' />
						</Route>
						<LoginLayoutRoute path='/signin' component={LoginPage} />
						<AppLayoutRoute path='/home' component={HomePage} />
						<AppLayoutRoute path='/comments/:id' component={CommentPage} />
					</Switch>
				</BrowserRouter>
			</div>
		</Provider>
	);
}

export default App;

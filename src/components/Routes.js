import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Chat from '../pages/Chat';
import PageNotFound from '../pages/PageNotFound';

const Routes = () => {
	return (
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/channels/:channels' component={Chat} />
			<Route component={PageNotFound} />
		</Switch>
	);
};

export default Routes;

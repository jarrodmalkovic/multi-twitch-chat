import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Chat from '../pages/Chat';

const Routes = () => {
	return (
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/chat/:channels' component={Chat} />
		</Switch>
	);
};

export default Routes;

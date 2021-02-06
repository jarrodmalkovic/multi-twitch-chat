import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/Routes';
import './styles/index.scss';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route component={Routes} />
			</Switch>
		</Router>
	);
};

export default App;

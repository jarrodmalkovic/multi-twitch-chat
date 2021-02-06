import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<section class='py-5'>
			<div class='container text-center'>
				<h1>OOPS!</h1>

				<div class='row'>
					<div class='col-md-6 mx-auto'>
						<p>We can't seem to find the page you're looking for.</p>
					</div>
				</div>
				<Link to='/'>
					<Button>Back to homepage</Button>
				</Link>
			</div>
		</section>
	);
};

export default PageNotFound;

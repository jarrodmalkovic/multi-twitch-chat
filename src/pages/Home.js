import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';

const Home = () => {
	const [channels, setChannels] = useState(['', '', '']);
	const history = useHistory();

	const onSubmit = (e) => {
		e.preventDefault();
		history.push(`/channels/${channels.join(',')}`);
	};

	const onRemoveChannel = (e) => {
		setChannels((prevState) =>
			prevState.filter((val, i) => i !== +e.target.id)
		);
	};

	const onChange = (e) => {
		setChannels((prevState) => [
			...prevState.slice(0, e.target.name * 1),
			e.target.value,
			...prevState.slice(e.target.name * 1 + 1, prevState.length),
		]);
	};

	const onAddChannel = () => {
		setChannels((prevState) => prevState.concat(''));
	};

	return (
		<Container>
			<h1>Multi Twitch Chat</h1>
			<h5>
				This web app allows you to read multiple twitch chats from one single
				page.
			</h5>
			<h6>
				Add the names of the channels you want to read below to get started!
			</h6>
			<Form onSubmit={onSubmit}>
				{channels.length ? (
					channels.map((channel, i) => (
						<Form.Group key={i}>
							<InputGroup>
								<Form.Control
									required
									placeholder={`Channel #${i + 1}`}
									value={channel}
									name={i}
									onChange={onChange}
								/>
								<InputGroup.Append>
									<Button id={i} onClick={onRemoveChannel}>
										Remove
									</Button>
								</InputGroup.Append>
							</InputGroup>
						</Form.Group>
					))
				) : (
					<p>
						You have added no channels. You must add atleast one channel before
						viewing the chat
					</p>
				)}
				<Form.Group>
					<Button onClick={onAddChannel} className='btn-space'>
						Add another channel!
					</Button>
					<Button
						type='submit'
						className='btn-space'
						disabled={channels.length === 0}
					>
						View Chats!
					</Button>
				</Form.Group>
			</Form>
		</Container>
	);
};

export default Home;

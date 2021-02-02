import tmi from 'tmi.js';
import { v4 as uuidv4 } from 'uuid';
import Message from '../components/Message';
import { CHANNEL } from '../constants';

const handleChatMessages = (setMessages, globalBadges) => {
	const client = new tmi.Client({
		connection: { reconnect: true },
		channels: [CHANNEL],
	});

	client.on('message', async (channel, tags, message, self) => {
		const messageData = {
			text: message,
			username: tags['display-name'],
			color: tags.color,
			emotes: tags.emotes,
			badges: tags.badges,
		};

		setMessages((prevArray) => [
			...prevArray,
			<Message
				key={uuidv4()}
				globalBadges={globalBadges}
				message={messageData}
			/>,
		]);
	});

	client.connect();
};

export { handleChatMessages };

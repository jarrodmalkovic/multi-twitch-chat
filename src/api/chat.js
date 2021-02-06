import tmi from 'tmi.js';
import { v4 as uuidv4 } from 'uuid';
import Message from '../components/Message';

const handleChatMessages = async (
	channels,
	setMessages,
	globalBadges,
	customBadges,
	BTTVChannelEmotes,
	FFZChannelEmotes
) => {
	try {
		const client = new tmi.Client({
			connection: { reconnect: true },
			options: { debug: true },
			channels,
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
					customBadges={customBadges}
					message={messageData}
					channel={channel}
					BTTVChannelEmotes={BTTVChannelEmotes}
					FFZChannelEmotes={FFZChannelEmotes}
				/>,
			]);
		});

		client.on('connected', () => {
			const messageData = {
				text: `Welcome to the chat room! You are now connected to ${channels.join(
					', '
				)} `,
				username: 'MultiChat.live',
				color: 'white',
				emotes: '',
				badges: '',
			};

			setMessages((prevArray) => [
				...prevArray,
				<Message
					key={uuidv4()}
					globalBadges={globalBadges}
					customBadges={customBadges}
					message={messageData}
					channel={''}
					BTTVChannelEmotes={BTTVChannelEmotes}
					FFZChannelEmotes={FFZChannelEmotes}
				/>,
			]);
		});

		client.on('disconnected', () => {
			const messageData = {
				text: 'Disconnected...',
				username: 'MultiChat.live',
				color: 'white',
				emotes: '',
				badges: '',
			};

			setMessages((prevArray) => [
				...prevArray,
				<Message
					key={uuidv4()}
					globalBadges={globalBadges}
					customBadges={customBadges}
					message={messageData}
					channel={''}
					BTTVChannelEmotes={BTTVChannelEmotes}
					FFZChannelEmotes={FFZChannelEmotes}
				/>,
			]);
		});

		await client.connect();
		return client;
	} catch (err) {
		console.log(err);
	}
};

export { handleChatMessages };

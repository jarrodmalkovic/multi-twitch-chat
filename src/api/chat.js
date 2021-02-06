import tmi from 'tmi.js';
import { v4 as uuidv4 } from 'uuid';
import Message from '../components/Message';

let client;

const addMessage = (
	setMessages,
	messageData,
	globalBadges,
	customBadges,
	channel,
	BTTVChannelEmotes,
	FFZChannelEmotes
) => {
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
};

const onMessage = (
	message,
	tags,
	setMessages,
	globalBadges,
	customBadges,
	channel,
	BTTVChannelEmotes,
	FFZChannelEmotes
) => {
	try {
		const messageData = {
			text: message,
			username: tags['display-name'] || tags.username,
			color: tags.color,
			emotes: tags.emotes,
			badges: tags.badges,
		};

		addMessage(
			setMessages,
			messageData,
			globalBadges,
			customBadges,
			channel,
			BTTVChannelEmotes,
			FFZChannelEmotes
		);
	} catch (err) {
		console.error(err);
	}
};

const onDisconnected = (
	setMessages,
	globalBadges,
	customBadges,
	BTTVChannelEmotes,
	FFZChannelEmotes
) => {
	const messageData = {
		text: 'Disconnected...',
		username: 'MultiChat.live',
		color: 'white',
		emotes: '',
		badges: '',
	};

	addMessage(
		setMessages,
		messageData,
		globalBadges,
		customBadges,
		'',
		BTTVChannelEmotes,
		FFZChannelEmotes
	);
};

const onConnected = (
	channels,
	setMessages,
	globalBadges,
	customBadges,
	BTTVChannelEmotes,
	FFZChannelEmotes
) => {
	const messageData = {
		text: `Welcome to the chat room! You are now connected to ${channels.join(
			', '
		)} `,
		username: 'MultiChat.live',
		color: 'white',
		emotes: '',
		badges: '',
	};

	addMessage(
		setMessages,
		messageData,
		globalBadges,
		customBadges,
		'',
		BTTVChannelEmotes,
		FFZChannelEmotes
	);
};

const connectClient = async (
	channels,
	setMessages,
	globalBadges,
	customBadges,
	BTTVChannelEmotes,
	FFZChannelEmotes
) => {
	try {
		client = new tmi.Client({
			connection: { reconnect: true },
			channels,
		});

		client.on('message', async (channel, tags, message) =>
			onMessage(
				message,
				tags,
				setMessages,
				globalBadges,
				customBadges,
				channel,
				BTTVChannelEmotes,
				FFZChannelEmotes
			)
		);

		client.on('connected', () =>
			onConnected(
				channels,
				setMessages,
				globalBadges,
				customBadges,
				BTTVChannelEmotes,
				FFZChannelEmotes
			)
		);

		client.on('disconnected', () =>
			onDisconnected(
				setMessages,
				globalBadges,
				customBadges,
				BTTVChannelEmotes,
				FFZChannelEmotes
			)
		);

		await client.connect();
	} catch (err) {
		console.error(err);
	}
};

const disconnectClient = () => {
	if (client) {
		client.disconnect();
	}
};

export { connectClient, disconnectClient };

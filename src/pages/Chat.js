import { useEffect, useState, useCallback } from 'react';
import MessageContainer from '../components/MessageContainer';
import { connectClient, disconnectClient } from '../api/chat';
import { getBadges } from '../api/badges';
import getTwitchChannelIds from '../api/channels';
import getEmotes from '../api/emotes';

const Chat = ({ match }) => {
	const [messages, setMessages] = useState([]);
	const MAX_ALLOWED_MESSAGES = 100;

	const onLoad = useCallback(async () => {
		const channels = match.params.channels
			.split(',')
			.map((channel) => channel.toLowerCase());

		const twitchChannelIds = await getTwitchChannelIds(channels);

		const [
			[globalBadges, customBadges],
			[BTTVChannelEmotes, FFZChannelEmotes],
		] = await Promise.all([
			getBadges(channels, twitchChannelIds),
			getEmotes(channels, twitchChannelIds),
		]);

		await connectClient(
			channels,
			setMessages,
			globalBadges,
			customBadges,
			BTTVChannelEmotes,
			FFZChannelEmotes
		);
	}, [match.params.channels]);

	useEffect(() => {
		onLoad();
		return disconnectClient;
	}, [onLoad]);

	useEffect(() => {
		if (messages.length >= MAX_ALLOWED_MESSAGES)
			setMessages((prevArray) => prevArray.slice(5, prevArray.length));
	}, [messages]);

	return <MessageContainer messages={messages} />;
};

export default Chat;

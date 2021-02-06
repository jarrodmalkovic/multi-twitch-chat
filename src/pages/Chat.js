import { useEffect, useState, useCallback } from 'react';
import MessageContainer from '../components/MessageContainer';
import { handleChatMessages } from '../api/chat';
import { getGlobalBadges } from '../api/badges';
import getTwitchChannelIds from '../api/channels';
import getChannelEmotes from '../api/emotes';

const Chat = ({ match }) => {
	const [messages, setMessages] = useState([]);
	const MAX_ALLOWED_MESSAGES = 100;

	const onLoad = useCallback(async () => {
		const twitchChannelIds = await getTwitchChannelIds(
			match.params.channels.split(',')
		);

		const [globalBadges, customBadges] = await getGlobalBadges(
			match.params.channels.split(','),
			twitchChannelIds
		);

		const [BTTVChannelEmotes, FFZChannelEmotes] = await getChannelEmotes(
			match.params.channels.split(','),
			twitchChannelIds
		);

		await handleChatMessages(
			match.params.channels.split(','),
			setMessages,
			globalBadges,
			customBadges,
			BTTVChannelEmotes,
			FFZChannelEmotes
		);
	}, [match.params.channels]);

	useEffect(() => {
		onLoad();
	}, [onLoad]);

	useEffect(() => {
		if (messages.length >= MAX_ALLOWED_MESSAGES)
			setMessages((prevArray) => prevArray.slice(5, prevArray.length));
	}, [messages]);

	return <MessageContainer messages={messages} />;
};

export default Chat;

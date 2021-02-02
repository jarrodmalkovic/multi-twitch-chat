import { useEffect, useState } from 'react';
import MessageContainer from './components/MessageContainer';
import { handleChatMessages } from './actions/chat';
import { getGlobalBadges } from './actions/badges';
import { MAX_ALLOWED_MESSAGES } from './constants';
import './styles/index.css';

const App = () => {
	const [messages, setMessages] = useState([]);
	const [globalBadges, setGlobalBadges] = useState(null);

	useEffect(() => {
		if (!globalBadges) getGlobalBadges(setGlobalBadges);
		if (globalBadges) handleChatMessages(setMessages, globalBadges);
	}, [globalBadges]);

	useEffect(() => {
		if (messages.length >= MAX_ALLOWED_MESSAGES)
			setMessages((prevArray) => prevArray.slice(5, prevArray.length));
	}, [messages]);

	return <MessageContainer messages={messages} globalBadges={globalBadges} />;
};

export default App;

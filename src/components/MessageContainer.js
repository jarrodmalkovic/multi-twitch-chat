import { useEffect, useRef } from 'react';

const MessageContainer = ({ messages, globalBadges }) => {
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView();
	};

	useEffect(scrollToBottom, [messages]);

	return (
		<div>
			{messages}
			<div ref={messagesEndRef} />
		</div>
	);
};

export default MessageContainer;

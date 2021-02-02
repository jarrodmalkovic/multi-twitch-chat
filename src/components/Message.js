import MessageText from './MessageText';
import UserBadges from './UserBadges';
import Username from './Username';

const Message = ({ message, globalBadges }) => {
	return (
		<div className='message-container'>
			<UserBadges globalBadges={globalBadges} userBadges={message.badges} />
			<Username username={message.username} color={message.color} />
			<MessageText text={message.text} emotes={message.emotes} />
		</div>
	);
};

export default Message;

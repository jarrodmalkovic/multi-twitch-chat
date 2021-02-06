import ChannelName from './ChannelName';
import MessageText from './MessageText';
import UserBadges from './UserBadges';
import Username from './Username';

const Message = ({
	channel,
	message,
	globalBadges,
	customBadges,
	BTTVChannelEmotes,
	FFZChannelEmotes,
}) => {
	return (
		<div className='message-container'>
			<ChannelName channel={channel} />
			<UserBadges
				channel={channel}
				globalBadges={globalBadges}
				customBadges={customBadges}
				userBadges={message.badges}
			/>
			<Username username={message.username} color={message.color} />
			<MessageText
				text={message.text}
				emotes={message.emotes}
				BTTVChannelEmotes={BTTVChannelEmotes}
				channel={channel}
				FFZChannelEmotes={FFZChannelEmotes}
			/>
		</div>
	);
};

export default Message;

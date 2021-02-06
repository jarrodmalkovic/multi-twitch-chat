import { useMemo } from 'react';
import parseText from '../utils/parse-text';

const MessageText = ({
	text,
	emotes,
	BTTVChannelEmotes,
	channel,
	FFZChannelEmotes,
}) => {
	const parsedText = useMemo(
		() => parseText(text, emotes, BTTVChannelEmotes, channel, FFZChannelEmotes),
		[text, emotes, BTTVChannelEmotes, channel, FFZChannelEmotes]
	);

	return <span>{parsedText}</span>;
};

export default MessageText;

import { v4 as uuidv4 } from 'uuid';

const MessageText = ({ text, emotes }) => {
	const parseText = (text, emotes) => {
		if (!emotes) return [text];

		const emotesObj = {};

		for (const emote of Object.keys(emotes)) {
			const [startIndex, endIndex] = emotes[emote][0].split('-');
			const emoteName = text.slice(startIndex * 1, endIndex * 1 + 1);
			const emoteImg = `https://static-cdn.jtvnw.net/emoticons/v1/${emote}/1.0`;
			emotesObj[emoteName] = emoteImg;
		}

		const words = text.split(' ');

		for (let idx = 0; idx < words.length; idx++) {
			const word = words[idx];
			if (emotesObj[word]) {
				const emoteJsx = (
					<img
						className='emote'
						alt={word}
						src={emotesObj[word]}
						key={uuidv4()}
					/>
				);

				words[idx] = emoteJsx;
			} else {
				words[idx] += ' ';
			}
		}

		return words;
	};

	return <span>{parseText(text, emotes)}</span>;
};

export default MessageText;

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { v4 as uuidv4 } from 'uuid';

const parseText = (
	text,
	emotes,
	BTTVChannelEmotes,
	channel,
	FFZChannelEmotes
) => {
	const words = text.split(' ');
	const emotesObj = {};
	channel = channel.slice(1);

	if (emotes) {
		for (const emote of Object.keys(emotes)) {
			const [startIndex, endIndex] = emotes[emote][0].split('-');
			const emoteName = text.slice(startIndex * 1, endIndex * 1 + 1);
			const smallImg = `https://static-cdn.jtvnw.net/emoticons/v1/${emote}/1.0`;
			const largeImg = `https://static-cdn.jtvnw.net/emoticons/v1/${emote}/3.0`;
			emotesObj[emoteName] = { smallImg, largeImg };
		}
	}

	for (let idx = 0; idx < words.length; idx++) {
		const word = words[idx];
		let emote = ' ';

		if (BTTVChannelEmotes['global'][word]) {
			const BTTVEmote = BTTVChannelEmotes['global'][word];
			const largeImg = `https://cdn.betterttv.net/emote/${BTTVEmote.id}/3x`;
			const smallImg = `https://cdn.betterttv.net/emote/${BTTVEmote.id}/1x`;
			emote = (
				<OverlayTrigger
					placement='top'
					delay={{ show: 0, hide: 0 }}
					overlay={
						<Tooltip id='button-tooltip'>
							<img src={largeImg} alt={word} />
							<p className='emote-overlay-text'>{word}</p>
							<p className='emote-overlay-text'>Global BTTV Emote</p>
						</Tooltip>
					}
				>
					<img className='emote' alt={word} src={smallImg} key={uuidv4()} />
				</OverlayTrigger>
			);
		} else if (BTTVChannelEmotes[channel] && BTTVChannelEmotes[channel][word]) {
			const BTTVEmote = BTTVChannelEmotes[channel][word];
			const largeImg = `https://cdn.betterttv.net/emote/${BTTVEmote.id}/3x`;
			const smallImg = `https://cdn.betterttv.net/emote/${BTTVEmote.id}/1x`;
			emote = (
				<OverlayTrigger
					placement='top'
					delay={{ show: 0, hide: 0 }}
					overlay={
						<Tooltip id='button-tooltip'>
							<img src={largeImg} alt={word} />
							<p className='emote-overlay-text'>{word}</p>
							<p className='emote-overlay-text'>Global BTTV Emote</p>
						</Tooltip>
					}
				>
					<img className='emote' alt={word} src={smallImg} key={uuidv4()} />
				</OverlayTrigger>
			);
		} else if (FFZChannelEmotes['global'][word]) {
			const FFZEmote = FFZChannelEmotes['global'][word];
			const largeImg = FFZEmote[4] ? FFZEmote[4] : FFZEmote[1];
			const smallImg = FFZEmote[1];

			emote = (
				<OverlayTrigger
					placement='top'
					delay={{ show: 0, hide: 0 }}
					overlay={
						<Tooltip id='button-tooltip'>
							<img src={largeImg} alt={word} />
							<p className='emote-overlay-text'>{word}</p>
							<p className='emote-overlay-text'>Global FFZ Emote</p>
						</Tooltip>
					}
				>
					<img className='emote' alt={word} src={smallImg} key={uuidv4()} />
				</OverlayTrigger>
			);
		} else if (FFZChannelEmotes[channel] && FFZChannelEmotes[channel][word]) {
			const FFZEmote = FFZChannelEmotes[channel][word];
			const largeImg = FFZEmote[4] ? FFZEmote[4] : FFZEmote[1];
			const smallImg = FFZEmote[1];

			emote = (
				<OverlayTrigger
					placement='top'
					delay={{ show: 0, hide: 0 }}
					overlay={
						<Tooltip id='button-tooltip'>
							<img src={largeImg} alt={word} />
							<p className='emote-overlay-text'>{word}</p>
							<p className='emote-overlay-text'>Global FFZ Emote</p>
						</Tooltip>
					}
				>
					<img className='emote' alt={word} src={smallImg} key={uuidv4()} />
				</OverlayTrigger>
			);
		} else if (emotesObj[word]) {
			emote = (
				<OverlayTrigger
					placement='top'
					delay={{ show: 0, hide: 0 }}
					overlay={
						<Tooltip id='button-tooltip'>
							<img src={emotesObj[word].largeImg} alt={word} />
							<p className='emote-overlay-text'>{word}</p>
							<p className='emote-overlay-text'>Twitch Emote</p>
						</Tooltip>
					}
				>
					<img
						className='emote'
						alt={word}
						src={emotesObj[word].smallImg}
						key={uuidv4()}
					/>
				</OverlayTrigger>
			);
		}

		words[idx] = typeof emote === 'string' ? words[idx] + ' ' : emote;
	}

	return words;
};

export default parseText;

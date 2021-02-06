import axios from 'axios';

const getBTTVEmotes = async (channels, twitchChannelIds) => {
	try {
		const BTTVEmote = {};
		BTTVEmote['global'] = {};

		const globalBTTVEmotes = await axios.get(
			'https://api.betterttv.net/3/cached/emotes/global'
		);

		for (const emote of globalBTTVEmotes.data) {
			BTTVEmote['global'][emote.code] = { id: emote.id };
		}

		for (const channel of channels) {
			try {
				BTTVEmote[channel] = {};

				const channelBTTVEmotes = await axios.get(
					`https://api.betterttv.net/3/cached/users/twitch/${twitchChannelIds[channel]}`
				);

				const emotes = [
					...channelBTTVEmotes.data.channelEmotes,
					...channelBTTVEmotes.data.sharedEmotes,
				];

				for (const emote of emotes) {
					BTTVEmote[channel][emote.code] = { id: emote.id };
				}
			} catch (err) {}
		}

		return BTTVEmote;
	} catch (err) {
		console.log(err);
	}
};

const getFFZEmotes = async (channels) => {
	try {
		const FFZEmotes = {};
		FFZEmotes['global'] = {};

		const globalFFZEmotes = await axios.get(
			'https://api.frankerfacez.com/v1/set/global'
		);

		for (const setName of Object.keys(globalFFZEmotes.data.sets)) {
			const set = globalFFZEmotes.data.sets[setName];

			for (const emote of set.emoticons) {
				FFZEmotes['global'][emote.name] = emote.urls;
			}
		}

		for (const channel of channels) {
			try {
				FFZEmotes[channel] = {};

				const channelFFZEmotes = await axios.get(
					`https://api.frankerfacez.com/v1/room/${channel}`
				);

				for (const setName of Object.keys(channelFFZEmotes.data.sets)) {
					const set = channelFFZEmotes.data.sets[setName];

					for (const emote of set.emoticons) {
						FFZEmotes[channel][emote.name] = emote.urls;
					}
				}
			} catch (err) {}
		}

		console.log(FFZEmotes);
		return FFZEmotes;
	} catch (err) {
		console.log(err);
	}
};

const getChannelEmotes = async (channels, twitchChannelIds) => {
	const BTTVEmotes = await getBTTVEmotes(channels, twitchChannelIds);
	const FFZEmotes = await getFFZEmotes(channels);

	return [BTTVEmotes, FFZEmotes];
};

export default getChannelEmotes;

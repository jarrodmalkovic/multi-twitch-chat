import axios from 'axios';

const getGlobalBTTVEmotes = async (BTTVEmotes) => {
	try {
		BTTVEmotes['global'] = {};

		const globalBTTVEmotes = await axios.get(
			'https://api.betterttv.net/3/cached/emotes/global'
		);

		for (const emote of globalBTTVEmotes.data) {
			BTTVEmotes['global'][emote.code] = { id: emote.id };
		}
	} catch (err) {
		console.error(err);
	}
};

const getChannelBTTVEmotes = async (BTTVEmotes, channel, twitchChannelIds) => {
	try {
		BTTVEmotes[channel] = {};

		const channelBTTVEmotes = await axios.get(
			`https://api.betterttv.net/3/cached/users/twitch/${twitchChannelIds[channel]}`
		);

		const emotes = [
			...channelBTTVEmotes.data.channelEmotes,
			...channelBTTVEmotes.data.sharedEmotes,
		];

		for (const emote of emotes) {
			BTTVEmotes[channel][emote.code] = { id: emote.id };
		}
	} catch (err) {
		console.error(err);
	}
};

const getBTTVEmotes = async (channels, twitchChannelIds) => {
	try {
		const BTTVEmote = {};

		await Promise.all([
			...channels.map(async (channel) =>
				getChannelBTTVEmotes(BTTVEmote, channel, twitchChannelIds)
			),
			getGlobalBTTVEmotes(BTTVEmote),
		]);

		return BTTVEmote;
	} catch (err) {
		console.error(err);
	}
};

const getGlobalFFZEmotes = async (FFZEmotes) => {
	try {
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
	} catch (err) {
		console.error(err);
	}
};

const getChannelFFZEmotes = async (channel, FFZEmotes) => {
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
	} catch (err) {
		console.error(err);
	}
};

const getFFZEmotes = async (channels) => {
	try {
		const FFZEmotes = {};

		Promise.all([
			getGlobalFFZEmotes(FFZEmotes),
			...channels.map((channel) => getChannelFFZEmotes(channel, FFZEmotes)),
		]);

		return FFZEmotes;
	} catch (err) {
		console.error(err);
	}
};

const getEmotes = async (channels, twitchChannelIds) => {
	const [BTTVEmotes, FFZEmotes] = await Promise.all([
		getBTTVEmotes(channels, twitchChannelIds),
		getFFZEmotes(channels),
	]);

	return [BTTVEmotes, FFZEmotes];
};

export default getEmotes;

import axios from 'axios';

const getTwitchChannelId = async (channel, twitchChannelIds) => {
	try {
		const config = {
			headers: {
				'Client-ID': 'z1wktnxiwogyupxg1p25l9tjxf1qjj',
				Accept: 'application/vnd.twitchtv.v5+json',
			},
		};

		const channelData = await axios.get(
			`https://api.twitch.tv/kraken/users?login=${channel}`,
			config
		);

		const channelId = channelData.data.users[0]._id;

		twitchChannelIds[channel] = channelId;
	} catch (err) {
		console.error(err);
	}
};

const getTwitchChannelIds = async (channels) => {
	try {
		const twitchChannelIds = {};

		await Promise.all(
			channels.map(async (channel) =>
				getTwitchChannelId(channel, twitchChannelIds)
			)
		);

		return twitchChannelIds;
	} catch (err) {
		console.error(err);
	}
};

export default getTwitchChannelIds;

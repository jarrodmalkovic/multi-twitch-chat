import axios from 'axios';

const getTwitchChannelIds = async (channels) => {
	try {
		const channelsObj = {};

		for (const channel of channels) {
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

			channelsObj[channel] = channelId;
		}

		return channelsObj;
	} catch (err) {
		console.log(err);
	}
};

export default getTwitchChannelIds;

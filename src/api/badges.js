import axios from 'axios';

const getGlobalBadges = async () => {
	try {
		const globalBadgesData = await axios.get(
			'https://badges.twitch.tv/v1/badges/global/display'
		);

		const globalBadges = globalBadgesData.data.badge_sets;

		return globalBadges;
	} catch (err) {
		console.error(err);
	}
};

const getChannelBadges = async (channel, channelBadges, twitchChannelIds) => {
	try {
		const channelId = twitchChannelIds[channel];

		const channelBadgesData = await axios.get(
			`https://badges.twitch.tv/v1/badges/channels/${channelId}/display`
		);

		channelBadges[channel] = channelBadgesData.data.badge_sets;
	} catch (err) {
		console.error(err);
	}
};

const getBadges = async (channels, twitchChannelIds) => {
	try {
		const channelBadges = {};

		const [globalBadges] = await Promise.all([
			getGlobalBadges(),
			channels.map((channel) =>
				getChannelBadges(channel, channelBadges, twitchChannelIds)
			),
		]);

		return [globalBadges, channelBadges];
	} catch (err) {
		console.error(err);
	}
};

export { getBadges };

import axios from 'axios';

const getGlobalBadges = async (channels, twitchChannelIds) => {
	try {
		const customBadges = {};

		for (const channel of channels) {
			const channelId = twitchChannelIds[channel];
			const channelBadgesData = await axios.get(
				`https://badges.twitch.tv/v1/badges/channels/${channelId}/display`
			);

			customBadges[channel] = channelBadgesData.data.badge_sets;
		}

		const globalBadgesData = await axios.get(
			'https://badges.twitch.tv/v1/badges/global/display'
		);
		const globalBadges = globalBadgesData.data.badge_sets;

		return [globalBadges, customBadges];
	} catch (err) {
		console.log(err);
	}
};

export { getGlobalBadges };

import axios from 'axios';

const getGlobalBadges = async (setGlobalBadges) => {
	const res = await axios.get(
		'https://badges.twitch.tv/v1/badges/global/display'
	);

	setGlobalBadges(res.data.badge_sets);
};

export { getGlobalBadges };

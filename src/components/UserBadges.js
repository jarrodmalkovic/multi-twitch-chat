import { useMemo } from 'react';
import parseUserBadges from '../utils/parse-user-badges';

const UserBadges = ({ channel, globalBadges, userBadges, customBadges }) => {
	const parsedUserBadges = useMemo(
		() => parseUserBadges(channel, userBadges, globalBadges, customBadges),
		[channel, userBadges, globalBadges, customBadges]
	);

	return <span>{parsedUserBadges}</span>;
};

export default UserBadges;

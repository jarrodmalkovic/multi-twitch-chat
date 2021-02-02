import { v4 as uuidv4 } from 'uuid';

const UserBadges = ({ globalBadges, userBadges }) => {
	const parseUserBadges = (badges, globalBadges) => {
		if (!badges) return [];

		const badgesArr = [];

		for (const badgeKey of Object.keys(badges)) {
			const versions = globalBadges[badgeKey]['versions'];
			const version = badges[badgeKey];
			if (!versions[version]) continue;
			const badgeImg = versions[version]['image_url_1x'];
			const badgeJsx = (
				<img
					className='chat-badges'
					src={badgeImg}
					alt={badgeKey}
					key={uuidv4()}
				/>
			);
			badgesArr.push(badgeJsx);
		}

		return badgesArr;
	};

	return <span>{parseUserBadges(userBadges, globalBadges)}</span>;
};

export default UserBadges;

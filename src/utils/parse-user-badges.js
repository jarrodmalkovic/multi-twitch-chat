import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { v4 as uuidv4 } from 'uuid';

const parseUserBadges = (channel, badges, globalBadges, customBadges) => {
	if (!badges) return [];

	const badgesArr = [];

	for (const badgeKey of Object.keys(badges)) {
		if (parseBadge(badgeKey, badges, customBadges[channel.slice(1)], badgesArr))
			continue;
		parseBadge(badgeKey, badges, globalBadges, badgesArr);
	}

	return badgesArr;
};

const parseBadge = (badgeKey, userBadges, badges, badgesArr) => {
	if (!badges[badgeKey]) return;

	const badgeVersions = badges[badgeKey]['versions'];
	const badgeVersion = userBadges[badgeKey];

	if (badgeVersions && badgeVersions[badgeVersion]) {
		const largeBadgeImg = badgeVersions[badgeVersion]['image_url_4x'];
		const smallBadgeImg = badgeVersions[badgeVersion]['image_url_1x'];
		const title = badgeVersions[badgeVersion].title;

		const badgeJsx = (
			<OverlayTrigger
				placement='top'
				overlay={
					<Tooltip id='button-tooltip'>
						<img src={largeBadgeImg} alt={badgeKey} />
						<p className='emote-overlay-text'>{title}</p>
					</Tooltip>
				}
			>
				<img
					className='chat-badges'
					src={smallBadgeImg}
					alt={badgeKey}
					key={uuidv4()}
				/>
			</OverlayTrigger>
		);

		return badgesArr.push(badgeJsx);
	}
};

export default parseUserBadges;

const Username = ({ username, color }) => {
	return (
		<span style={{ color: color || 'gray' }} className='chat-username'>
			{username}:
		</span>
	);
};

export default Username;

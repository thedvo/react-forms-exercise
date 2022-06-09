import React from 'react';

const Box = ({
	id,
	handleRemove,
	width = 10,
	height = 10,
	backgroundColor = 'green',
}) => {
	const remove = () => handleRemove(id);

	const boxStyle = {
		height: `${height}em`,
		width: `${width}em`,
		backgroundColor,
	};

	return (
		<div>
			<div style={boxStyle} />
			<button onClick={remove}>Remove</button>
		</div>
	);
};

export default Box;

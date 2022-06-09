import React, { useState } from 'react';
import Box from './Box';
import NewBoxForm from './NewBoxForm';

const BoxList = () => {
	const [boxes, setBoxes] = useState([]);
	const addBox = (newBox) => {
		setBoxes((boxes) => [...boxes, newBox]);
	};

	const remove = (id) => {
		setBoxes((boxes) => boxes.filter((box) => box.id !== id));
	};
	return (
		<div>
			<h1>Box!</h1>
			<NewBoxForm addBox={addBox} />

			<div>
				{boxes.map(({ id, backgroundcolor, width, height }) => (
					<Box
						key={id}
						id={id}
						handleRemove={remove}
						backgroundColor={backgroundcolor}
						width={width}
						height={height}
					/>
				))}
			</div>
		</div>
	);
};

export default BoxList;

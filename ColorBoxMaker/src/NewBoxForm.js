import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

const NewBoxForm = ({ addBox }) => {
	const INITIAL_STATE = {
		backgroundcolor: '',
		width: '',
		height: '',
	};

	const [formData, setFormData] = useState(INITIAL_STATE);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((data) => ({
			...data,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addBox({ ...formData, id: uuid() });
		setFormData(INITIAL_STATE);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="backgroundcolor">Background Color</label>
			<input
				id="backgroundcolor"
				type="text"
				name="backgroundcolor"
				placeholder="backgroundcolor"
				value={formData.backgroundcolor}
				onChange={handleChange}
			/>

			<label htmlFor="width">Width</label>
			<input
				id="width"
				type="text"
				name="width"
				placeholder="width"
				value={formData.width}
				onChange={handleChange}
			/>

			<label htmlFor="height">Height</label>
			<input
				id="height"
				type="text"
				name="height"
				placeholder="height"
				value={formData.height}
				onChange={handleChange}
			/>

			<button>Create Box</button>
		</form>
	);
};

export default NewBoxForm;

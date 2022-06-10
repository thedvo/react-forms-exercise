import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

// destructure addTask function from prop passed down from parent component (ToDoList)
const NewToDoForm = ({ addTask }) => {
	const [task, setTask] = useState('');

	// handles any changes to the add task input and updates state
	const handleChange = (e) => {
		setTask(e.target.value);
	};

	// when user clicks 'add' button to create a task
	// run addTask function which will create a new array with the object containing input value and new ID added
	const handleSubmit = (e) => {
		e.preventDefault();
		addTask({ task, id: uuid() });
		setTask(''); // resets input in the form to empty it after submission
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="task">Task: </label>
			<input
				id="task"
				type="text"
				name="task"
				value={task}
				onChange={handleChange}
			/>
			<button>Add</button>
		</form>
	);
};

export default NewToDoForm;

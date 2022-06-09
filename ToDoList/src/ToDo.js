import React, { useState } from 'react';

const ToDo = ({ id, task, update, remove }) => {
	// set state for editing a task and if user is in process of making an edit
	const [editTask, setEditTask] = useState(task); // this piece of state will handle the task input as it is changing in the edit form
	const [isEditing, setIsEditing] = useState(false); // this piece of state will be used to determine what to render (the ToDo item or the edit form)

	// toggles TRUE/FALSE if an edit is being made
	const toggleEdit = () => {
		setIsEditing((edit) => !edit);
	};

	// takes value from current input and sets it to new state
	const handleChange = (e) => {
		setEditTask(e.target.value);
	};

	// handles removal of task
	const handleRemove = () => {
		remove(id);
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		update(id, editTask); //takes id of selected task and sets it's value to current state saved to 'editTask'
		setIsEditing(false); //sets to false because editing is done once submitted
	};

	// if the user is not making an edit, render regular task on screen
	if (!isEditing) {
		return (
			<div>
				<li>{task}</li>
				<button onClick={toggleEdit}>Edit</button>
				<button onClick={handleRemove}>Remove</button>
			</div>
		);
		// otherwise, if a user is making an edit to a task, show the edit form and handle the submit.
	} else {
		return (
			<div>
				<form onSubmit={handleUpdate}>
					<input type="text" value={editTask} onChange={handleChange} />
					<button>Update</button>
				</form>
			</div>
		);
	}
};

export default ToDo;

import React, { useState } from 'react';
import NewToDoForm from './NewToDoForm';
import ToDo from './ToDo';

const ToDoList = () => {
	const [todos, setTodos] = useState([]);

	// HERE WE DEFINE FUNCTIONS (add, update, remove) WHICH WILL BE PASSED AS PROPS TO CHILD COMPONENTS
	// THESE WILL CHANGE THE STATE OF THE PARENT COMPONENT WHEN EXECUTED

	// creating a new todo
	const handleCreate = (newTodo) => {
		setTodos((todos) => [...todos, newTodo]);
	};

	// editing an existing todo
	const handleUpdate = (id, updatedTask) => {
		setTodos((todos) =>
			todos.map((todo) =>
				todo.id === id ? { ...todo, task: updatedTask } : todo
			)
		);
	};

	// deleting a todo
	const handleRemove = (id) => {
		setTodos((todos) => todos.filter((todo) => todo.id !== id));
	};

	// --------------------------------------------------------------------------------------------------------

	// defines ToDo component which will render in the DOM
	const todoComponent = todos.map((todo) => (
		<ToDo
			key={todo.id}
			id={todo.id}
			task={todo.task}
			// functions (remove/update) passed as props to ToDo child component
			// each instance of a task will have access to these functions
			remove={handleRemove}
			update={handleUpdate}
		/>
	));
	// renders add task form and the tasks list below
	return (
		<div>
			<NewToDoForm addTask={handleCreate} />
			<ul>{todoComponent}</ul>
		</div>
	);
};

export default ToDoList;

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ToDoList from './ToDoList';

// mimic the add task function when form is submitted
function addTask(todoList, task = 'this is a test') {
	// select the input for creating a task
	const input = todoList.getByLabelText('Task:');

	// fire event to add task into the toDoList
	fireEvent.change(input, { target: { value: task } });

	// select the submit button
	const submitBtn = todoList.getByText('Add');

	// fire event to submit
	fireEvent.click(submitBtn);
}

// smoke test
it('renders without crashing', function() {
	render(<ToDoList />);
});

// snapshot test
it('matches snapshot', function() {
	const { asFragment } = render(<ToDoList />);
	expect(asFragment()).toMatchSnapshot();
});

// test adding a todo
it('can add a todo', function() {
	const list = render(<ToDoList />);
	addTask(list);
	// runs addTask function defined above

	// expect form to clear and todo to be on the page
	expect(list.getByLabelText('Task:')).toHaveValue('');
	// should see the value we added to addTask function defined above
	expect(list.getByText('this is a test')).toBeInTheDocument();
	// should also see the edit and remove buttons for this task
	expect(list.getByText('Edit')).toBeInTheDocument();
	expect(list.getByText('Remove')).toBeInTheDocument();
});

// test updating a todo
it('can edit a todo', function() {
	const list = render(<ToDoList />);
	addTask(list);

	// click the edit button
	fireEvent.click(list.getByText('Edit'));
	const editInput = list.getByDisplayValue('this is a test');

	// make an edit to the current input
	fireEvent.change(editInput, { target: { value: 'make another test' } });
	fireEvent.click(list.getByText('Update'));

	// expect only edited todo to appear
	expect(list.getByText('make another test')).toBeInTheDocument();
	expect(list.queryByText('this is a test')).not.toBeInTheDocument();
});

// test removing a todo
it('can delete a todo', function() {
	const list = render(<ToDoList />);
	addTask(list);

	fireEvent.click(list.getByText('Remove'));

	// expect todo to be gone
	expect(list.queryByText('this is a test')).not.toBeInTheDocument();
});

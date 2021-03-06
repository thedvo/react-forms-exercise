import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';
import '@testing-library/jest-dom/extend-expect';

// smoke test
it('renders without crashing', function() {
	render(<NewTodoForm />);
});

// snapshot test
it('matches snapshot', function() {
	const { asFragment } = render(<NewTodoForm />);
	expect(asFragment()).toMatchSnapshot();
});

// tests create task function on form submission
it('runs the add task function on form submission', function() {
	// https://jestjs.io/docs/mock-function-api
	// Mock functions are also known as "spies", because they let you spy on the behavior of a function that is called indirectly by some other code, rather than only testing the output. You can create a mock function with jest.fn()
	const mockAdd = jest.fn();
	const { getByText } = render(<NewTodoForm createTodo={mockAdd} />);
	const submitBtn = getByText('Add');
	fireEvent.click(submitBtn);
	expect(mockAdd).toHaveBeenCalled();
});

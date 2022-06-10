import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Todo from './Todo';

// smoke test
it('renders without crashing', function() {
	render(<Todo />);
});

// snapshot test
it('matches snapshot', function() {
	const { asFragment } = render(<Todo />);
	expect(asFragment()).toMatchSnapshot();
});

it('matches snapshot when editing', function() {
	const { asFragment, getByText } = render(<Todo />);
	const editBtn = getByText('Edit');
	fireEvent.click(editBtn);
	expect(asFragment()).toMatchSnapshot();
});

it('runs the update function on form submit', function() {
	// mock update function and render with the todo component
	const mockUpdate = jest.fn();
	const { getByText } = render(<Todo update={mockUpdate} />);

	// select the edit button and click it
	const editBtn = getByText('Edit');
	fireEvent.click(editBtn);

	// select the update button and click it
	const updateBtn = getByText('Update');
	fireEvent.click(updateBtn);
	expect(mockUpdate).toHaveBeenCalled();
});

it('runs the delete function on button click', function() {
	// mock delete function and render with todo component
	const mockDelete = jest.fn();
	const { getByText } = render(<Todo remove={mockDelete} />);

	// select remove button and click it
	const deleteBtn = getByText('Remove');
	fireEvent.click(deleteBtn);
	expect(mockDelete).toHaveBeenCalled();
});

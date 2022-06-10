import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BoxList from './BoxList';

// simulate creating a box
function addBox(boxList, height = '5', width = '5', color = 'green') {
	// Select form inputs
	const heightInput = boxList.getByLabelText('Height');
	const widthInput = boxList.getByLabelText('Width');
	const backgroundInput = boxList.getByLabelText('Background Color');

	// Update form data
	fireEvent.change(backgroundInput, { target: { value: color } });
	fireEvent.change(widthInput, { target: { value: width } });
	fireEvent.change(heightInput, { target: { value: height } });

	// Submit form button for creating a box
	const button = boxList.getByText('Create Box');
	fireEvent.click(button);
}

it('renders without crashing', function() {
	render(<BoxList />);
});

it('matches snapshot', function() {
	const { asFragment } = render(<BoxList />);
	expect(asFragment()).toMatchSnapshot();
});

it('can add a new box', function() {
	// render BoxList. There should not be any boxes yet meaning no "Remove" button on screen.
	const boxList = render(<BoxList />);
	expect(boxList.queryByText('Remove')).not.toBeInTheDocument();

	// add a box
	addBox(boxList);

	// should see box once added.
	const removeBtn = boxList.getByText('Remove');
	expect(removeBtn).toBeInTheDocument();
	expect(removeBtn.previousSibling).toHaveStyle(`
    width: 5em;
    height: 5em;
    background-color: green;
  `);
	// expect form to be empty
	expect(boxList.getAllByDisplayValue('')).toHaveLength(3);
});

it('can remove a box', function() {
	// render the BoxList and add a box
	const boxList = render(<BoxList />);
	addBox(boxList);

	// select the remove button
	const removeBtn = boxList.getByText('Remove');

	// once box is removed, shouldn't see a remove button anymore.
	fireEvent.click(removeBtn);
	expect(removeBtn).not.toBeInTheDocument();
});

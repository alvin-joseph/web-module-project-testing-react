import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from '../Display';

import { testShow } from './Show.test';

import fetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.

//2. Test that the Display component renders without any passed in props.
test("renders without error", ()=>{
    render(<Display/>);
});

//3. Rebuild or copy a show test data element as used in the previous set of tests.


//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
test("when fetch button is pressed, the show component will display", async ()=>{
    render(<Display/>);
    fetchShow.mockResolvedValueOnce(testShow);
    
    const button = screen.getByRole("button");
    //console.log(button);
    userEvent.click(button);
    
    
    const showComponent = await screen.findByTestId("show-container");
    expect(showComponent).toBeInTheDocument();
});

//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
test("when fetch button is pressed, the amount of select options rendered is equal to amount to seasons", async ()=>{
    // render(<Display/>);

    // const button = screen.getByRole("button");
    // //console.log(button);
    // userEvent.click(button);
    
    // const seasons = await screen.findAllByTestId('season-option');
    // expect(seasons).toHaveLength(4);
});

//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
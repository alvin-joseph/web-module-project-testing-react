import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

//1. Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
export const testShow = {
    //add in approprate test data structure here.
    name: "",
    summary: "",
    seasons: [
        {
            id: 1,
            name: "Season 1",
            episodes: []
        },
        {
            id: 2,
            name: "Season 2",
            episodes: []
        }

    ]
}

//2. Test that the Show component renders when your test data is passed in through show and "none" is passed in through selectedSeason.
test('renders testShow and no selected Season without errors', ()=>{
    render(<Show show={testShow} selectedSeason="none" />);
});

//3. Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existance)
test('renders Loading component when prop show is null', () => {
    render(<Show show={null}/>);

    const loading = screen.queryByTestId("loading-container");
    //console.log(loading);

    expect(loading).toBeInTheDocument();
    expect(loading).toBeTruthy();
    expect(loading).not.toBeNull();
});

//4. Test that when your test data is passed through the show prop, the same number of season select options appears as there are seasons in your test data.
test('renders same number of options seasons are passed in', ()=>{
    render(<Show show={testShow} selectedSeason="none" />);

    const seasonOptions = screen.queryAllByTestId("season-option")

    expect(seasonOptions).toHaveLength(2);
});

//5. Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select Dom element and userEvent reference materials to see how to trigger a selection.
test('handleSelect is called when an season is selected', () => {
    const fakeHandle = jest.fn();

    render(<Show handleSelect={fakeHandle} show={testShow} selectedSeason="none" />);

    const select = screen.queryByLabelText(/Select A Season/i);
    const seasons = screen.queryAllByTestId('season-option');
    //console.log(select);
    userEvent.selectOptions(select, seasons[1]);

    expect(fakeHandle.mock.calls.length).toBe(1);
    expect(fakeHandle.mock.calls.length === 1).toBeTruthy();
    expect(fakeHandle.mock.calls).toHaveLength(1);
    expect(fakeHandle).toBeCalledTimes(1);

    //you can get regular dom elements
    //const button3 = document.getElementById("btn");
    //userEvent.click(button3);
    //const text = document.querySelector("#target_text").className //find by id then see the class associated
    //expect(text).toBe("selected");

    //within
    //const div1 = document.getElementById("div1");
    // import {within} from '@testing-library/dom'
    //npm i @testing/library-dom
    //const button = within(div1).getByRole("button"); a button w/in a div

});

//6. Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.
test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } = render(<Show show={testShow} selectedSeason="none" />);
    let episode = screen.queryByTestId("episodes-container");
    //console.log(select);
    expect(episode).not.toBeInTheDocument();

    rerender(<Show show={testShow} selectedSeason="1" />);
    episode = screen.getByTestId("episodes-container");
    expect(episode).toBeInTheDocument();
    //console.log(episode);
});
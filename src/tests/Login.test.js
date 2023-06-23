import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

describe('Test the <Login.js /> page', () => {
    it('Should have the necessary elements', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const nameInput = screen.getByTestId('input-player-name');
        const emailInput = screen.getByTestId('input-gravatar-email');
        const playButton = screen.getByTestId('btn-play');
        const settingsButton = screen.getByTestId('btn-settings');

        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(playButton).toBeInTheDocument();
        expect(settingsButton).toBeInTheDocument();
        expect(history.location.pathname).toBe('/');
    });
    it('The button "Play" is disabled if the input name is empty',async () => {
        renderWithRouterAndRedux(<App />);

        const nameInput = screen.getByTestId('input-player-name');
        const emailInput = screen.getByTestId('input-gravatar-email');
        const playButton = screen.getByTestId('btn-play');

        expect(playButton).toBeDisabled();
        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();

        userEvent.type(nameInput, 'Test');
        userEvent.type(emailInput, 'jaguara@gmail.com');

        expect(playButton).toBeEnabled();

        userEvent.click(playButton);
        setInterval(() => {
            expect(history.location.pathname).toBe('/gameScreen');
        }, 2000);


          });
    it('The token is saved in localStorage and the user is forwarded to the Game page',  () => {
        const { history } = renderWithRouterAndRedux(<App />);

        setInterval(() => {
            expect(localStorage.getItem('token')).not.toBeNull();
        }, 2100);
    });
    it('The button "Settings" is working', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const settingsButton = screen.getByTestId('btn-settings');

        userEvent.click(settingsButton);

        expect(history.location.pathname).toBe('/settings');
    });
});
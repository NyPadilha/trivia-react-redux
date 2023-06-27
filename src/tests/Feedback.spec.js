import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../helpers/renderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';

describe('Feedback page', () => {
    it('should render the Feedback page', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        act(() => {
            history.push('/feedback');
        })
        
        const img = screen.getByRole('img')
        const msg = screen.getByTestId('feedback-text')
        const total = screen.getByTestId('feedback-total-score')
        const assertions = screen.getByTestId('feedback-total-question')
        const btnPlayAgain = screen.getByTestId('btn-play-again')
        const btnRanking = screen.getByTestId('btn-ranking')

        expect(img).toBeInTheDocument();
        expect(msg).toBeInTheDocument();
        expect(total).toBeInTheDocument();
        expect(assertions).toBeInTheDocument();
        expect(btnPlayAgain).toBeInTheDocument();
        expect(btnRanking).toBeInTheDocument();
    });
    it('should redirect to the Ranking page when the Ranking button is clicked', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        act(() => {
            history.push('/feedback');
        })
        const btnRanking = screen.getByTestId('btn-ranking')
        userEvent.click(btnRanking)
        expect(history.location.pathname).toBe('/ranking');
    });
    it('should redirect to the Home page when the Play Again button is clicked', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        act(() => {
            history.push('/feedback');
        })
        const btnPlayAgain = screen.getByTestId('btn-play-again')
        userEvent.click(btnPlayAgain)
        expect(history.location.pathname).toBe('/');
    });
});
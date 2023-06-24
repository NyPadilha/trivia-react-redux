import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';
import { screen } from '@testing-library/react';

describe('Test the <Ranking.js /> page', () => {
    it('Should have the necessary elements', () => {
        const { history } = renderWithRouterAndRedux(<Ranking />);

        const rankingTitle = screen.getByTestId('ranking-title');
        const goHomeButton = screen.getByTestId('btn-go-home');

        expect(rankingTitle).toBeInTheDocument();
        expect(goHomeButton).toBeInTheDocument();
    });
    it('The button "Voltar" is working', () => {
        const { history } = renderWithRouterAndRedux(<Ranking />);

        const goHomeButton = screen.getByTestId('btn-go-home');

        userEvent.click(goHomeButton);

        expect(history.location.pathname).toBe('/');
    });
})
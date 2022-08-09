import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';


describe('tela login', () => { 
  test('teste pagina login', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    
    const email = screen.getByTestId('input-gravatar-email');
    const name = screen.getByTestId('input-player-name');
    const buttonPlay = screen.getByRole('button', { name: 'Play' });
    
    expect(email).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(buttonPlay).toBeDisabled();
    
    userEvent.type(email,'jao@jao');
    expect(buttonPlay).toBeDisabled();
    userEvent.type(name,'jao');
    expect(buttonPlay).toBeEnabled();

    userEvent.click(buttonPlay);
    await waitForElementToBeRemoved(() => screen.queryByText('Play'))
    const { pathname } = history.location;
    // console.log(history);
    expect(pathname).toBe('/game');

  });
  test('button config', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const btnConfig = screen.getByTestId('btn-settings');
    expect(btnConfig).toBeInTheDocument();
    userEvent.click(btnConfig)
    const { pathname } = history.location;
    
    expect(pathname).toBe('/settings');
    
  })
})
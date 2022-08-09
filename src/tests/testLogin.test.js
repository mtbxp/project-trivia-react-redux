import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const tokenResponse = {
  "response_code":0,
  "response_message":"Token Generated Successfully!",
  "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
};

describe('tela login', () => { 
  test('teste pagina login', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(tokenResponse),
    })

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
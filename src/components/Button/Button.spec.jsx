import { render, screen } from '@testing-library/react';
import { Button } from '.';
import userEvent from '@testing-library/user-event';

// query = não levanta um erro se ele não encontrar o elemento
// get = levanta erro caso não tenha o elemento na tela
// find =

describe('<Button />', () => {
  it('should render the button with the text "Load more"', () => {
    const fn = jest.fn();
    render(<Button name={'Load more posts'} disabled={false} onClick={fn} />);

    expect.assertions(1);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeInTheDocument();
  });

  it('should call a function when clicking the button', () => {
    const fn = jest.fn();

    render(<Button name={'Load more posts'} disabled={false} onClick={fn} />);

    expect.assertions(1);

    const button = screen.getByRole('button', { name: /load more/i });

    userEvent.click(button);
    // fireEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    const fn = jest.fn();
    render(<Button name={'Load more posts'} disabled={true} onClick={fn} />);

    expect.assertions(1);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeDisabled();
  });

  it('should be enabled when disabled is false', () => {
    const fn = jest.fn();
    render(<Button name={'Load more posts'} disabled={false} onClick={fn} />);

    expect.assertions(1);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeEnabled();
  });

  // Snapshot

  it('should match snapshot', () => {
    const fn = jest.fn();
    const container = render(<Button name={'Load more posts'} disabled={true} onClick={fn} />).container;
    const { firstChild } = container;

    expect(firstChild).toMatchSnapshot();
  });
});

import { render, screen } from '@testing-library/react';
import { TextInput } from '.';
import userEvent from '@testing-library/user-event';

describe('<TextInput />', () => {
  it('should a value of searchValue', () => {
    const fn = jest.fn();
    render(<TextInput searchValue={'test'} placeholder={'Search for something'} handleChange={fn} />);

    expect.assertions(1);

    const input = screen.getByPlaceholderText(/Search for something/i);

    expect(input.value).toBe('test');
  });

  it('should call handleChage function on each key pressed', () => {
    let fn = jest.fn();
    render(<TextInput placeholder={'Search for something'} handleChange={fn} searchValue={'value'} />);

    expect.assertions(2);

    const input = screen.getByPlaceholderText(/Search for something/i);

    const value = 'o valor';

    userEvent.type(input, 'o valor');

    expect(input.value).toBe('value');
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  // Snapshot

  it('should match snapshot', () => {
    const container = render(
      <TextInput searchValue={'test'} placeholder={'Search for something'} handleChange={() => {}} />,
    ).container;
    const { firstChild } = container;

    expect(firstChild).toMatchSnapshot();
  });
});

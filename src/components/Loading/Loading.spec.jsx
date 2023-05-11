import { render, screen } from '@testing-library/react';
import { Loading } from '.';

describe('<Loading />', () => {
  it('should render Loading correctly non-centered', () => {
    render(<Loading center={false} />);

    expect.assertions(1);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render Loading correctly centered', () => {
    render(<Loading center={true} />);

    expect.assertions(1);

    expect(screen.getByText(/Loading/i)).toHaveAttribute('class', 'center');
  });

  // Snapshot

  it('should match snapshot', () => {
    const container = render(<Loading center={true} />).container;
    const { firstChild } = container;

    expect(firstChild).toMatchSnapshot();
  });
});

import { render, screen } from '@testing-library/react';
import { NotFoundText } from '.';

describe('<NotFoundText />', () => {
  it('should render NotFoundText correctly non-centered', () => {
    render(<NotFoundText center={false} />);

    expect.assertions(1);

    expect(screen.getByText(/Nenhum post encontrado!!/i)).toBeInTheDocument();
  });

  it('should render NotFoundText correctly centered', () => {
    render(<NotFoundText center={true} />);

    expect.assertions(1);

    expect(screen.getByText(/Nenhum post encontrado!!/i)).toHaveAttribute('class', 'center');
  });

  // Snapshot

  it('should match snapshot', () => {
    const container = render(<NotFoundText center={true} />).container;
    const { firstChild } = container;

    expect(firstChild).toMatchSnapshot();
  });
});

import { render, screen } from '@testing-library/react';
import { Posts } from '.';
import { postsPropsMock } from './mock';

describe('<Post />', () => {
  it('should render posts', () => {
    render(<Posts posts={postsPropsMock} />);

    expect.assertions(3);

    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(postsPropsMock.length);
    expect(screen.getAllByAltText(/title/i)).toHaveLength(postsPropsMock.length);
    expect(screen.getAllByText(/body/i)).toHaveLength(postsPropsMock.length);
  });

  it('should non render posts', () => {
    render(<Posts />);

    expect.assertions(1);

    expect(screen.queryByRole('heading', { name: /title/i })).not.toBeInTheDocument();
  });

  // Snapshot

  it('should match snapshot', () => {
    const container = render(<Posts posts={postsPropsMock} />).container;
    const { firstChild } = container;

    expect(firstChild).toMatchSnapshot();
  });
});

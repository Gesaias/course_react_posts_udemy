import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { act, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          userId: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1.jpg',
        },
        {
          id: 2,
          userId: 1,
          title: 'title2',
          body: 'body2',
          url: 'img2.jpg',
        },
        {
          id: 3,
          userId: 1,
          title: 'title3',
          body: 'body3',
          url: 'img3.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render "search", "posts" and "load more posts"', async () => {
    render(<Home />);

    expect.assertions(3);

    const loading = screen.getByText('Loading...');

    await waitForElementToBeRemoved(loading);

    const search = screen.getByPlaceholderText(/Type your post.../i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(2);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);

    expect.assertions(12);

    const loading = screen.getByText('Loading...');

    await waitForElementToBeRemoved(loading);

    const search = screen.getByPlaceholderText(/Type your post/i);

    expect(screen.getByRole('heading', { name: /title1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title2/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title3/i })).not.toBeInTheDocument();

    act(() => {
      userEvent.type(search, 'title1');
    });
    expect(screen.getByRole('heading', { name: /Title: title1/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Title: title2/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Title: title3/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Search value: title1/i })).toBeInTheDocument();

    act(() => {
      userEvent.clear(search);
    });
    expect(screen.getByRole('heading', { name: /title1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title2/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title3/i })).not.toBeInTheDocument();

    act(() => {
      userEvent.type(search, 'test');
    });
    expect(screen.queryByRole('heading', { name: /Title: title1/i })).not.toBeInTheDocument();
    expect(screen.getByText(/Nenhum post encontrado!!/i)).toBeInTheDocument();
  });

  it('should load more posts with button', async () => {
    render(<Home />);

    expect.assertions(2);

    const loading = screen.getByText('Loading...');

    await waitForElementToBeRemoved(loading);

    const button = screen.getByRole('button', { name: /load more posts/i });

    act(() => {
      userEvent.click(button);
    });
    expect(screen.getByRole('heading', { name: /title3/i })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});

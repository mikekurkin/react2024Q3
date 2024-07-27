import { screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import SearchResults from '../components/SearchResults/SearchResults';
import { handlers } from './utils/handlers';
import { renderWithStore } from './utils/store';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('SearchResults', () => {
  it('should display loader while fetching', async () => {
    const { container } = renderWithStore(<SearchResults />);

    expect(container.querySelector('.loader')).toBeInTheDocument();
    expect(container.querySelectorAll('.character-card')).toHaveLength(0);
  });

  it('should display results after finished loading', async () => {
    const { container } = renderWithStore(<SearchResults />);

    expect(await screen.findByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(container.querySelector('.loader')).not.toBeInTheDocument();
    expect(container.querySelectorAll('.character-card')).toHaveLength(10);

    expect(container.querySelectorAll('.paginator-page')).toHaveLength(9);
    expect(container.querySelector('.paginator-page.active')).not.toBeNull();
    expect(container.querySelector('.paginator-page.active')).toHaveTextContent('1');
  });
});

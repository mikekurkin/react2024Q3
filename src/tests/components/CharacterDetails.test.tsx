import { fireEvent, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import SearchResults from '../../components/SearchResults/SearchResults';
import { handlers } from '../utils/handlers';
import { renderWithStore } from '../utils/store';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CharacterDetails', () => {
  it('should show details when clicking on card', async () => {
    const [{ container }] = renderWithStore(<SearchResults />);

    const card = await screen.findByText(/Luke Skywalker/i);
    expect(container.querySelector('.loader')).not.toBeInTheDocument();

    fireEvent(
      card,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(container.querySelector('.character-details')).toBeInTheDocument();
    expect(container.querySelector('.loader')).toBeInTheDocument();

    expect(await screen.findByText(/Alderaan/i)).toBeInTheDocument();
    expect(container.querySelector('.loader')).not.toBeInTheDocument();

    const closeButton = container.querySelector('.character-details .close-button');
    expect(closeButton).not.toBeNull();
    fireEvent(closeButton!, new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(container.querySelector('.character-details')).not.toBeInTheDocument();
  });
});

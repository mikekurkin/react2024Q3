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

describe('SearchResults', () => {
  it('should display loader while fetching', async () => {
    const [{ container }] = renderWithStore(<SearchResults />);

    expect(container.querySelector('.loader')).toBeInTheDocument();
    expect(container.querySelectorAll('.character-card')).toHaveLength(0);
  });

  it('should display results after finished loading', async () => {
    const [{ container }] = renderWithStore(<SearchResults />);

    expect(await screen.findByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(container.querySelector('.loader')).not.toBeInTheDocument();
    expect(container.querySelectorAll('.character-card')).toHaveLength(10);

    expect(container.querySelectorAll('.paginator-page')).toHaveLength(9);
    expect(container.querySelector('.paginator-page.active')).not.toBeNull();
    expect(container.querySelector('.paginator-page.active')).toHaveTextContent('1');
  });

  it('should update selection in store and show count in flyout', async () => {
    const [{ container }, store] = renderWithStore(<SearchResults />);

    expect(await screen.findByText(/Luke Skywalker/i)).toBeInTheDocument();
    const checkboxes = container.querySelectorAll('.selection-checkbox');
    expect(checkboxes).toHaveLength(10);

    expect(container.querySelector('.selection-flyout')).toBeNull();
    expect(store.getState().selectedItems.selectionRecords).toHaveLength(0);

    [1, 3, 5].forEach((key, index) => {
      expect(checkboxes[key]).not.toBeNull();
      fireEvent(checkboxes[key], new MouseEvent('click', { bubbles: true, cancelable: true }));

      expect(store.getState().selectedItems.selectionRecords).toHaveLength(index + 1);
      expect(screen.getByText(new RegExp(index + 1 + ' items? selected', 'i'))).toBeInTheDocument();
    });

    fireEvent(checkboxes[3], new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(store.getState().selectedItems.selectionRecords).toHaveLength(2);

    const deselect = screen.getByText('Deselect All');
    expect(deselect).toBeInTheDocument();

    fireEvent(deselect, new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(container.querySelector('.selection-flyout')).toBeNull();
    expect(store.getState().selectedItems.selectionRecords).toHaveLength(0);
  });
});

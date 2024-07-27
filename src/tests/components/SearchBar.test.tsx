import { fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SearchBar from '../../components/SearchBar/SearchBar';
import { renderWithStore } from '../utils/store';

describe('SearchBar', () => {
  it('should display search bar with search button', async () => {
    const [{ container }] = renderWithStore(<SearchBar />);

    expect(container.querySelector('form input.form-control')).toBeInTheDocument();
    expect(container.querySelector('form button.form-control')).toBeInTheDocument();
  });

  it('should update search query in store after pressing search button', async () => {
    const [{ container }, store] = renderWithStore(<SearchBar />);

    const input = container.querySelector('form input.form-control');
    const button = container.querySelector('form button.form-control');
    expect(input).not.toBeNull();
    expect(button).not.toBeNull();

    const query = 'ABCqwe';
    fireEvent.change(input!, { target: { value: query } });
    expect(store.getState().searchBar.value).toBe(query);
    expect(store.getState().searchResults.query).toBe('');

    fireEvent(button!, new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(store.getState().searchResults.query).toBe(query);
  });
});

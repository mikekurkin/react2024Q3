import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import { useLocalStorage } from './hooks/useLocalStorage';
import { setValue } from './state/searchBar/searchBarSlice';
import { setDetails, setPage, setQuery } from './state/searchResults/searchResultsSlice';
import { RootState } from './state/store';

function App() {
  const [savedSearchTerm, setSavedSearchTerm] = useLocalStorage('searchTerm');
  const [searchParams, setSearchParams] = useSearchParams();

  const { query, page, details } = useSelector((state: RootState) => state.searchResults);
  const dispatch = useDispatch();

  useEffect(() => {
    const { q, p, details: d } = Object.fromEntries(searchParams.entries());
    if (d) dispatch(setDetails(parseInt(d)));
    if (p) dispatch(setPage(parseInt(p)));
    if (q) {
      dispatch(setValue(q));
      dispatch(setQuery(q));
    } else {
      dispatch(setQuery(savedSearchTerm));
      dispatch(setValue(savedSearchTerm));
    }
  }, []);

  useEffect(() => {
    setSearchParams((prev) => ({ ...Object.fromEntries(prev), p: page.toString() }));
  }, [page, setSearchParams]);

  useEffect(() => {
    setSearchParams((prev) => ({ ...Object.fromEntries(prev), q: query }));
  }, [query, setSearchParams]);

  useEffect(() => {
    setSearchParams((prev) => {
      if (details == null) {
        prev.delete('details');
        return prev;
      }
      return { ...Object.fromEntries(prev), details: details.toString() };
    });
  }, [details, setSearchParams]);

  return (
    <ErrorBoundary>
      <h1>Star Wars Characters</h1>
      <SearchBar
        onSearch={(newSearchTerm) => {
          dispatch(setQuery(newSearchTerm));
          setSavedSearchTerm(newSearchTerm);
        }}
      />
      <SearchResults />
    </ErrorBoundary>
  );
}

export default App;

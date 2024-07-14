import { useSearchParams } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [savedSearchTerm, setSavedSearchTerm] = useLocalStorage('searchTerm');
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <ErrorBoundary>
      <h1>Star Wars Characters</h1>
      <SearchBar
        searchTerm={searchParams.get('q') || savedSearchTerm}
        onSearch={(newSearchTerm) => {
          setSearchParams({ q: newSearchTerm });
          setSavedSearchTerm(newSearchTerm);
        }}
      />
      <SearchResults searchTerm={searchParams.get('q') || savedSearchTerm} />
    </ErrorBoundary>
  );
}

export default App;

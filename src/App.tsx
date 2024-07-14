import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm');

  return (
    <ErrorBoundary>
      <h1>Star Wars Characters</h1>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <SearchResults searchTerm={searchTerm} />
    </ErrorBoundary>
  );
}

export default App;

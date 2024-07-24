import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchBar from './components/SearchBar/SearchBar';
import ConnectSearchParams from './components/SearchParams/ConnectSearchParams';
import SearchResults from './components/SearchResults/SearchResults';

const App = () => {
  return (
    <ErrorBoundary>
      <h1>Star Wars Characters</h1>
      <SearchBar />
      <SearchResults />
      <ConnectSearchParams />
    </ErrorBoundary>
  );
};

export default App;

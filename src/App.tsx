import { useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';

function App() {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');

  return (
    <ErrorBoundary>
      <h1>Star Wars Characters</h1>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={(newSearchTerm) => {
          localStorage.setItem('searchTerm', newSearchTerm);
          setSearchTerm(newSearchTerm);
        }}
      />
      <SearchResults searchTerm={searchTerm} />
    </ErrorBoundary>
  );
}

export default App;

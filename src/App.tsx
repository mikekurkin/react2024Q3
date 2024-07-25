import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchBar from './components/SearchBar/SearchBar';
import ConnectSearchParams from './components/SearchParams/ConnectSearchParams';
import SearchResults from './components/SearchResults/SearchResults';

const App = () => {
  // document.body.classList.add('dark');
  /*
  This feels wrong, but no better solution exists as far as I know.
  Approved by a course coordinator:
  https://discord.com/channels/794806036506607647/1022905871753289782/1263158084818305135
  */

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

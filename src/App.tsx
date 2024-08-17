import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import LightSwitch from './components/LightSwitch/LightSwitch';
import SearchBar from './components/SearchBar/SearchBar';
import ConnectSearchParams from './components/SearchParams/ConnectSearchParams';
import SearchResults from './components/SearchResults/SearchResults';
import ThemeContext from './context/ThemeContext';
import { usePreferredTheme } from './hooks/usePreferredTheme';

const App = () => {
  const [theme, setTheme] = usePreferredTheme();

  /*
  This feels wrong, but no better solution exists as far as I know.
  Approved by a course coordinator:
  https://discord.com/channels/794806036506607647/1022905871753289782/1263158084818305135
  */
  if (theme === 'dark') {
    document.body.classList.add('dark');
  } else document.body.classList.remove('dark');

  return (
    <ErrorBoundary>
      <ThemeContext.Provider value={theme}>
        <LightSwitch onChange={setTheme} />
        <h1>Star Wars Characters</h1>
        <SearchBar />
        <SearchResults />
        <ConnectSearchParams />
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
};

export default App;

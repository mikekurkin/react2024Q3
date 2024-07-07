import { Component } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';

class App extends Component {
  state = {
    searchTerm: localStorage.getItem('searchTerm') || '',
  };

  render() {
    return (
      <ErrorBoundary>
        <h1>Star Wars Characters</h1>
        <SearchBar
          searchTerm={this.state.searchTerm}
          onSearch={(searchTerm) => {
            localStorage.setItem('searchTerm', searchTerm);
            this.setState({ searchTerm });
          }}
        />
        <SearchResults searchTerm={this.state.searchTerm} />
      </ErrorBoundary>
    );
  }
}

export default App;

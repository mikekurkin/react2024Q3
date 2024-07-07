import { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';

class App extends Component {
  state = {
    searchTerm: localStorage.getItem('searchTerm') || '',
  };

  render() {
    return (
      <>
        <SearchBar
          searchTerm={this.state.searchTerm}
          onSearch={(searchTerm) => {
            localStorage.setItem('searchTerm', searchTerm);
            this.setState({ searchTerm });
          }}
        />
        <SearchResults searchTerm={this.state.searchTerm} />
      </>
    );
  }
}

export default App;

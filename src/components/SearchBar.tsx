import { Component } from 'react';

type SearchBarProps = {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
};

class SearchBar extends Component<SearchBarProps> {
  state: { searchTerm: string } = {
    searchTerm: this.props.searchTerm,
  };

  render() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          this.props.onSearch(this.state.searchTerm);
        }}
      >
        <input
          className='form-control'
          value={this.state.searchTerm}
          onChange={(event) => {
            this.setState({ searchTerm: event.target.value });
          }}
        ></input>
        <button className='form-control'>Search</button>
      </form>
    );
  }
}

export default SearchBar;

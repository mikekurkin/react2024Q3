import { Component } from 'react';
import CharacterCard, { CharacterCardProps } from './CharacterCard';
import Loader from './Loader';

type SearchResultsProps = {
  searchTerm: string;
};

class SearchResults extends Component<SearchResultsProps> {
  state: { isLoading: boolean; characters: CharacterCardProps[] } = {
    isLoading: false,
    characters: [],
  };
  fetchData = async () => {
    this.setState({ isLoading: true });
    try {
      const response = await fetch(
        'https://swapi.dev/api/people/' + (this.props.searchTerm != '' ? `?search=${this.props.searchTerm.trim()}` : '')
      );
      const jsonResponse = await response.json();
      if (jsonResponse) {
        this.setState({ characters: jsonResponse.results });
      }
    } catch (e) {
      console.error(e);
    }
    this.setState({ isLoading: false });
  };

  componentDidUpdate(prevProps: SearchResultsProps) {
    if (this.props.searchTerm != prevProps.searchTerm) this.fetchData();
  }
  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div>
            {this.state.characters.map((character, index) => (
              <CharacterCard key={index} {...character} />
            ))}
          </div>
        )}
      </>
    );
  }
}

export default SearchResults;

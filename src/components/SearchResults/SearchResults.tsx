import { useEffect, useState } from 'react';
import api from '../../services/api/api';
import CharacterCard, { CharacterCardProps } from '../CharacterCard/CharacterCard';
import Loader from '../Loader/Loader';

type SearchResultsProps = {
  searchTerm: string;
};

function SearchResults(props: SearchResultsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState<CharacterCardProps[]>([]);

  useEffect(() => {
    setIsLoading(true);
    api.search<{ results: CharacterCardProps[] }>('people', props.searchTerm).then((json) => {
      setCharacters(json.results);
      setIsLoading(false);
    });
  }, [props.searchTerm]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {characters.map((character, index) => (
            <CharacterCard key={index} {...character} />
          ))}
        </div>
      )}
    </>
  );
}

export default SearchResults;

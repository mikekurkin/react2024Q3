import { useEffect, useState } from 'react';
import CharacterCard, { CharacterCardProps } from './CharacterCard';
import Loader from './Loader';

type SearchResultsProps = {
  searchTerm: string;
};

function SearchResults(props: SearchResultsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState<CharacterCardProps[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'https://swapi.dev/api/people/' + (props.searchTerm != '' ? `?search=${props.searchTerm.trim()}` : '')
        );
        const jsonResponse = await response.json();
        if (jsonResponse) {
          setCharacters(jsonResponse.results);
        }
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    })();
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

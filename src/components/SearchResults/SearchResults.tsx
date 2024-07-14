import { useEffect, useState } from 'react';
import api from '../../services/api/api';
import CharacterCard, { CharacterCardProps } from '../CharacterCard/CharacterCard';
import Loader from '../Loader/Loader';
import Paginator from '../Paginator/Paginator';

type SearchResultsProps = {
  searchTerm: string;
};

function SearchResults({ searchTerm = '' }: SearchResultsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState<CharacterCardProps[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchPage, setSearchPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    api.search<{ count: number; results: CharacterCardProps[] }>('people', searchTerm, searchPage).then((json) => {
      setCharacters(json.results);
      setTotalPages(Math.ceil(json.count / json.results.length) || 0);
      setIsLoading(false);
    });
  }, [searchTerm, searchPage]);

  useEffect(() => setSearchPage(1), [searchTerm]);

  return (
    <>
      <Paginator currentPage={searchPage} totalPages={totalPages} pageClickHandler={(page) => setSearchPage(page)} />
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

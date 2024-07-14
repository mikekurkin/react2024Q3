import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    api
      .search<{
        count: number;
        results: CharacterCardProps[];
      }>('people', searchTerm, parseInt(searchParams.get('p') || '') || 1)
      .then((json) => {
        setCharacters(json.results);
        setTotalPages(Math.ceil(json.count / 10) || 0);
        setIsLoading(false);
      });
  }, [searchTerm, searchParams]);

  return (
    <>
      <Paginator
        currentPage={parseInt(searchParams.get('p') || '') || 1}
        totalPages={totalPages}
        pageClickHandler={(page) => setSearchParams({ q: searchTerm, p: page.toString() })}
      />
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

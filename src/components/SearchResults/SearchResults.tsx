import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api/api';
import CharacterCard from '../CharacterCard/CharacterCard';
import CharacterDetails, { CharacterDetailsProps } from '../CharacterDetails/CharacterDetails';
import Loader from '../Loader/Loader';
import Paginator from '../Paginator/Paginator';

type SearchResultsProps = {
  searchTerm: string;
};

function SearchResults({ searchTerm }: SearchResultsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState<CharacterDetailsProps[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchPage, setSearchPage] = useState(parseInt(searchParams.get('p') || '') || 1);
  const [details, setDetails] = useState<number | null>(parseInt(searchParams.get('details') || '') || null);

  useEffect(() => {
    setIsLoading(true);
    api
      .search<{
        count: number;
        results: CharacterDetailsProps[];
      }>('people', searchTerm, searchPage)
      .then((json) => {
        setCharacters(json.results);
        setTotalPages(Math.ceil(json.count / 10) || 0);
        setIsLoading(false);
      });
  }, [searchTerm, searchPage]);

  useEffect(() => {
    setSearchParams((prev) => ({ ...Object.fromEntries(prev), p: searchPage.toString() }));
  }, [searchPage, setSearchParams]);

  useEffect(() => {
    setSearchParams((prev) => ({ ...Object.fromEntries(prev), q: searchTerm }));
  }, [searchTerm, setSearchParams]);

  useEffect(() => {
    setSearchParams((prev) => {
      if (details == null) {
        prev.delete('details');
        return prev;
      }
      return { ...Object.fromEntries(prev), details: details.toString() };
    });
  }, [details, setSearchParams]);

  return (
    <div className='flex flex-col'>
      <Paginator
        currentPage={searchPage}
        totalPages={totalPages}
        pageClickHandler={(page) => {
          setDetails(null);
          setSearchPage(page);
        }}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='flex flex-row'>
          <div className='flex-item'>
            {characters.map((character, index) => (
              <CharacterCard
                key={index}
                {...character}
                active={details != null && details == index}
                onClick={() => setDetails(details == index ? null : index)}
              />
            ))}
          </div>

          {details != null && !isLoading ? (
            <div className='flex-item'>
              <CharacterDetails {...characters[details]} closeDetails={() => setDetails(null)} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SearchResults;

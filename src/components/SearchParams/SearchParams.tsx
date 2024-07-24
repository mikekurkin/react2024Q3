import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setFromSearchString } from '../../state/searchResults/searchResultsSlice';

export interface SearchParamsProps {
  newSearchParams: string;
}

const SearchParams = ({ newSearchParams }: SearchParamsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFromSearchString(searchParams.toString()));
  }, [dispatch, searchParams]);

  useEffect(() => {
    setSearchParams(newSearchParams, { replace: true });
  }, [newSearchParams, setSearchParams]);

  return null;
};

export default SearchParams;

import { connect } from 'react-redux';
import { RootState } from '../../state/store';
import SearchParameters from './SearchParams';

function mapStateToProps(state: RootState) {
  const { query, page, details } = state.searchResults;
  const params = new URLSearchParams();
  if (query !== '') params.set('q', query);
  if (page > 1) params.set('p', page.toString());
  if (details !== null) params.set('details', details.toString());

  return { newSearchParams: params.toString() };
}

const ConnectSearchParams = connect(mapStateToProps)(SearchParameters);

export default ConnectSearchParams;

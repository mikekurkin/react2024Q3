import { useDispatch, useSelector } from 'react-redux';
import { Person } from '../../services/swApi/types';
import { setDetails } from '../../state/searchResults/searchResultsSlice';
import { RootState } from '../../state/store';
import './CharacterCard.css';

interface CharacterCardProps {
  index: number;
  character: Partial<Person>;
}

const CharacterCard = ({ index, character }: CharacterCardProps) => {
  const { details } = useSelector((state: RootState) => state.searchResults);
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(setDetails(details == index ? null : index))}
      className={details == index ? 'character-card active' : 'character-card'}
    >
      <h3 className='character-name'>{character.name}</h3>
      {character.gender}, born {character.birth_year}, eyes: {character.eye_color}, hair: {character.hair_color},
      height: {character.height ?? null}.
    </div>
  );
};

export default CharacterCard;

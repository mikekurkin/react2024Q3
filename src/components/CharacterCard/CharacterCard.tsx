import { useDispatch, useSelector } from 'react-redux';
import { Person } from '../../services/swApi/types';
import { setDetails } from '../../state/searchResults/searchResultsSlice';
import { addSelectedItem, delSelectedItem } from '../../state/selectedItems/selectedItemsSlice';
import { RootState } from '../../state/store';
import './CharacterCard.css';

interface CharacterCardProps {
  index: number;
  character: Person;
}

const CharacterCard = ({ index, character }: CharacterCardProps) => {
  const { page, details } = useSelector((state: RootState) => state.searchResults);
  const { selectionRecords } = useSelector((state: RootState) => state.selectedItems);
  const dispatch = useDispatch();

  const isSelected = selectionRecords.some((record) => record.page === page && record.index == index);
  const toggleSelection = isSelected
    ? () => dispatch(delSelectedItem({ page, index }))
    : () => dispatch(addSelectedItem({ page, index, person: character }));

  return (
    <div
      onClick={() => dispatch(setDetails(details == index ? null : index))}
      className={details == index ? 'character-card active' : 'character-card'}
    >
      <div className='flex flex-row'>
        <input
          type='checkbox'
          className='selection-checkbox'
          checked={isSelected}
          onClick={(e) => {
            toggleSelection();
            e.stopPropagation();
          }}
        />
        <div>
          <h3 className='character-name'>{character.name}</h3>
          {character.gender}, born {character.birth_year}, eyes: {character.eye_color}, hair: {character.hair_color},
          height: {character.height ?? null}.
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;

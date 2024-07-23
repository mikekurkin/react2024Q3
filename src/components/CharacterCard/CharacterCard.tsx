import { Person } from '../../services/swApi/types';
import './CharacterCard.css';

export type CharacterCardProps = {
  active: boolean;
  onClick: () => void;
  character: Partial<Person>;
};

function CharacterCard(props: CharacterCardProps) {
  return (
    <div onClick={props.onClick} className={props.active ? 'character-card active' : 'character-card'}>
      <h3 className='character-name'>{props.character.name}</h3>
      {props.character.gender}, born {props.character.birth_year}, eyes: {props.character.eye_color}, hair:{' '}
      {props.character.hair_color}, height: {props.character.height ?? null}.
    </div>
  );
}

export default CharacterCard;

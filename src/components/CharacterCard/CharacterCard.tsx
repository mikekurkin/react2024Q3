import './CharacterCard.css';

export type CharacterCardProps = {
  active: boolean;
  onClick: () => void;
  name: string;
  gender: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
  height: number;
};

function CharacterCard(props: CharacterCardProps) {
  return (
    <div onClick={props.onClick} className={props.active ? 'character-card active' : 'character-card'}>
      <h3 className='character-name'>{props.name}</h3>
      {props.gender}, born {props.birth_year}, eyes: {props.eye_color}, hair: {props.hair_color}, height: {props.height}
      .
    </div>
  );
}

export default CharacterCard;

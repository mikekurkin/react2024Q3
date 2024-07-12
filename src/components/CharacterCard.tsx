import './CharacterCard.css';

export type CharacterCardProps = {
  name: string;
  gender: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
  height: number;
};

function CharacterCard(props: CharacterCardProps) {
  return (
    <div className='character-card'>
      <h3>{props.name}</h3>
      {props.gender}, born {props.birth_year}, eyes: {props.eye_color}, hair: {props.hair_color}, height: {props.height}
      .
    </div>
  );
}

export default CharacterCard;

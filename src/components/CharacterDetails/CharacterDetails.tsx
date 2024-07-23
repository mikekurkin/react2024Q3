import { swApi } from '../../services/swApi/sw';
import { Person } from '../../services/swApi/types';
import Loader from '../Loader/Loader';
import './CharacterDetails.css';

export type CharacterDetailsProps = {
  closeDetails: () => void;
  character: Person;
};

function CharacterDetails(props: CharacterDetailsProps) {
  const { data: homeworldDetails, isFetching } = swApi.useGetPlanetQuery(props.character.homeworld);

  return (
    <div className='character-details flex-item'>
      <div className='close-button' onClick={props.closeDetails} />
      <h2>{props.character.name}</h2>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          Gender: {props.character.gender}
          <br />
          Born {props.character.birth_year}
          <br />
          Eyes: {props.character.eye_color}
          <br />
          Hair: {props.character.hair_color}
          <br />
          Height: {props.character.height}
          <br />
          {!homeworldDetails ? null : (
            <>
              <h3>Homeworld:</h3>
              <h4>{homeworldDetails.name}</h4>
              Diameter: {homeworldDetails.diameter}
              <br />
              Climate: {homeworldDetails.climate}
              <br />
              Gravity: {homeworldDetails.gravity}
              <br />
              Terrain: {homeworldDetails.terrain}
              <br />
              Population: {homeworldDetails.population}
              <br />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default CharacterDetails;

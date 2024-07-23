import { useDispatch } from 'react-redux';
import { swApi } from '../../services/swApi/sw';
import { Person } from '../../services/swApi/types';
import { setDetails } from '../../state/searchResults/searchResultsSlice';
import Loader from '../Loader/Loader';
import './CharacterDetails.css';

interface CharacterDetailsProps {
  character: Person;
}

const CharacterDetails = ({ character }: CharacterDetailsProps) => {
  const dispatch = useDispatch();

  const { isFetching, data: planet } = swApi.useGetPlanetQuery(character.homeworld);

  return (
    <div className='character-details flex-item'>
      <div className='close-button' onClick={() => dispatch(setDetails(null))} />
      <h2>{character.name}</h2>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          Gender: {character.gender}
          <br />
          Born {character.birth_year}
          <br />
          Eyes: {character.eye_color}
          <br />
          Hair: {character.hair_color}
          <br />
          Height: {character.height}
          <br />
          {!planet ? null : (
            <>
              <h3>Homeworld:</h3>
              <h4>{planet.name}</h4>
              Diameter: {planet.diameter}
              <br />
              Climate: {planet.climate}
              <br />
              Gravity: {planet.gravity}
              <br />
              Terrain: {planet.terrain}
              <br />
              Population: {planet.population}
              <br />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CharacterDetails;

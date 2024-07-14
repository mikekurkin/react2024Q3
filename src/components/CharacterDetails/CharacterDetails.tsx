import { useEffect, useState } from 'react';
import api from '../../services/api/api';
import Loader from '../Loader/Loader';
import './CharacterDetails.css';

export type CharacterDetailsProps = {
  name: string;
  gender: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
  height: number;
  homeworld: string;
  films: string[];
  starships: string[];
};

type HomeworldDetails = {
  name: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  population: string;
};

type FilmDetails = {
  title: string;
  episode_id: number;
  release_date: string;
};

type StarshipDetails = {
  name: string;
  manufacturer: string;
  length: string;
  crew: string;
  passengers: string;
};

function CharacterDetails(props: CharacterDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [homeworldDetails, setHomeworldDetails] = useState<HomeworldDetails>();
  const [filmsDetails, setFilmsDetails] = useState<FilmDetails[]>([]);
  const [starshipsDetails, setStarshipsDetails] = useState<StarshipDetails[]>([]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      api.url<HomeworldDetails>(props.homeworld).then((json) => {
        setHomeworldDetails(json);
      }),
      Promise.all((props.films ?? []).map((film) => api.url<FilmDetails>(film))).then((results) => {
        setFilmsDetails(results);
      }),
      Promise.all((props.starships ?? []).map((starship) => api.url<StarshipDetails>(starship))).then((results) => {
        setStarshipsDetails(results);
      }),
    ]).then(() => setIsLoading(false));
  }, [props.homeworld, props.films, props.starships]);

  return (
    <div className='character-details'>
      <h2>{props.name}</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          Gender: {props.gender}
          <br />
          Born {props.birth_year}
          <br />
          Eyes: {props.eye_color}
          <br />
          Hair: {props.hair_color}
          <br />
          Height: {props.height}
          <br />
          <h3>Homeworld:</h3>
          <h4>{homeworldDetails?.name}</h4>
          Diameter: {homeworldDetails?.diameter}
          <br />
          Climate: {homeworldDetails?.climate}
          <br />
          Gravity: {homeworldDetails?.gravity}
          <br />
          Terrain: {homeworldDetails?.terrain}
          <br />
          Population: {homeworldDetails?.population}
          <br />
          <h3>Starships:</h3>
          {starshipsDetails.map((starship, index) => (
            <div key={index}>
              <h4>{starship.name}</h4>
              Manufacturer: {starship.manufacturer} <br />
              Length: {starship.length} <br />
              Crew: {starship.crew} <br />
              Passengers: {starship.passengers} <br />
            </div>
          ))}
          <h3>Films:</h3>
          {filmsDetails.map((film, index) => (
            <div key={index}>
              <h4>{film.title}</h4>
              Episode {film.episode_id} <br />
              Released: {film.release_date} <br />
            </div>
          ))}
          <br />
        </>
      )}
    </div>
  );
}

export default CharacterDetails;

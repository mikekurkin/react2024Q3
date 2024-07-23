export interface SearchArguments {
  search: string;
  page: number;
}

export interface ListResponse<T> {
  count: number;
  next: URL;
  previous: URL;
  results: T[];
}

export interface Person {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: URL;
  films: URL[];
  species: URL[];
  vehicles: URL[];
  starships: URL[];
  created: Date;
  edited: Date;
  url: URL;
}

export interface Planet {
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: number;
  population: number;
  residents: URL[];
  films: URL[];
  created: Date;
  edited: Date;
  url: URL;
}

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: URL[];
  planets: URL[];
  starships: URL[];
  vehicles: URL[];
  species: URL[];
  created: Date;
  edited: Date;
  url: URL;
}

export interface Starships {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: number;
  length: number;
  max_atmosphering_speed: number;
  crew: number;
  passengers: number;
  cargo_capacity: number;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: number;
  starship_class: string;
  pilots: URL[];
  films: URL[];
  created: Date;
  edited: Date;
  url: URL;
}

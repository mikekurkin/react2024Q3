import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ListResponse, Person, Planet, SearchArguments } from './types';

export const swApi = createApi({
  reducerPath: 'swApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    searchPeople: builder.query<ListResponse<Person>, SearchArguments>({
      query: ({ search, page }) => `people?search=${search}&page=${page}`,
    }),
    getPerson: builder.query<Person, number | string>({
      query: (term) => {
        if (typeof term === 'number') return `people/${term}`;
        return term;
      },
    }),
    getPlanet: builder.query<Planet, number | string>({
      query: (term) => {
        if (typeof term === 'number') return `planets/${term}`;
        return term;
      },
    }),
  }),
});

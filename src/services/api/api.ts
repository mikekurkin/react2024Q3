const baseUrl = 'https://swapi.dev/api/';

async function search<T>(path: string, query: string, page: number = 1) {
  const params = new URLSearchParams({ search: query.trim(), page: page.toString() });
  const url = new URL(`${path}?${params.toString()}`, baseUrl);

  const response = await fetch(url);
  const jsonResponse = await response.json();
  return jsonResponse as T;
}

export default { search };

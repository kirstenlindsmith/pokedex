const POKEMON_URL =
  'https://tdsx0etnl0.execute-api.us-east-1.amazonaws.com/true/api/pokemon';

export interface Pokemon {
  Name: string,
  Total: string,
  HP: string,
  Attack: string,
  Defense: string,
  "Sp. Atk": string,
  "Sp. Def": string,
  Speed: string,
  Generation: string,
  Legendary: string, //boolean
  id: string,
  Types: string[],
}

export const fetchPokemon: () => Promise<Pokemon[]> = async () => {
  const response = await fetch(POKEMON_URL);
  const pokemon = await response.json();
  return pokemon;
};

export enum colorValues {
  fire = '#da6b6b',
  water = '#82caf3',
  grass = '#ADEFA7',
  poison = '#9973be',
  dragon = '#e7b87d',
  default = '#db8dce'
}
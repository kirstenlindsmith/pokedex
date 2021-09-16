import React from 'react';
import PokemonTable from './PokemonTable';
import PokemonSearch from './PokemonSearch';
import {fetchPokemon} from '../helpers/functions';
import {Pokemon, colorValues} from '../helpers/types'
import styled from '@emotion/styled';

const Page = styled.div`
margin: 30px auto;
width: 80%;
@media (max-width: 768px) {
  margin: 10vh auto;
  width: 100%;
}
`

const Row = styled.div`
display: flex;
position: relative;
align-items: flex-end;
justify-content: space-between;
h1 {
  margin: 0;
  color: ${colorValues.gray};
}
h5 {
  margin: 0 0 3px 10px;
  color: ${colorValues.gray};
}
`

const Home = () => {
  const [loading, updateLoading] = React.useState(false);
  const [pokemonList, updatePokemonList] = React.useState<Pokemon[]>([]);
  const originalList = React.useRef(pokemonList);

  React.useEffect(() => {
    (async () => {
      updateLoading(true)
      const pokeResponse = await fetchPokemon();
      if (pokeResponse?.length) {
        updatePokemonList(pokeResponse);
        originalList.current = pokeResponse;
      }
      updateLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page className='container'>
      <Row>
        <Row>
          <h1>Pokedex</h1>
          <h5>Gotta catch'em all</h5>
        </Row>
      <PokemonSearch
        originalList={originalList.current}
        updatePokemonList={updatePokemonList}
        loading={{
          value: loading,
          update: updateLoading,
        }}
      />
        </Row>
      <PokemonTable pokemonList={pokemonList} loading={loading} />
    </Page>
  );
};

export default Home;
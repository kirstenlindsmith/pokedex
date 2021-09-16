import React from 'react';
import { Pokemon, colorValues } from '../../helpers/types';
import useDebounce from '../../hooks/useDebounce';
import styled from '@emotion/styled';

const SearchContainer = styled.div`
position: relative;
display: flex;
`

const Pokeball = styled.img`
height: 25px;
width: auto;
margin: 4px 10px 0 0;
`

const SearchInput = styled.input<{value?: string}>`
border-radius: 5px;
font-size: 16px;
padding: 5px;
margin-bottom: 4px;
border: 2px solid ${colorValues.dark};
`

interface Props {
  originalList: Pokemon[];
  updatePokemonList: (pokemonList: Pokemon[]) => void;
  loading: {
    value: boolean;
    update: (loading: boolean) => void;
  }
}

const PokemonSearch = ({ originalList, updatePokemonList, loading }: Props) => {
  const [searchInput, setSearchInput] = React.useState('');
  const debouncedSearchInput = useDebounce(searchInput, 500);

  const inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  React.useEffect(() => {
    loading.update(true);
    const newPokemonList = originalList.filter((pokemon) =>
        pokemon.Name?.toLowerCase().includes(debouncedSearchInput) ||
        pokemon.Types?.some((type) => type.toLowerCase().includes(debouncedSearchInput)) ||
        pokemon.id?.includes(debouncedSearchInput)
     );
    updatePokemonList(newPokemonList);
    loading.update(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchInput]);

  return (
    <SearchContainer>
      <Pokeball src='https://i.imgur.com/IM3YqWy.png' alt='pokeball'/>
      <SearchInput type='text' placeholder='Search Name, Type, ID' onChange={inputChangedHandler} value={searchInput} />
    </SearchContainer>
  );
};

export default PokemonSearch;

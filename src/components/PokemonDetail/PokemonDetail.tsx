import React from 'react';
import {Pokemon} from '../../helpers';
import { useLocation } from 'react-router';
import {TypeBubble} from '../PokemonTable/PokemonTable';
import styled from '@emotion/styled';

const Page = styled.div`
margin: 30px;
@media (max-width: 768px) {
  margin: 10vh auto;
}
`

const PokemonDetail = () => {
  const location = useLocation<{pokemon: Pokemon}>();
  const pokemon = location.state?.pokemon;

  const properties = Object.keys(pokemon);
  const values = Object.values(pokemon);

  return (
    <Page>
      <h1>{pokemon?.Name}</h1>
      <h2>Attributes</h2>
      {properties.map((property, i) => {
        if (property === 'Types') {
          return <p key={`${i}-types`}>Types: {values[i]?.map((type: any, i: number) => <TypeBubble key={`${i}-${type}`} type={type}>{type}</TypeBubble>)}</p>
        }
        return (property === 'Name' ? null :
        <p key={property}>{property}: {values[i]}</p>
      )})}
    </Page>
  );
};

export default PokemonDetail;

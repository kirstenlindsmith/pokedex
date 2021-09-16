import React from 'react';
import { Pokemon } from '../../helpers';
import { useHistory } from 'react-router';
import {createContrastingColor, darkenSlightly} from '../../helpers/functions';
import {colorValues} from '../../helpers/types';
import styled from '@emotion/styled';

const Container = styled.div`
display: flex;
flex-direction: column;
margin-top: 2vh;
`
const HeaderRow = styled.div`
display: flex;
font-weight: bold;
color: ${colorValues.gray};
margin-bottom: 2vh;
`
const ContentRow = styled.div`
display: flex;
align-items: center;
cursor: pointer;
border-radius: 5px;
margin: 5px 0;
padding: 5px;
background-color: ${colorValues.default};
color: ${colorValues.black};
&:hover {
  background-color: ${darkenSlightly(colorValues.default)};
}
`
const TableCell = styled.div<{width: number}>`
display: flex;
width: ${({width}) => width}%;
padding: 5px 10px;
`
const IdCell = ({children, ...rest}: {children: any}) => <TableCell width={10} {...rest}>{children}</TableCell>
const NameCell = ({children, ...rest}: {children: any}) => <TableCell width={45} {...rest}>{children}</TableCell>
const TypeCell = ({children, ...rest}: {children: any}) => <TableCell width={30} {...rest}>{children}</TableCell>
const TotalCell = ({children, ...rest}: {children: any}) => <TableCell width={15} {...rest}>{children}</TableCell>

export const TypeBubble = styled.span<{type?: string}>`
width: min-content;
padding: 5px 15px;
border-radius: 15px;
margin-right: 5px;
background-color: ${({type}) => type ? (colorValues as any)[type.toLowerCase()] : colorValues.default};
color: ${({type}) => createContrastingColor(type ? (colorValues as any)[type.toLowerCase()] : colorValues.default)};
`

interface Props {
  pokemonList: Pokemon[]
  loading: boolean;
}

const PokemonTable = ({ pokemonList, loading }: Props) => {
  const history = useHistory();
  return (
    <Container>
      <HeaderRow>
      <IdCell>ID</IdCell>
      <NameCell>Name</NameCell>
      <TypeCell>Type</TypeCell>
      <TotalCell>Total</TotalCell>
      </HeaderRow>
      {(pokemonList?.length && !loading) ? (
            <>
              {pokemonList.map((pokemon) => (
                <ContentRow
                  key={`pokemon-${pokemon?.id ?? Math.random()}-${
                    pokemon?.Name
                  }`}
                  onClick={() =>
                    history.push({
                      pathname: `/pokemon/${pokemon?.id ?? '0'}`,
                      state: { pokemon },
                    })
                  }
                >
                  <IdCell>{pokemon?.id ?? '-'}</IdCell>
                  <NameCell>{pokemon?.Name ?? '-'}</NameCell>
                  <TypeCell>{pokemon?.Types?.length ? (
                    <>
                    {pokemon?.Types.map((type) => (
                      <TypeBubble key={`${pokemon?.id}-${type}`} type={type}>{type}</TypeBubble>
                    ))}
                    </>
                  ) : '-'}</TypeCell>
                  <TotalCell>{pokemon?.Total ?? '-'}</TotalCell>
                </ContentRow>
              ))}
            </>
          ) : (
            <ContentRow>
              <TypeCell>
                <TypeBubble>
                  {/* using a TypeBubble keeps the row height consistent during loading/searching */}
                  {loading ? 'Loading...' : 'No results'}
                </TypeBubble>
              </TypeCell>
            </ContentRow>
          )}
    </Container>
  );
};

export default PokemonTable;

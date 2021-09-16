import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import PokemonDetail from './components/PokemonDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path='/pokemon/:id' exact>
        <PokemonDetail />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>
  );
}

export default App;

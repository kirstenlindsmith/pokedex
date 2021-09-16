## Pokedex

### Tasks

We hired a developer to create a Pokedex but it seems like they only did some parts and not the others. The goal is to finish the missing product requirements.

1. Fetch all pokemon from the `POKEMON_URL` endpoint. The endpoint has been provided in the helper.js file.
2. Display all the pokemon in a single table with just the first 3 attributes as columns.
3. Each row of the table should be clickable to open a card with more details of the individual pokemon, display the first 5 attributes in this format. Use `POKEMON_URL/pokemon/:id` for individual pokemon.Mock card screenshot to show: [Pokedex Figma design mockup](https://www.figma.com/file/Fy932MOfO9gPkoUdIgbj1Q/Untitled)
4. Have different card background colors depending on what type the pokemon is:
   - Fire - Orange
   - Water - Aqua
   - Dragon - Brown
   - Grass - Green
   - Poison - Black
   - All Other: Alloy-Green

### Bonus Tasks

1. Have a search bar at the top that allows you to search by name
2. Add some pagination (pageSize 10)
3. Add a few tests
4. How would you store media assets for this API and make the individual cards more dynamic?
5. Add a filter endpoint for all the fire pokemon and water pokemon and displays the cards
   `/pokemon?Types_like=Fire`
   and `/pokemon?Types_like=Water`
   TODO: add a few screenshots for expected behavior

_Note: If a Pokemon has more than 2 types: you can choose which background color to display._

**Pokemon Dataset:**

TODO: note server endpoints are on https and use
https://www.npmjs.com/package/json-server endpoints
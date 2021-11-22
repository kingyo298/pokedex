import {Route, Routes} from "react-router-dom";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Pokedex />}
      />
      <Route
        path="/:pokemonId"
        element={<Pokemon />}
      />
    </Routes>
  );
}

export default App;

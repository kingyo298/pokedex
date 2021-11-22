import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Typography,Link, CircularProgress, Button } from "@mui/material";
import { toFirstCharUpperCase } from "./constants";
import axios from "axios";
const Pokemon = (props) => {
  const params = useParams();
  const pokemonId = params.pokemonId;
  const [pokemon,setPokemon] = useState(undefined);
  let navigate = useNavigate();
  // 1. pokemon = undefined, that means we're getting the info
  // -> return loading progress
  // 2. pokemon = good data, that means we've gotten info
  // -> return actual info
  // 3. pokemon = false
  // -> return pokemon not found

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function(response){
        const {data} = response;
        setPokemon(data);
      })
      .catch(function(error){
        setPokemon(false);
      });
  },[pokemonId]);

  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
        <Typography variant="h1">
        {`${id}.`}{toFirstCharUpperCase(name)}
        <img src={front_default} />
        </Typography>
        <img style={{width: "300px", height: "300px" }} src={fullImageUrl}/>
        <Typography variant="h3">Pokemon Info</Typography>
        <Typography>
          {"Species: "}
          <Link href={species.url}>{species.name}</Link>
        </Typography>
        <Typography>Height: {height}</Typography>
        <Typography>Weight: {weight}</Typography>
        <Typography variant="h6">Types:</Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <Typography key={name}>{`${name}`}</Typography>;
        })}
      </>
    );
  }
  return (
    <>
    {pokemon === undefined && <CircularProgress />}
    {pokemon !== undefined && pokemon && generatePokemonJSX()}
    {pokemon !== undefined && (
      <Button variant="contained" onClick={() => {navigate("/")}}>
        back to pokedex
      </Button>
    )}
    </>
  );
}

export default Pokemon;

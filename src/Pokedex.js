import { useState,useEffect } from "react";
import { AppBar, Toolbar, Grid, Card, CardMedia, CardContent, CircularProgress, Typography, TextField} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from 'react-router-dom';
import { toFirstCharUpperCase } from "./constants";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';

const useStyle = makeStyles(() => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia : {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  searchContainer : {
    display: "flex",
    // backgroundColor: fade(theme.palette.common.white,0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
}));


const Pokedex = () => {
  const classes = useStyle();
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");
  let navigate = useNavigate();

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  }
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
      .then(function(response){
        const {data} = response;
        const {results} = data;
        const newPokemonData = {};
        results.forEach((pokemon,index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
          }
        });
        setPokemonData(newPokemonData);
      });
  },[]);

  const getPokemonCard = (pokemonId) => {
    console.log(pokemonData[`${pokemonId}`]);
    const { id, name, sprite } = pokemonData[`${pokemonId}`];
    return (
      <Grid item xs={4}>
        <Card onClick={() => {navigate(`/${pokemonId}`)}}>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{width: "130px", height: "130px"}}
          />
          <CardContent className={classes.cardContent}>
            <Typography>{`${id}. ${toFirstCharUpperCase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon}/>
            <TextField
              onChange={handleSearchChange}
              className={classes.searchInput}
              label="Pokemon"
              variant="standard"
            />
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map((pokemonId) =>
            pokemonData[pokemonId].name.includes(filter) &&
            getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default Pokedex;

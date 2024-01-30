import React, { useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import NavBar from "./components/NavBar";
import SelectedPoke from "./components/SelectedPoke";
import Filter from "./components/Filter";
import pokemonDataJSONFile from "./pokeData/PokeCard.json";
import Footer from "./components/Footer";
import PokeCardPagination from "./components/PokeCardPagination";

function App() {
  const [selectedPokemonYN, setSelectedPokemonYN] = useState(false);
  const [selectedPokeID, setSelectedPokeID] = useState(0);

  const [pokeData, setPokeData] = useState(pokemonDataJSONFile);

  const types = [
    ["normal", 1],
    ["fire", 1],
    ["water", 1],
    ["electric", 1],
    ["grass", 1],
    ["ice", 1],
    ["fighting", 1],
    ["poison", 1],
    ["ground", 1],
    ["flying", 1],
    ["psychic", 1],
    ["bug", 1],
    ["rock", 1],
    ["ghost", 1],
    ["dragon", 1],
    ["dark", 1],
    ["steel", 1],
    ["fairy", 1],
  ];
  const [activeTypes, setActiveTypes] = useState<any>(types);

  const [search, setSearch] = useState<String>("");

  const selectedPokemon = (id: number) => {
    setSelectedPokeID(id);
  };

  const [updatePokeQuery, setUpdatePokeQuery] = useState(false);
  const [updatePokeQueryBySearch, setUpdatePokeQueryBySearch] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar
        onSearch={setSearch}
        onSetQyeryBySearch={() => {
          setUpdatePokeQueryBySearch(true);
        }}
      />

      <div className="filter-container">
        <Filter
          onSetFilter={activeTypes}
          onSetActiveTypes={setActiveTypes}
          onUpdatePokeData={setPokeData}
          onPokeData={pokeData}
          onSearchByName={search}
          onSetUdatePokeCards={() => {
            setUpdatePokeQuery(true);
          }}
          onSetQyeryBySearch={() => {
            setUpdatePokeQueryBySearch(false);
          }}
          onSetQueryForSearch={updatePokeQueryBySearch}
        />
      </div>

      <div className="flex-container">
        <PokeCardPagination
          onOpen={() => {
            setSelectedPokemonYN(true);
          }}
          onSelectedPokemon={selectedPokemon}
          onSetPokeData={pokeData}
          onUpdatePokeCards={updatePokeQuery}
          onSetUdatePokeCards={() => {
            setUpdatePokeQuery(false);
          }}
        />
      </div>

      {selectedPokemonYN && (
        <SelectedPoke
          onClose={() => {
            setSelectedPokemonYN(false);
          }}
          onTheSelectedPokemon={selectedPokeID}
        />
      )}

      <div style={{ zIndex: "-1" }}>
        <Footer />
      </div>
    </div>
  );
}

export default App;

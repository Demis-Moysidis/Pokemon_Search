import React from "react";
import "../styles/Filter.css";
import { useState, useEffect } from "react";
import pokemonDataJSONFile from "../pokeData/PokeCard.json";

interface Props {
  onSetFilter: (string | number)[][];
  onSetActiveTypes: (list: (string | number)[][]) => void;
  onUpdatePokeData: (pokeList: any) => void;
  onPokeData: any[];
  onSearchByName: String;
  onSetUdatePokeCards: () => void;
  onSetQyeryBySearch: () => void;
  onSetQueryForSearch: boolean;
}

function Filter({
  onSetFilter,
  onSetActiveTypes,
  onUpdatePokeData,
  onPokeData,
  onSearchByName,
  onSetUdatePokeCards,
  onSetQyeryBySearch,
  onSetQueryForSearch,
}: Props) {
  const deactivatedOpacity = 0.3;

  /*Checks whether a type has been selected for the first time. Therefore this check is only valid once at the beginning*/
  const [checkIfFirstSelectedType, setcheckIfFirstSelectedType] =
    useState(true);

  const setActiveTypesList = (clickedItem: String) => {
    if (checkIfFirstSelectedType) {
      setcheckIfFirstSelectedType(false);
      setAllTypesToDeactive();
    }

    const clonedActiveTypes = [...onSetFilter];
    clonedActiveTypes.forEach((element: (string | number)[]) => {
      if (element[0] === clickedItem) {
        if (element[1] === 1) {
          element[1] = deactivatedOpacity;
        } else element[1] = 1;
      }
    });
    onSetActiveTypes(clonedActiveTypes);
  };

  const setAllTypesToActive = () => {
    const clonedActiveTypes = [...onSetFilter];

    clonedActiveTypes.forEach((element) => {
      element[1] = 1;
    });

    onSetActiveTypes(clonedActiveTypes);
  };

  const setAllTypesToDeactive = () => {
    const clonedActiveTypes = [...onSetFilter];

    clonedActiveTypes.forEach((element) => {
      element[1] = deactivatedOpacity;
    });

    onSetActiveTypes(clonedActiveTypes);
  };

  const setFilterListByType = (filterList: any) => {
    let selectedPoke: String[] = [];
    filterList.forEach((element: any) => {
      if (element[1] === 1) {
        selectedPoke.push(element[0]);
      }
    });
    return selectedPoke;
  };

  useEffect(() => {
    if (onSetQueryForSearch) {
      setPokeListByFilter(pokemonDataJSONFile, onSetFilter);
      onSetUdatePokeCards();
      onSetQyeryBySearch();
    }
  }, [onSetQueryForSearch]);

  const setPokeListByFilter = (pokemonData: any, filterList: any) => {
    const toUseFilterList = setFilterListByType(filterList);
    let selectedPoke: any[] = [];
    pokemonData.forEach((element: any) => {
      toUseFilterList.forEach((type: any) => {
        if (element.types[0] === type) {
          selectedPoke.push(element);
        } else if (element.types[0] === type) {
          selectedPoke.push(element);
        }
      });
    });

    const filteredPokeList = filterPokemonBySearch(selectedPoke);
    onUpdatePokeData(filteredPokeList);
  };

  const setPokeCount = () => {
    return filterPokemonBySearch(onPokeData).length;
  };

  const filterPokemonBySearch = (currentPokeList: any) => {
    return currentPokeList.filter((item: any) => {
      return onSearchByName.toLowerCase() === ""
        ? item
        : Number(onSearchByName) ||
          onSearchByName === "0" ||
          onSearchByName === "00" ||
          onSearchByName === "000"
        ? item.id.toString().padStart(4, "0").includes(onSearchByName)
        : item.name.toLowerCase().includes(onSearchByName.toLowerCase());
    });
  };

  return (
    <>
      <div>
        <div className="flex-container">
          <div>
            <h5>Type Filter</h5>
          </div>
          <div style={{ paddingRight: "10px" }}>
            <h6>Count of Pokemon: {setPokeCount()}</h6>
          </div>
        </div>

        <div className="type-filter-container">
          <button
            onClick={() => {
              setAllTypesToActive();
              setPokeListByFilter(pokemonDataJSONFile, onSetFilter);
              onSetUdatePokeCards();
            }}
            className="badge text-bg-success border-color-btn"
          >
            Activate All
          </button>
          <button
            onClick={() => {
              setAllTypesToDeactive();
              setPokeListByFilter(pokemonDataJSONFile, onSetFilter);
              onSetUdatePokeCards();
            }}
            className="badge text-bg-danger border-color-btn"
          >
            Deactivate All
          </button>
        </div>
        {onSetFilter.map((item: any) => {
          return (
            <button
              key={item[0]}
              className={"badge border-color-btn text-bg-" + item[0] + "PK"}
              style={{ opacity: item[1] }}
              onClick={() => {
                setActiveTypesList(item[0]);
                setPokeListByFilter(pokemonDataJSONFile, onSetFilter);
                onSetUdatePokeCards();
              }}
            >
              {item[0]}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Filter;

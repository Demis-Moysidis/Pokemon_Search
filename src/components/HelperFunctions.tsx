import React from "react";

export function setPokemonNumber(number: String) {
  if (number.length === 1) {
    return "000" + number;
  } else if (number.length === 2) {
    return "00" + number;
  } else if (number.length === 3) {
    return "0" + number;
  } else {
    return number;
  }
}

export function capitalizeFirstLetter(string: String) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function setColorOfType(type: String) {
  if (type === "normal") {
    return "text-bg-normalPK";
  }

  switch (type) {
    case "normal":
      return "text-bg-normalPK";
      break;
    case "fire":
      return "text-bg-firePK";
      break;
    case "water":
      return "text-bg-waterPK";
      break;
    case "electric":
      return "text-bg-electricPK";
      break;
    case "grass":
      return "text-bg-grassPK";
      break;
    case "ice":
      return "text-bg-icePK";
      break;
    case "fighting":
      return "text-bg-fightingPK";
      break;
    case "poison":
      return "text-bg-poisonPK";
      break;
    case "ground":
      return "text-bg-groundPK";
      break;
    case "flying":
      return "text-bg-flyingPK";
      break;
    case "psychic":
      return "text-bg-psychicPK";
      break;
    case "bug":
      return "text-bg-bugPK";
      break;
    case "rock":
      return "text-bg-rockPK";
      break;
    case "ghost":
      return "text-bg-ghostPK";
      break;
    case "dragon":
      return "text-bg-dragonPK";
      break;
    case "dark":
      return "text-bg-darkPK";
      break;
    case "steel":
      return "text-bg-steelPK";
      break;
    case "fairy":
      return "text-bg-fairyPK";
      break;
    default:
    //console.log("Kein Typ zum Anzeigen gefunden!", type);
  }
}

export function setPokemonZeros(number: String) {
  if (number.length === 1) {
    return "000";
  } else if (number.length === 2) {
    return "00";
  } else if (number.length === 3) {
    return "0";
  } else {
    return "";
  }
}

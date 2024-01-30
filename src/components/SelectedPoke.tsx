import { useState, useEffect } from "react";
import * as HelperFunction from "./HelperFunctions";
import "../styles/SelectedPoke.css";

interface Props {
  onClose: () => void;
  onTheSelectedPokemon: number;
}

const SelectedPoke = ({ onClose, onTheSelectedPokemon }: Props) => {
  const [pokeDataToUse, setPokeDataToUse] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchPokeData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${onTheSelectedPokemon}`
        );
        const pokeData = (await response.json()) as Props[];

        if (response.status === 200) {
          const sortedData: any = sortJsonData(pokeData);
          setPokeDataToUse(sortedData);
          setShow(true);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPokeData();
  }, []);

  function sortJsonData(jsonData: any) {
    const parameter = jsonData.types;
    let typesList = (parameter: any) => {
      let list = [];
      for (let i = 0; i < parameter.length; i++) {
        list.push(parameter[i].type.name);
      }
      return list;
    };

    let pokeObject = {
      id: jsonData.id,
      name: jsonData.name,
      order: jsonData.order,
      types: typesList(parameter),
      img: setImageToUse(jsonData),
      weight: jsonData.weight,
      height: jsonData.height,
    };
    return pokeObject;
  }

  function setImageToUse(img: any) {
    if (img.sprites.other["official-artwork"].front_default !== null) {
      return img.sprites.other["official-artwork"].front_default;
    } else if (img.sprites.other["official-artwork"].front_shiny !== null) {
      return img.sprites.other["official-artwork"].front_shiny;
    } else {
      return img.sprites.other.home.front_default;
    }
  }

  const setDescription = () => {
    if (pokeDataToUse.types.length === 2) {
      return (
        HelperFunction.capitalizeFirstLetter(pokeDataToUse.name) +
        " weights " +
        pokeDataToUse.weight / 10 +
        " kg and is " +
        pokeDataToUse.height / 10 +
        " m tall. " +
        "It has the types " +
        pokeDataToUse.types[0] +
        " and " +
        pokeDataToUse.types[1] +
        "."
      );
    } else {
      return (
        HelperFunction.capitalizeFirstLetter(pokeDataToUse.name) +
        " weights " +
        pokeDataToUse.weight / 10 +
        " kg and is " +
        pokeDataToUse.height / 10 +
        " m tall. " +
        "It has the type " +
        pokeDataToUse.types[0] +
        "."
      );
    }
  };

  return (
    <>
      {loading && (
        <div className="modalBackground">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="modalBackground">
          <div
            className="card shadow-container mb-3 card-color"
            style={{ maxWidth: "540px" }}
          >
            <div className="card-body" style={{ textAlign: "center" }}>
              <h5 className="card-title">Something went wrong.</h5>
              <h6>Please refresh the page!</h6>
            </div>
          </div>
        </div>
      )}

      {show && (
        <div className="modalBackground">
          <div
            className="card shadow-container mb-3"
            style={{ maxWidth: "540px" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={pokeDataToUse.img}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <div className="center-title-and-close-btn">
                    <h5 className="card-title">
                      {pokeDataToUse.name &&
                        HelperFunction.capitalizeFirstLetter(
                          pokeDataToUse.name
                        )}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={onClose}
                    ></button>
                  </div>
                  <div>
                    <span
                      className={
                        pokeDataToUse.types &&
                        "badge " +
                          HelperFunction.setColorOfType(pokeDataToUse.types[0])
                      }
                    >
                      {pokeDataToUse.types && pokeDataToUse.types[0]}
                    </span>
                    <span
                      className={
                        pokeDataToUse.types &&
                        "badge " +
                          HelperFunction.setColorOfType(pokeDataToUse.types[1])
                      }
                    >
                      {pokeDataToUse.types && pokeDataToUse.types[1]}
                    </span>
                  </div>
                  <p className="card-text">
                    {pokeDataToUse.types && setDescription()}
                  </p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      {pokeDataToUse.id &&
                        HelperFunction.setPokemonNumber(
                          String(pokeDataToUse.id)
                        )}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedPoke;

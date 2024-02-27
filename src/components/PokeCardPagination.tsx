import React from "react";
import { useEffect, useRef } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import pokemonDataJSONFile from "../pokeData/PokeCard.json";
import * as HelperFunction from "./HelperFunctions";
import "../styles/PokeCard.css";
import { useIntersection } from "@mantine/hooks";

interface OnePoke {
  id: number;
  name: string;
  order: number;
  types: string[];
  img: any;
  weight: number;
  height: number;
}

interface Props {
  onOpen: () => void;
  onSelectedPokemon: (id: number) => void;
  onSetPokeData: any[];
  onUpdatePokeCards: boolean;
  onSetUdatePokeCards: () => void;
}

const InfiniteList: React.FC<Props> = ({
  onOpen,
  onSelectedPokemon,
  onSetPokeData,
  onUpdatePokeCards,
  onSetUdatePokeCards,
}) => {
  const posts = onSetPokeData;
  const fetchItems = ({ pageParam = 1 }) => {
    return posts.slice((pageParam - 1) * 40, pageParam * 40);
  };

  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery("items", fetchItems, {
      getNextPageParam: (_, lastPage) => lastPage.length + 1,
    });

  useEffect(() => {
    if (onUpdatePokeCards) {
      handleReset();
    }
  }, [onUpdatePokeCards]);

  const handleReset = () => {
    refetch();
    onSetUdatePokeCards();
  };

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  const _posts = data?.pages.flatMap((page) => page);

  const setPokeCard = (item: OnePoke) => {
    return (
      <div
        onClick={() => {
          onOpen();
          onSelectedPokemon(item.id);
        }}
        key={item.id}
        className="card cardTrans"
        style={{ width: "10.2rem", maxHeight: "290px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "5px",
          }}
        >
          <p className="card-text">
            {HelperFunction.setPokemonNumber(String(item.id))}
          </p>
        </div>
        <img src={item.img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: "18px" }}>
            {HelperFunction.capitalizeFirstLetter(item.name)}
          </h5>
          <span
            className={"badge " + HelperFunction.setColorOfType(item.types[0])}
          >
            {item.types[0]}
          </span>
          <span
            className={"badge " + HelperFunction.setColorOfType(item.types[1])}
          >
            {item.types[1]}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="card-container">
        {_posts?.map((item: OnePoke, index) => {
          if (index === _posts.length - 1)
            return (
              <div key={item.id} ref={ref}>
                {setPokeCard(item)}
              </div>
            );

          return setPokeCard(item);
        })}
      </div>
    </>
  );
};

export default InfiniteList;

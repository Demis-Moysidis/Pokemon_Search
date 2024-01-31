import React from "react";
import "../styles/NavBar.css";

interface Props {
  onSearch: (searchText: String) => void;
  onSetQyeryBySearch: () => void;
}

const NavBar = ({ onSearch, onSetQyeryBySearch }: Props) => {
  return (
    <>
      <nav className="navbar bg-body-tertiary background-color-nav">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="/Pokemon_Search/assets/pokemon-23-f217e711.svg"
              alt="Pokemon"
              width="120"
            />
          </a>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Name or Number"
              aria-label="Search"
              onChange={(e) => {
                onSearch(e.target.value);
                onSetQyeryBySearch();
              }}
            />
          </form>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

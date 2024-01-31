import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <>
      <footer
        className="navbar bg-body-tertiary background-color-footer"
        style={{ width: "auto", height: "75px" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="/Pokemon_Search/assets/pokemon-23-f217e711.svg"
              alt="Pokemon"
              width="70"
            />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;

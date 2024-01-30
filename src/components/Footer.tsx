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
            <img src="/src/img/pokemon-23.svg" alt="Bootstrap" width="70" />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;

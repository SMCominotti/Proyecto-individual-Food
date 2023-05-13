import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import style from './Landing.module.css';

const Landing = () => {
  useEffect(() => {
    document.body.classList.add(style.landing);

    return () => {
      document.body.classList.remove(style.landing);
    };
  }, []);

  return (
    <>
      <h3> Bienvenidos a </h3>
      <h1> SMAK </h1>
      <h2> Sabores del alma</h2>
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </>
  );
};

export default Landing;


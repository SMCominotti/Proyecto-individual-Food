import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import style from './Landing.module.css';

const Landing = () => {
  useEffect(() => {
    document.body.classList.add(style.landing);
    return () => {
      document.body.classList.remove(style.landing);
    };
  }, []);//esto lo hago para que el fondo se monte cuando se cargue la pagina y se remueva luego (para que no pase a home)

  return (
    <>
      <h3 className={`${style.heading} ${style.bienvenidos}`}>Bienvenidos a</h3>
      <h1 className={`${style.heading} ${style.title}`}>SMAK</h1>
      <h2 className={`${style.heading} ${style.subTitle}`}>Sabores del alma</h2>
      <Link to="/home">
        <button className={style.ctaButton}>Ingresar</button>
      </Link>

    </>
  );
};

export default Landing;



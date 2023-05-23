import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import style from './Thank.Module.css'

const Th = () => {
  useEffect(() => {
    // Ocultar la barra de desplazamiento al cargar la página
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = 'no';

    document.body.classList.add('thank-page');

    return () => {
      // Restaurar la barra de desplazamiento al salir de la página
      document.documentElement.style.overflow = 'auto';
      document.body.scroll = 'yes';

      document.body.classList.remove('thank-page');
    };
  }, []);
  return (
    <>
    <div className={style.th}>
        <div className={style.content}>
    </div>
      <div className={style.buttonContainer}>
        <Link to="/home">
          <button className={style.ctaButton}>Back to Home</button>
        </Link>
      </div>
    </div>
    </>
  );
};



export default Th;


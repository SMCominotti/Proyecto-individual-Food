import style from './Paginado.module.css';

export default function Paginado({ currentPage, recipesPerPage, totalRecipes, paginado }) {
  const pageNumber = Math.ceil(totalRecipes / recipesPerPage); //Para calcular el número de páginas que voy a tener,divido el total de la recetas por las recetas por página (el readme pide 9). Con Math Ceil redondeo para arriba.

  return (
    <nav>
      <ul className={style.paginado}>
        {/* Boton prev:
        Se muestra el botón "Prev" solo si la página actual (currentPage) es mayor que 1. Al hacer clic en el enlace, se llama a la función paginado con el argumento currentPage - 1 para retroceder a la página anterior. */}
        {currentPage > 1 && (
          <li className={style.number}>
            <a href="#" onClick={() => paginado(currentPage - 1)}>Prev</a>
          </li>
        )}
        {Array.from({ length: pageNumber }).map((_, index) => (
          // Se utiliza el _ para indicar que no nos interesa el valor actual de cada elemento en el arreglo, solo necesitamos su índice. Ese índice se utiliza para generar los números de página y mostrarlos como enlaces en la paginación.
          <li className={style.number} key={index + 1}>
            <a href="#" onClick={() => paginado(index + 1)}>{index + 1}</a>
            {/* paginado(index + 1) invoca la función paginado con el número de página como argumento, y {index + 1} muestra el número de página dentro del enlace */}
          </li>
        ))}
        {/* Boton next: 
        Se muestra el botón "Next" solo si la página actual (currentPage) es menor que el número total de páginas (pageNumber). Al hacer clic en el enlace, se llama a la función paginado con el argumento currentPage + 1 para avanzar a la siguiente página. */}
        {currentPage < pageNumber && (
          <li className={style.number}>
            <a href="#" onClick={() => paginado(currentPage + 1)}>Next</a>
          </li>
        )}
      </ul>
    </nav>
  );
}



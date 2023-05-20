import style from './Paginado.module.css';

export default function Paginado({ currentPage, recipesPerPage, totalRecipes, paginado }) { //paginado se utiliza para cambiar la pagina actual cuando se hace click en los botones de navegacion
  const pageNumber = Math.ceil(totalRecipes / recipesPerPage); //calculo el número total de páginas
  return (
    <nav>
      <ul className={style.paginado}>
        {currentPage > 1 && (
          <li className={style.number}>
            <button onClick={() => paginado(currentPage - 1)}>Prev</button>
          </li>
        )}
        {Array.from({ length: pageNumber }).map((_, index) => (
          <li className={`${style.number} ${currentPage === index + 1 ? style.current : ''}`} key={index + 1}>
            <button onClick={() => paginado(index + 1)}>{index + 1}</button>
          </li>
        ))}
        {/* Se utiliza el método Array.from junto con la longitud de pageNumber para crear un array de la longitud correcta. Luego, se itera sobre este array y se renderiza un elemento de lista (li) para cada número de página. Cada elemento de lista contiene un botón con el número de página correspondiente y llama a la función paginado con el valor de index + 1 cuando se hace clic en él y se agrega ademas currentPage para resaltar la pagina actual*/}
        {currentPage < pageNumber && (
          <li className={style.number}>
            <button onClick={() => paginado(currentPage + 1)}>Next</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

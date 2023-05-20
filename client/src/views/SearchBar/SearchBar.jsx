import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameRecipes } from '../../redux/actions';
import styles from './SearchBar.Module.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handleInputChange(event) {
    event.preventDefault();
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getNameRecipes(name));
    setName('');//para que borre el campo de búsqueda
  }

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Busca tu receta aquí"
        value={name}
        onChange={handleInputChange}
        className={styles.searchInput}
      />
      <button type="submit" onClick={handleSubmit} className={styles.searchButton}>
        Buscar
      </button>
    </div>
  );
}





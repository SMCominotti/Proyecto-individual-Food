import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { getNameRecipes } from '../../redux/actions';
import styles from './SearchBar.Module.css';

export default function SearchBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState("") //lo seteo en un strig vacío

    function handleInputChange(event) {
        event.preventDefault();
        setName(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getNameRecipes(name)); //guardo lo que tipea el usuario en mi estado local
        setName(""); //lo seteo vacio para que se limpie
    }

return(
    <div className={styles.searchBar}>
        <input type="text" placeholder="Busca tu receta aqui" onChange={handleInputChange} className={styles.searchInput} />
        <button type='submit' onClick={handleSubmit} className={styles.searchButton}>Buscar</button>
    </div>
    )
}







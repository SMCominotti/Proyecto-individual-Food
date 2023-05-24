import { Link, useParams } from 'react-router-dom';
import { getDetails, cleanData, setLoading } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styles from './Detail.module.css';
import notFound from '../../asset/image/recipeNotFound.jpg';


const Detail = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const recipeDetail = useSelector((state) => state.recipeDetail);
  //obtengo los valores del estado global y quedan atentos a cambios
//useSelector indica que esta suscrito al store y queda atento ante actualizaciones.

  const { idRecipes } = useParams();

  useEffect(() => {
    dispatch(setLoading(true)); // Establece el estado de carga a true 
    dispatch(getDetails(idRecipes)) //Traigo las recetas con el detalle del id que recibo por useParams
      .then(() => { //para ejecutar el código cuando la obtención de los detalles de la receta se haya completado.
        dispatch(setLoading(false)); // Establece el estado de carga a false cuando se completa la obtención de las recetas
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error); //error al obtener las recetas
        dispatch(cleanData()); // Limpia los datos en caso de error
        dispatch(setLoading(false)); // Establece el estado de carga a false una vez que ya obtuve las recetas y su respuesta
      });
   return () => {
      dispatch(cleanData()); // Limpia los datos al desmontar el componente
    };
  }, [dispatch, idRecipes]);//idRecipe indica que eso sucede cuando el componente se actualiza
  

  const createMarkup = (html) => {
    return { __html: html };
  };
  const renderSteps = () => {
    if (Array.isArray(recipeDetail.steps)) {//Verifico si es un Array
      return recipeDetail.steps.map((step, index) => (
        <div className={styles.stepContainer} key={index}>
          <p //Renderizo cada paso dentro de un div, y dentro del mismo en un <p>
            className={styles.step}
            dangerouslySetInnerHTML={createMarkup(step)}
          />
        </div>
      ));
    }
    return null;
  };
  //Esto permite renderizar el HTML de manera segura sin que se escape ni se trate como texto normal.


  const renderDiets = () => {
    if (Array.isArray(recipeDetail.diets)) {
        if (typeof recipeDetail.diets[0] === 'string') {
          // Si los tipos de dietas son un array de strings (API)
          return recipeDetail.diets.join(', ');
        } else if (typeof recipeDetail.diets[0] === 'object') {
          // Si los tipos de dietas son un array de objetos (base de datos)
          return recipeDetail.diets.map((diet) => diet.name).join(', ');
        }
    }
    return null;
  };

  const stripTags = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  //, stripTags se utiliza para eliminar etiquetas HTML de una cadena de texto antes de mostrarla, mientras que createMarkup y dangerouslySetInnerHTML se utilizan para renderizar contenido HTML dentro de un componente de React. 

  if (!recipeDetail.id) {
    return (
      <div className={styles.container}>
        {loading ? (
          <div className="loader-wrapper">
            <div className="loader">
              <div className="loader loader--inner"></div>
            </div>
          </div>
        ) : (
          <div className={styles.errorMessage}>
            <div className={styles.imageError}>
              <img src={notFound} alt="Page not found" width="800px" />
              <Link to="/create" className={styles.imageLink}>
                Go to Create Recipe
              </Link>
            </div>
            <p></p>
            <Link to="/home" className={styles.backButton}>
              Back to Home
            </Link>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      {loading ? (
        <div className="loader-wrapper">
          <div className="loader">
            <div className="loader loader--inner"></div>
          </div>
        </div>
      ) : (
        <div className={styles.details}>
          <h2 className={styles.name}>{recipeDetail.name}</h2>
          <div className={styles.imageContainer}>
            <img src={recipeDetail.image} alt="" className={styles.image} />
          </div>
          <h4 className={styles.title}>Health Score: </h4>
          <div> {recipeDetail.healthScore} </div>
          <h4 className={styles.title}>Types of diets: </h4>
          <div className={styles.diets}>{renderDiets()}</div>
          <h4 className={styles.title}>Summary: </h4>
          <div className={styles.steps}>{stripTags(recipeDetail.summary)}</div>
          {recipeDetail.steps && recipeDetail.steps.length > 0 && (
            <div>
              <h4 className={styles.title}>Step by Step: </h4>
              <div className={styles.steps}>{renderSteps()} </div>
            </div>
          )}
           <Link to="/home" className={styles.backButton}>
              Back to Home
            </Link>
          </div>
      )}
    </div>
  );
};


export default Detail;



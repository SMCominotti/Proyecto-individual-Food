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

  const { idRecipes } = useParams();

  useEffect(() => {
    dispatch(setLoading(true)); // Establece el estado de carga a true
    dispatch(getDetails(idRecipes))
      .then(() => {
        dispatch(setLoading(false)); // Establece el estado de carga a false cuando se completa la obtención de las recetas
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        dispatch(cleanData()); // Limpia los datos en caso de error
        dispatch(setLoading(false)); // Establece el estado de carga a false
      });
  
    return () => {
      dispatch(cleanData()); // Limpia los datos al desmontar el componente
    };
  }, [dispatch, idRecipes]);
  
  const createMarkup = (html) => {
    return { __html: html };
  };
  
  const renderSteps = () => {
    if (Array.isArray(recipeDetail.steps)) {
      return recipeDetail.steps.map((step, index) => (
        <div className={styles.stepContainer} key={index}>
          <p
            className={styles.step}
            dangerouslySetInnerHTML={createMarkup(step)}
          />
        </div>
      ));
    }
    return null;
  };
  
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



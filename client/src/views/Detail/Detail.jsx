import { Link, useParams } from 'react-router-dom';
import { getDetails, cleanData } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styles from './Detail.module.css';



const Detail = () => {
  const dispatch = useDispatch();
  const recipeDetail = useSelector((state) => state.recipeDetail);

  const { idRecipes } = useParams();

  useEffect(() => {
    dispatch(getDetails(idRecipes));

    return () => {
      dispatch(cleanData());
    };
  }, [idRecipes]);

  const renderSteps = () => {
    if (Array.isArray(recipeDetail.steps)) {
      return recipeDetail.steps.map((step, index) => (
        <div key={index}>
          <p>Step number: {step.number}</p>
          <p>{step.step}</p>
        </div>
      ));
    }
    return null;
  };

  const renderDiets = () => {
    if (Array.isArray(recipeDetail.diets)) {
      if (typeof recipeDetail.diets[0] === "string") {
        // Si los tipos de dietas son un array de strings (API)
        return recipeDetail.diets.join(", ");
      } else if (typeof recipeDetail.diets[0] === "object") {
        // Si los tipos de dietas son un array de objetos (base de datos)
        return recipeDetail.diets.map((diet) => diet.name).join(", ");
      }
    }
    return null;
  };
  
  const stripTags = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className={styles.container}>
      {recipeDetail ? (
          <div className={styles.details}>
            <h2 className={styles.name}>{recipeDetail.name}</h2>
            <div className={styles.imageContainer}>
            <img src={recipeDetail.image} alt="" className={styles.image} />
            </div>
            <h4 className={styles.title}>Health Score / Nivel de comida saludable: </h4> 
            <div> {recipeDetail.healthScore} </div>
            <h4 className={styles.title}>Types of diets / Tipos de dietas:</h4>
            <div className={styles.diets}>{renderDiets()}</div>
            <h4 className={styles.title}>Summary / Descripción:</h4>
            <div className={styles.steps}>{stripTags(recipeDetail.summary)}</div>
            {recipeDetail.steps && recipeDetail.steps.length > 0 && (
              <div>
                  <h4 className={styles.title}>Step by Step / Paso a paso:</h4>
                  <div className={styles.steps}>{renderSteps()}</div>
              </div>
            )}     
          </div>
      ) : (
            <img
            src="https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg"
            alt=""
            />
          )
      }
      <Link to="/home" className={styles.backButton}> Back /  Volver </Link>    
    </div>
  );
};

export default Detail;

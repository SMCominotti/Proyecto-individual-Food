import { Link, useParams } from 'react-router-dom';
import { getDetails, cleanData } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

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
  

  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <div>
      {recipeDetail ? (
        <div>
          <img src={recipeDetail.image} alt="" />

          <h2>Nombre: {recipeDetail.name}</h2>
          <p>Nivel de comida saludable: {recipeDetail.healthScore}</p>
          <div>Tipos de dietas: {renderDiets()}</div>
          {/* {recipeDetail.diets && recipeDetail.diets.length > 0 ? (
            <div>
              Tipos de dieta: {recipeDetail.diets.map((diet) => diet.name).join(", ")}
            </div>
          ) : (
            <p>No hay dietas disponibles</p>
          )} */}

          <div>
            <p>
              Descripción:
              <span dangerouslySetInnerHTML={createMarkup(recipeDetail?.summary)} />
            </p>
            {recipeDetail.steps && recipeDetail.steps.length > 0 && (
            <div>
              <h4>Paso a paso:</h4>
              {renderSteps()}
            </div>
          )}
          </div>
          <h5>ID: {recipeDetail?.id}</h5>
        </div>
      ) : (
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg"
          alt=""
        />
      )}
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
};

export default Detail;

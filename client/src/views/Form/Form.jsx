import { useState } from "react";
import axios from "axios";
import style from "./Form.module.css";
import { Redirect } from 'react-router-dom';

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    summary: "",
    diets: [],
    healthScore: "",
    image: "",
    steps: [],
  });

  const [errors, setErrors] = useState({
    name: null,
    summary: null,
    diets: null,
    healthScore: null,
    image: null,
    steps: null,
  });

  const [redirectToThank, setRedirectToThank] = useState(false); 
  const [hasErrors, setHasErrors] = useState(false);


  const validate = (form) => {
    //Validación para name
    if (!form.name) {
      setErrors((errors) => ({
        ...errors,
        name: "Please, enter a recipe name.",
      }));
    } else if (form.name.length <= 60) {
      setErrors((errors) => ({
        ...errors,
        name: null,
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        name: "Please, enter a name with less than 60 characters",
      }));
    }
//validación para Summary
    if (!form.summary) {
      setErrors((errors) => ({
        ...errors,
        summary: "Please, enter a summary.",
      }));
    } else if (form.summary.length <= 300) {
      setErrors((errors) => ({ ...errors, summary: null }));
    } else {
      setErrors((errors) => ({
        ...errors,
        summary: "Description must be less than 300 characters",
      }));
    }
//validación para diets
    if (form.diets.length === 0) {
      setErrors((errors) => ({
        ...errors,
        diets: "Please, select at least one diet type",
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        diets: null,
      }));
    }
//validación para healthScore
    if (!form.healthScore) {
      setErrors((errors) => ({
        ...errors,
        healthScore: "Please, enter a health score",
      }));
    } else if (isNaN(Number(form.healthScore)) || Number(form.healthScore) < 0 || Number(form.healthScore) > 100) {
      setErrors((errors) => ({
        ...errors,
        healthScore: "The health Score must be a number between 0 and 100",
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        healthScore: null,
      }));
    }
//validación para image   
    if (!form.image) {
      setErrors((errors) => ({
        ...errors,
        image: "Please enter an image URL.",
      }));
    } else if (/^(ftp|http|https):\/\/[^ "]+\.(jpg|png)$/.test(form.image)) { //regex para url
      setErrors((errors) => ({ ...errors, image: null }));
    } else {
      setErrors((errors) => ({
        ...errors,
        image: "Please, enter a valid URL",
      }));
    }
//validación para Steps
    if (!form.steps) {
      setErrors((errors) => ({
        ...errors,
        steps: "Please, enter at least one step",
      }));
    } else if (form.steps.length <= 800) {
      setErrors((errors) => ({
        ...errors,
        steps: null,
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        steps: "El máximo son 800 caracteres",
      }));
    }
    // Verificar si hay errores en algún campo
  const errorsExist = Object.values(errors).some((error) => error !== null);
  setHasErrors(errorsExist);
};
 
  const changeHandler = (event) => {
      const property = event.target.name; //Almaceno el nombre que cambió en property
      const value = event.target.value; //Almaceno el valor que cambió en value
  
    if (property === "diets") { //Si el campo que cambia es el de dietas, entonces
      const isChecked = event.target.checked;//verifico si esta marcado el checkbox y lo almaceno
      const dietId = event.target.dataset.id; // Para almacenar el ID de la dieta desde el atributo "data-id"
        if (isChecked) { //en caso de estar tildado el checkbox
          setForm((form) => ({
            ...form,
            diets: [...form.diets, dietId], // Actualizo el estado del formulario haciendo una copia y agregandole el nuevo dietId a diets
          }));
        } else {
          setForm((form) => ({ //si no esta tildado, elimino ese id de dietas
            ...form,
            diets: form.diets.filter((diet) => diet !== dietId), // Filtro por el ID de la dieta
          }));
        }
        } else { //si el cambio se produce en otro campo que no sea diets
          setForm({
            ...form,
            [property]: value, //actualizo el formulario con el valor que cambio 
         });
       }
    validate({ //la validacion se hace en tiempo real
            ...form,
            [property]: value,
    });
  };
  
  const submitHandler = (event) => {
    event.preventDefault();
  
    // Conversión del campo steps
    const stepsArray = form.steps.split("\n").map((step) => step.trim());
  //en el formulario las personas escriben (string) pero yo necesito que me llegue la info al back como array y que cada salto de pagina sea un step nuevo
    const requestBody = {
      ...form,
      steps: stepsArray.map((step, index) => `<b>${index + 1}</b> ${step}`),
    };//esto lo hago para que tenga el mismo formato que la API, que tenga un numero en negrita antes del step
  
    axios
      .post("http://localhost:3001/recipes/", requestBody)
      .then((res) => {
        alert("Recipe created successfully");
        setForm({ //para volver a dejar los campos en blanco
          name: "",
          summary: "",
          diets: [],
          healthScore: "",
          image: "",
          steps: "",
        });
        setRedirectToThank(true);
      })
      .catch((err) => alert(err.response.data.error));
  };

  if (redirectToThank) {
    return <Redirect to="/thank" />;
  }
  
  
  return (
           <>
             <h1>Feel Free to share your recipe with us</h1>
              <h3>Create it here</h3>
              <form className={style.form} onSubmit={submitHandler}>
                <div>
                    <label className={style.label} >Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={changeHandler}
                    />
                  {errors.name && <span className={style.error}>{errors.name}</span>}
                </div>
                <div>
                    <label className={style.label}>Summary: </label>
                    <textarea className={style.textarea}
                      name="summary"
                      value={form.summary}
                      onChange={changeHandler}
                    />          
                  {errors.summary && <span className={style.error}>{errors.summary}</span>}
                </div>
                <div>
                    <label className={style.label} >Health Score: </label>
                    <input
                        type="text"
                        name="healthScore"
                        value={form.healthScore}
                        onChange={changeHandler}
                    />
                 {errors.healthScore !== null && <span className={style.error}>{errors.healthScore}</span>}
                </div>
                <div>
                    <label className={style.label} >Image: </label>
                    <input
                        type="text"
                        name="image"
                        value={form.image}
                        onChange={changeHandler}
                    />
                  {errors.image !== null && <span className={style.error}>{errors.image}</span>}
                </div>
                <div>
                    <label className={style.label} >Step by step: </label>
                    <textarea className={style.textarea}
                      name="steps"
                      value={form.steps}
                      onChange={changeHandler}
                    />
                    {errors.steps !== null && <span className={style.error}>{errors.steps}</span>}
                </div>
                <div>
                  <label className={style.label} >Select the type of diet... you can select more than one: </label>
                  <br/>
                  <br/>
                <div>
                  <input
                        type="checkbox"
                        name="diets"
                        value="gluten free"
                        data-id="81553869-8198-462a-b401-70ec2a8cb3cf" 
                        checked={form.diets.includes("81553869-8198-462a-b401-70ec2a8cb3cf")} 
                        onChange={changeHandler}
                  />
                    Gluten Free
                  <input
                        type="checkbox"
                        name="diets"
                        value="diary free"
                        data-id="4cedf10f-ecb3-4c3b-857c-ad635758a2bf" 
                        checked={form.diets.includes("4cedf10f-ecb3-4c3b-857c-ad635758a2bf")}
                        onChange={changeHandler}
                  />
                    Dairy Free
                  <input
                        type="checkbox"
                        name="diets"
                        value="lacto ovo vegetarian"
                        data-id="996e3f03-098d-40bb-9cfb-b3a5e0f2125d"
                        checked={form.diets.includes("996e3f03-098d-40bb-9cfb-b3a5e0f2125d")}
                        onChange={changeHandler}
                  />
                    Lacto Ovo Vegetarian
                  <input
                        type="checkbox"
                        name="diets"
                        value="vegan"
                        data-id="fe979227-3638-4a03-80ca-59c63f55af93"
                        checked={form.diets.includes("fe979227-3638-4a03-80ca-59c63f55af93")}
                        onChange={changeHandler}
                  />
                    Vegan
                  <input
                        type="checkbox"
                        name="diets"
                        value="paleolithic"
                        data-id="79bdb2ac-0ac9-459c-a916-73ebadda5688"
                        checked={form.diets.includes("79bdb2ac-0ac9-459c-a916-73ebadda5688")}
                        onChange={changeHandler}
                  />
                    Paleolithic
                  <input
                        type="checkbox"
                        name="diets"
                        value="primal"
                        data-id="b3d0efda-c4b4-46c4-ac5b-d4acb0838eab"
                        checked={form.diets.includes("b3d0efda-c4b4-46c4-ac5b-d4acb0838eab")}
                        onChange={changeHandler}
                  />
                    Primal
                  <input
                        type="checkbox"
                        name="diets"
                        value="whole 30"
                        data-id="c51dd8c2-7323-4d45-a43e-1ab1052ecb20"
                        checked={form.diets.includes("c51dd8c2-7323-4d45-a43e-1ab1052ecb20")}
                        onChange={changeHandler}
                  />
                    Whole 30
                  <input
                        type="checkbox"
                        name="diets"
                        value="pescatarian"
                        data-id="eab33792-1e40-4b6c-a58e-ebd41e946ced"
                        checked={form.diets.includes("eab33792-1e40-4b6c-a58e-ebd41e946ced")}
                        onChange={changeHandler}
                  />
                    Pescatarian
                  <input
                        type="checkbox"
                        name="diets"
                        value="ketogenic"
                        data-id="6fd5d7b3-b530-4beb-8f9d-1efa6b108f84"
                        checked={form.diets.includes("6fd5d7b3-b530-4beb-8f9d-1efa6b108f84")}
                        onChange={changeHandler}
                  />
                    Keto
                  <input
                        type="checkbox"
                        name="diets"
                        value="fodmap friendly"
                        data-id="8bd92500-f4f4-4795-bf31-8c3a2fa1171e"
                        checked={form.diets.includes("8bd92500-f4f4-4795-bf31-8c3a2fa1171e")}
                        onChange={changeHandler}
                  />
                    Fodmap Friendly
                    {errors.diets !== null && <span className={style.error}>{errors.diets}</span>}
                </div>
                </div>
                <br />
                <button type="submit" disabled={!form.name || !form.summary || !form.steps || !form.healthScore || !form.image || !form.diets || hasErrors}>Create Recipe</button>
              </form>
            </>
  );
};

export default Form;

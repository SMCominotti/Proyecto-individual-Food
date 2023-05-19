import { useState } from "react";
import axios from "axios";
import style from "./Form.module.css";
import { NavLink } from 'react-router-dom';

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    summary: "",
    diets: [],
    healthScore: "",
    image: "",
    instructions: "",
  });

  const [errors, setErrors] = useState({
    name: null,
    summary: null,
    diets: null,
    healthScore: null,
    image: null,
    instructions: null,
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
  
    if (property === "diets") {
      const isChecked = event.target.checked;
      const dietId = event.target.dataset.id; // Obtener el ID de la dieta desde el atributo "data-id"
  
      if (isChecked) {
        setForm((form) => ({
          ...form,
          diets: [...form.diets, dietId], // Agregar el ID de la dieta en lugar del nombre
        }));
      } else {
        setForm((form) => ({
          ...form,
          diets: form.diets.filter((diet) => diet !== dietId), // Filtrar por el ID de la dieta
        }));
      }
    } else {
      setForm({
        ...form,
        [property]: value,
      });
    }
    validate({
      ...form,
      [property]: value,
    });
  };
  

  const validate = (form) => {
    
    if (!form.name) {
      setErrors((errors) => ({
        ...errors,
        name: "Por favor, ingrese el nombre de la receta",
      }));
    } else if (form.name.length <= 60) {
      setErrors((errors) => ({
        ...errors,
        name: null,
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        name: "Por favor, ingrese un nombre con menos de 60 caracteres",
      }));
    }

    
    if (!form.summary) {
      setErrors((errors) => ({
        ...errors,
        summary: "Por favor, ingrese la descripción de la receta",
      }));
    } else if (form.summary.length <= 100) {
      setErrors((errors) => ({ ...errors, summary: null }));
    } else {
      setErrors((errors) => ({
        ...errors,
        summary: "La descripción debe tener menos de 60 caracteres",
      }));
    }

    
    if (form.diets.length === 0) {
      setErrors((errors) => ({
        ...errors,
        diets: "Por favor, seleccione la o las dietas.",
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        diets: null,
      }));
    }

    
    if (!form.healthScore) {
      setErrors((errors) => ({
        ...errors,
        healthScore: "Por favor, ingrese el nivel de comida saludable",
      }));
    } else if (/^([1-9][0-9]?|100)$|^0$/.test(form.healthScore)) {
      setErrors((errors) => ({ ...errors, healthScore: null }));
    } else {
      setErrors((errors) => ({
        ...errors,
        healthScore: "Debe ser un número de 0 a 100",
      }));
    }

    
    if (!form.image) {
      setErrors((errors) => ({
        ...errors,
        image: "Por favor, ingrese la URL de la imágen.",
      }));
    } else if (/^(ftp|http|https):\/\/[^ "]+\.(jpg|png)$/.test(form.image)) {
      setErrors((errors) => ({ ...errors, image: null }));
    } else {
      setErrors((errors) => ({
        ...errors,
        image: "Ingrese una URL válida",
      }));
    }

  
    if (!form.instructions) {
      setErrors((errors) => ({
        ...errors,
        instructions: "Por favor, describa el paso a paso de la receta",
      }));
    } else if (form.instructions.length <= 500) {
      setErrors((errors) => ({
        ...errors,
        instructions: null,
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        instructions: "El máximo son 500 caracteres",
      }));
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/recipes/", form)
      .then((res) => alert("Receta creada Correctamente"))
      .catch((err) => alert(err.response.data.error));
  };

  return (
    <>
     <NavLink to="/home" className="button-style">Volver</NavLink>
           <h1>Anímate a compartir tu receta con nosotros</h1>
          <h3>Créala aquí</h3>
   
    <form className={style.form} onSubmit={submitHandler}>
   
      <div>
        <label className={style.label} >Nombre: </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={changeHandler}
        />
        {errors.name !== null && <span>{errors.name}</span>}
      </div>
      <div>
        <label className={style.label} >Descripción: </label>
        <input
          type="text"
          name="summary"
          value={form.summary}
          onChange={changeHandler}
        />
        {errors.summary !== null && <span>{errors.summary}</span>}
      </div>
     
      <div>
        <label className={style.label} >Nivel de comida saludable: </label>
        <input
          type="text"
          name="healthScore"
          value={form.healthScore}
          onChange={changeHandler}
        />
        {errors.healthScore !== null && <span>{errors.healthScore}</span>}
      </div>
      <div>
        <label className={style.label} >Imágen: </label>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={changeHandler}
        />
        {errors.image !== null && <span>{errors.image}</span>}
      </div>
      <div>
        <label className={style.label}  >Paso a paso: </label>
        <input
          type="text"
          name="instructions"
          value={form.instructions}
          onChange={changeHandler}
        />
        {errors.instructions !== null && <span>{errors.instructions}</span>}
      </div>
      <div>
        <label className={style.label} >Seleccioná el o los tipos de dietas: </label>
        <br />
        <input
          type="checkbox"
          name="diets"
          value="gluten free"
          data-id="81553869-8198-462a-b401-70ec2a8cb3cf" 
          checked={form.diets.includes("81553869-8198-462a-b401-70ec2a8cb3cf")} 
          onChange={changeHandler}
        />
        Sin Gluten
        <input
          type="checkbox"
          name="diets"
          value="diary free"
          data-id="4cedf10f-ecb3-4c3b-857c-ad635758a2bf" 
          checked={form.diets.includes("4cedf10f-ecb3-4c3b-857c-ad635758a2bf")}
          onChange={changeHandler}
        />
        Sin Lacteos
        <input
          type="checkbox"
          name="diets"
          value="lacto ovo vegetarian"
          data-id="996e3f03-098d-40bb-9cfb-b3a5e0f2125d"
          checked={form.diets.includes("996e3f03-098d-40bb-9cfb-b3a5e0f2125d")}
          onChange={changeHandler}
        />
        Lacto Ovo Vegetariana
        <input
          type="checkbox"
          name="diets"
          value="vegan"
          data-id="fe979227-3638-4a03-80ca-59c63f55af93"
          checked={form.diets.includes("fe979227-3638-4a03-80ca-59c63f55af93")}
          onChange={changeHandler}
        />
        Vegana
        <input
          type="checkbox"
          name="diets"
          value="paleolithic"
          data-id="79bdb2ac-0ac9-459c-a916-73ebadda5688"
          checked={form.diets.includes("79bdb2ac-0ac9-459c-a916-73ebadda5688")}
          onChange={changeHandler}
        />
        Paleo
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
        Pesca-Vegetariana
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
        Fodmap 
        {errors.diets !== null && <span>{errors.diets}</span>}
      </div>
      <button type="submit" disabled={!form.name || !form.summary || !form.instructions || !form.healthScore || !form.image || !form.diets}>Crear Receta</button>
    </form>
    </>
  );
};

export default Form;

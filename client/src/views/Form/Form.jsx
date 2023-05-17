import { useState } from "react";
import axios from "axios";
import style from "./Form.module.css";

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    summary: "",
    steps: "",
    healthScore: "",
    image: "",
    diets: [] 
  });
  const [errors, setErrors] = useState({
    name: "",
    summary: "",
    steps: "",
    healthScore: "",
    image: ""
  });

  const changeHandler = (event) => { //se ejecuta cada vez que se produce un cambio en el formulario
    const property = event.target.name;
    const value = event.target.value;
//guarda las propiedades name y value y actualiza el formulario. Siempre hago una copia del original y actualizo las propiedades que cambian, para no perder las que se mantienen
    setForm({ ...form, [property]: value });
    // Realizamos la validación en el momento del cambio
    validate({ ...form, [property]: value });
    //hago la validacion en el momento del cambio
  };

  const validate = (form) => {
      const { name, summary, steps, healthScore, image } = form;
      const newErrors = {};
   if (!name) {
        newErrors.name = "Por favor, complete el nombre de la receta";
      } else {
        newErrors.name = "";
      }
  if (!summary) {
        newErrors.summary = "Por favor, complete el resumen del plato";
      } else {
        newErrors.summary = "";
      }
  if (!steps) {
        newErrors.steps = "Por favor, complete los pasos de la receta";
      } else {
        newErrors.steps = "";
      }
  if (!healthScore) {
        newErrors.healthScore = "Por favor, complete el nivel de comida saludable";
      } else if (isNaN(healthScore) || Number(healthScore) < 0 || Number(healthScore) > 100) {
        newErrors.healthScore = "El nivel de comida saludable debe ser un número entre 0 y 100";
      } else {
        newErrors.healthScore = "";
      }
   if (!image) {
        newErrors.image = "Por favor, complete la URL de la imagen";
      } else {
        newErrors.image = "";
      }
  setErrors(newErrors); //una vez que hago todas las validaciones, actualizo el estado de error con el o los correspondientes.
  };

  const submitHandler = (event) => { //cuando se envía el formulario
    event.preventDefault(); //previene el comportamiento predeterminado (se evita que el formulario se envíe y se recargue la página, permitiendo un control más preciso como validaciones o mensajes de error)
    axios
      .post("http://localhost:3001/recipes", form) //aca es donde se hace la solicitud post
      .then((res) => alert(res)) // Mediante un alert (se muestra si salió todo bien o hay un error)
      .catch((err) => alert(err));
  };


  const toggleDiet = (diet) => {
    //esta constante la creo para que funcionen bien los checklist y permitir al usuario que pueda seleccionar mas de 1 
    const selectedDiets = [...form.diets];
    //primero creo una copia de las dietas 
    if (selectedDiets.includes(diet)) {
      // Verificar si la dieta seleccionada 
      const index = selectedDiets.indexOf(diet);
      selectedDiets.splice(index, 1);
      // Si está, la removemos
    } else {
            selectedDiets.push(diet);
    }// Si no está, la agregamos
    setForm({ ...form, diets: selectedDiets });
    //actualizo el estado con las dietas seleccionadas.
  };
  //esto es porque cuando hago el include, como todas estan, es como si todas estuviesen marcadas (aunque el cuadradito este sin tilde), si la marco (es como si la desmarcara en verdad), por eso dice, si esta seleccionada (por default, no por el cliente (y el cuadradito en blanco), la saco, si no esta seleccionada (osea si por el cliente, la agrego)Es alrevez de lo que parece. En ese caso, las marcadas por el cliente seran las agregadas en el array

   return (
          <form className={style.form} onSubmit={submitHandler}>
            <div>
                <label className={style.label} htmlFor="name">Nombre: </label>
                <input type="text" value={form.name} onChange={changeHandler} name="name" placeholder="Ingrese el nombre de la receta" />
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label className={style.label} htmlFor="summary">Resumen del plato: </label>
                <input type="text" value={form.summary} onChange={changeHandler} name="summary" placeholder="Ingrese el resumen del plato" />
                {errors.summary && <span>{errors.summary}</span>}
            </div>
            <div>
                <label className={style.label} htmlFor="healthScore">Nivel de comida saludable: </label>
                <input type="text" value={form.healthScore} onChange={changeHandler} name="healthScore" placeholder="Ingrese el nivel de comida saludable" />
                {errors.healthScore && <span>{errors.healthScore}</span>}
            </div>
            <div>
                <label className={style.label} htmlFor="steps">Paso a paso: </label>
                <input type="text" value={form.steps} onChange={changeHandler} name="steps" placeholder="Ingrese los pasos de la receta" />
                {errors.steps && <span>{errors.steps}</span>}
            </div>
            <div>
                <label className={style.label} htmlFor="image">Imagen: </label>
                <input type="text" value={form.image} onChange={changeHandler} name="image" placeholder="Ingrese la URL de la imagen" />
                {errors.image && <span>{errors.image}</span>}
            </div>
            <div>
                <label className={style.label} htmlFor="diets">Tipos de dieta:</label>
                <div>
                  <label>
                      <input
                        type="checkbox"
                        value="vegetarian"
                        checked={form.diets.includes("vegetarian")}
                        onChange={() => toggleDiet("vegetarian")}
                      />
                     Vegetariana
                  </label>
               </div>
               <div>
                  <label>
                      <input
                        type="checkbox"
                        value="vegan"
                        checked={form.diets.includes("vegan")}
                        onChange={() => toggleDiet("vegan")}
                      />
                      Vegana
                   </label>
               </div>
               <div>
                  <label>
                      <input
                        type="checkbox"
                        value="gluten free"
                        checked={form.diets.includes("gluten free")}
                        onChange={() => toggleDiet("gluten free")}
                  />
                     Sin gluten
                  </label>
                </div>
                <div>
                  <label>
                      <input
                        type="checkbox"
                        value="dairy free"
                        checked={form.diets.includes("dairy free")}
                        onChange={() => toggleDiet("dairy free")}
                  />
                    Sin lácteos
                  </label>
                </div>
                <div>
                  <label>
                     <input
                        type="checkbox"
                        value="lacto ovo vegetarian"
                        checked={form.diets.includes("lacto ovo vegetarian")}
                        onChange={() => toggleDiet("lacto ovo vegetarian")}
                      />
                    Lacto-Ovo-Vegetariana
                  </label>
                </div>
                <div>
                  <label>
                      <input
                        type="checkbox"
                        value="paleolithic"
                        checked={form.diets.includes("paleolithic")}
                        onChange={() => toggleDiet("paleolithic")}
                      />
                    Paleo
                  </label>
                </div>
                <div>
                  <label>
                     <input
                        type="checkbox"
                        value="primal"
                        checked={form.diets.includes("primal")}
                        onChange={() => toggleDiet("primal")}
                      />
                    Primal
                  </label>
                </div>
                <div>
                <label>
                   <input
                        type="checkbox"
                        value="whole 30"
                        checked={form.diets.includes("whole 30")}
                        onChange={() => toggleDiet("whole 30")}
                      />
                    Whole 30
                </label>
                  </div>
                  <div>
                  <label>
                      <input
                        type="checkbox"
                        value="pescatarian"
                        checked={form.diets.includes("pescatarian")}
                        onChange={() => toggleDiet("pescatarian")}
                      />
                   Pesca-Vegetariana
               </label>
                  </div>
                  <div>
              <label>
                <input
                    type="checkbox"
                    value="ketogenic"
                    checked={form.diets.includes("ketogenic")}
                    onChange={() => toggleDiet("ketogenic")}
                />
                Keto
              </label>
             </div>
             <div>
             <label>
                  <input
                    type="checkbox"
                    value="fodmap friendly"
                    checked={form.diets.includes("fodmap friendly")}
                    onChange={() => toggleDiet("fodmap friendly")}
                  />
                 Fodmap
              </label>
               </div>
              </div>
             <button type="submit">Crear Receta</button>
         </form>
   );
}
  
export default Form;
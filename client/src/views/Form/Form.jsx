// import {useState} from "react";
// import axios from "axios";

// const Form = () => {
// const [form, setForm] = useState({ 
//     name: "",
//     summary:"",
//     steps:"",
//     healthScore:"",
//     image:""
// })
// const [errors, setErrors] = useState({
//     name: "",
//     summary:"",
//     steps:"",
//     healthScore:"",
//     image:""
// })

// const changeHandler= (event) =>{
//     const property= event.target.name;
//     const value= event.target.value;
    
//     validate({...form,[property]:value})
//     setForm({...form,[property]:value})
//    //hago esto para que validate evalúe a la par, sino va un tiempo mas atrás.
// }

// const validate = (form) =>{
// if(name){//Ponerle aca validaciones
//     setErrors({...errors,name:""})
// }else{
//     setErrors({...errors,name:"Hay un error en el nombre"})
// }
// if(form.name==="") setErrors({...errors,name:"Por favor, complete el nombre de la receta"})
// //hacer las de todos
// }

// const submitHandler = (event) => {
//     event.preventDefault()
//     axios.post("http://localhost:3001/recipes",form)
//     .then(res=>alert(res)) //ver si quiero el alert
//     .catch(err=>alert(err))
// }

//     return(
//     <form onSubmit={submitHandler}>
//         <div>
//             <label htmlFor="name">Nombre: </label>
//             <input type="text" value={form.name} onChange={changeHandler} name="name"/>
//             {errors.name && <span>{errors.name}</span>}
//         </div>
//         <div>
//             <label htmlFor="summary">Resumen del plato: </label>
//             <input type="text"value={form.summary} onChange={changeHandler} name="summary"/>
//             {errors.summary && <span>{errors.summary}</span>}
//         </div>
//         <div>
//             <label htmlFor="healthScore">Nivel de comida saludable: </label>
//             <input type="text" value={form.healthScore} onChange={changeHandler} name="healthScore"/>
//             {errors.healthScore && <span>{errors.healthScore}</span>}
//         </div>
//         <div>
//             <label htmlFor="steps">Paso a paso: </label>
//             <input type="text" value={form.steps} onChange={changeHandler} name="steps"/>
//             {errors.steps && <span>{errors.steps}</span>} 
//         </div>
//         <div>
//             <label htmlFor="image">Imágen: </label>
//             <input type="text" value={form.image} onChange={changeHandler} name="image"/>
//             {errors.image && <span>{errors.image}</span>}
//         </div>
//         <button type="submit">Enviar</button>
//      </form>
//     )
// }

// export default Form;
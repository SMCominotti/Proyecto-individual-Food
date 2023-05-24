import './App.css';
import { Home, Landing, Form, Detail}  from "./views";
import NavBar from './Components/NavBar/NavBar';
import About from './views/About/About.jsx'
import Th from './views/Thank/Th';

import {Route, useLocation} from "react-router-dom"

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar/>}
       <Route exact path="/" render={() => <Landing/>}/> 
       <Route path="/home" render={() => <Home/>}/> 
       <Route path="/about" render={() => <About/>}/> 
       <Route exact path="/detail/:idRecipes" component={Detail} />
       <Route path="/create" render={() => <Form/>}/> 
       <Route path="/thank" render={() => <Th/>}/> 
    </div>
  );
}

export default App;
//location.pathname devuelve la ruta actual
//Verifica si la ruta actual no es igual a "/".
//Muestro el componente <NavBar/> solo cuando la ruta actual no es la página principal ("/"). 
 //Pongo el exact porque la barra existe siempre. Si no pongo esto, aparecería en todas las rutas, porque la barra esta presente en todas.//
//Uso render en las rutas porque es útil si necesito hacer algo adicional como pasarle props. Si no tambien puedo hacerla con <Route exact path="/" component={Landing}/>. El exact en Home es innecesario
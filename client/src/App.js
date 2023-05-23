import './App.css';
import { Home, Landing, Form, Detail}  from "./views";
import NavBar from './Components/NavBar/NavBar';
import About from './Components/About/About';
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

 //pongo el exact porque la barra existe siempre. Si no pongo esto, aparecería en todas las rutas//
//Uso render en las rutas porque es útil si necesito hacer algo adicional como pasarle props. Si no tambien puedo hacerla con <Route exact path="/" component={Landing}/>. El exact en Home es innecesario
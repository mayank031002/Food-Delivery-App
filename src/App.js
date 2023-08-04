import './App.css';
// You yourself has to add these files inside App.js
import Home from './screens/Home';
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'  //npm i bootstrap-dark-5 boostrap
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import SignUp from './screens/SignUp';
import { CartProvider } from './components/ContextReducer';
import Cart from './screens/Cart';
function App() {
  return (
    <CartProvider>

     <BrowserRouter>
      <div>
      <Routes> 
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/createuser" element={<SignUp/>}/>
       </Routes>
      </div>
     </BrowserRouter>
    </CartProvider>
    
  );
}

export default App;

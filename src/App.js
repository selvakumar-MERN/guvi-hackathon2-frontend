import './App.css';
import{BrowserRouter,Route,Routes} from 'react-router-dom'
import Adminlogin from './Components/Admin/Adminlogin';
import Adminpage from './Components/Admin/Adminpage';
import Addproduct from './Components/Admin/Addproduct';
import Products from './Components/Productpage/Products';
import Landingpage from './Components/Landingpage/Landingpage';
import { useState } from 'react';
import Editproduct from './Components/Admin/Editproduct';
import Cart from './Components/Cart/Cart';
import Contactus from './Components/Contactus/Contactus';
import Usersdetails from './Components/Admin/Usersdetails';

function App() {
  const[user,setuser]=useState("");
  const[cart,setcart]=useState("");
  const userdata=(item)=>{
        setuser(item)
  }

  const addCart=(item)=>{
        setcart(item)
  }
  return (
    <BrowserRouter>
    <Routes>
    <Route exact 
      path='/' 
      element={<Landingpage/>} >
      </Route>
    <Route exact 
      path='/admin/login' 
      element={<Adminlogin/>} >
      </Route>
      <Route exact 
      path='admin/adminpage' 
      element={<Adminpage userdata={userdata}/>} >
      </Route>
      <Route exact 
      path='admin/addproduct' 
      element={<Addproduct/>} >
      </Route>
      <Route exact 
      path='/products' 
      element={<Products addCart={addCart}/>} >
      </Route>
      <Route exact 
      path='admin/editproduct' 
      element={<Editproduct user={user}/>} >
      </Route>
      <Route exact 
      path='/cart' 
      element={<Cart cart ={cart}/>} >
      </Route>
      <Route exact 
      path='/contactus' 
      element={<Contactus/>} >
      </Route>
      <Route exact 
      path='/admin/userdetails' 
      element={<Usersdetails/>} >
      </Route>
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;

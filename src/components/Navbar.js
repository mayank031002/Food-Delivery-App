import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
export default function Navbar() {
  const data = useCart();
  const [cartView,setCartView]=useState(false);
  const navigate=useNavigate();
  const handleLogout=()=>{
       localStorage.removeItem("authToken");
       navigate("/login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-night bg-success ">
        <div className="container-fluid">
          {/* it is basic property of to that you have to go to new page so thats why our page was reloading */}
          {/* so to overcome reloading problem we use react router DOM */}
          <Link className="navbar-brand fs-1 fst-italic fst-bold" style={{ color: 'ghostwhite' }} to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-">
              <li className="nav-item">
                <Link className="nav-link active fst-bold fs-5" aria-current="page" style={{ color: 'ghostwhite' }} to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fst-bold fs-5" aria-current="page" style={{ color: 'ghostwhite' }} to="/">MyOrder</Link>
                </li>

                : ""}
            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>

                <Link className="btn bg-white  mx-1 fs-6" style={{ color: 'darkorchid' }} to="/login">Login</Link>
                <Link className="btn bg-white  mx-1 fs-6" style={{ color: 'darkorchid' }} to="/createuser">SignUp</Link>
              </div>
              : <div>
                <div className='btn bg-white mx-2 fs-5' style={{ color: 'darkorchid' }} onClick={()=>{setCartView(true)}}>
                  MyCart{" "}
                  <Badge pill bg="danger">{data.length}</Badge>
                </div>
                {
                  cartView?<Modal onClose={()=>setCartView(false)}><Cart></Cart></Modal>:null
                }
                <div className='btn bg-white mx-2 fs-5' style={{ color: 'red' }} onClick={handleLogout}>
                  Logout
                </div>

              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}


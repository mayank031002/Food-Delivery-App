import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart,useCart } from "./ContextReducer";
export default function Card(props) {
  let dispatch=useDispatchCart();
  let  data=useCart();
  const priceRef=useRef();//takin reference
  let options = props.options;
  let priceOptions = Object.keys(options);
//   The useEffect Hook allows you to perform side effects in your components.

// Some examples of side effects are: fetching data, directly updating the DOM, and timers.
  const [qty,setQty]=useState(1);
  const [size,setSize]=useState("");
  const handleAddToCart=async()=>{
    let food=[]
    for(const item of data){
      if(item.id===props.foodItem._id){
        food=item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: props.finalPrice, qty:qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:props.finalPrice,qty:qty,size:size})
      //   console.log("Size different so simply ADD one more to the list")
        return
      }
      
      return
     
    }
    await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:props.finalPrice,qty:qty,size:size})
     
  }
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  let finalPrice=qty*parseInt(options[size]);
  
  return (
    <div>
      <div>
        <div
          className="card mt-3 m-3 border-success rounded"
          style={{ width: "19rem", maxHeight: "480px"}}
        >
          <img className="card-img-top " src={props.foodItem.img} alt="Card image cap" style={{height:"220px",objectFit:"fill"}}/>
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <p className="card-text">{props.foodItem.description}</p>
            <div className="container w-100">
              <select className="m-2 h-100 bg-success rounded" onChange={(e)=>setQty(e.target.value)}>
                {/* curly braces is considered to be javascript */}
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                {priceOptions.map((data)=>{
                   return  <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div className="d-inline h-100 fs-5">
                Rs{finalPrice}/-
              </div>
            </div>
            <hr/>
            <button className={"btn btn-success justify-center ms-5 "} onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { add } from "src/app/Store/registerslice.js";
import Link from "next/link";

 function Productpage() {


    const[items,setItem]=useState([])

    const dispatch = useDispatch();

    useEffect(()=>{
     fetch("https://fakestoreapi.com/products")
     .then(data=>data.json())
     .then(result=>setItem(result))
    },[])
    console.log("item",items);
    const addtocart = (product) => {
      console.log("adt",product)
        dispatch(add(product)); 

        localStorage.setItem('cartState',JSON.stringify(product))
      };
 console.log("item",items);


  const cards = items.slice(0, 5).map((product) => (

    <div className="col-lg-3  mt-3"  >
      <Card
      className="h-100"
        key={product.id}
       > <Card.Body  >
       <Link href={`/Product/${product.id}`}  className="text-decoration-none">
        <div className="text-center">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ width: "90px", height: "150px" }}
          />
        </div>
       <div className="text-center mt-3">
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>INR:{product.price}</Card.Text></div>
          </Link>
          </Card.Body>
        
        <Card.Footer className="text-center">
          <Button
            variant="primary"
            className="text-center"
           onClick={()=>addtocart(product)}
          >
            Add to Cart
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));
  return (
    <>
        <div>Product Dashboard</div>

        <div className="cards-container" style={{ overflowX: "hidden" }}>
        <div className="row">{cards}</div>
      </div>
    </>
  );
}

export default Productpage;
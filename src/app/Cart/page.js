"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import {remove} from "src/app/Store/registerslice.js";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./addcart.css";

function Cartpage() {
  const isLoggedIn = useSelector((state) => state.signup.isLoggedIn);
  const currentUser = useSelector((state) => state.signup.currentUser);
 console.log("cartitem",currentUser)
  const [cartitem,setCartItems]=useState([])
 

  const products = useSelector((state) => state.signup.cartUser);
  console.log("Cartdisplay", products);

  const dispatch = useDispatch();

  useEffect(() => {
    const carts = products.filter((item) => item.id === currentUser.id);
    setCartItems(carts);
  }, []);
  // useEffect(() => {
  //   products.map((d) => {
  //     console.log("cartUser.userid", d.id);
  //     console.log("loggedIn.id", currentUser.id);
  //     if (d.id === currentUser.id) {
  //       const carts =products.filter((item) => item.id === currentUser.id);
  //       setCartItems(carts);
     
     
  //     }
  //   });
  // }, []);
  console.log("r44r",cartitem);
  const removeItem = (id) => {
    dispatch(remove(id));
   
  };

//   const increaseQuantity = (id) => {
//       dispatch(increase(id));
 
//  setCartItems((previouscart)=>previouscart.map((product) =>
//  product.id === id ? { ...product, quantity: product.quantity + 1 } : product
// ))
   
  
//   };
//   const decreaseQuantity = (id) => {
  
//     const productToDecrease = products.find((product) => product.id === id);
//     setCartItems((previouscart)=>previouscart.map((product) =>{
//     if (productToDecrease) {
//       if (productToDecrease.quantity > 1) {
//         dispatch(decrease(id));
    
//       } else {
    
//         dispatch(deleteitem(id));
   
//       }
//     } else {
//       alert("Product not found in the cart.");
//     }
   
//    } ))
//   };

 
  const router = useRouter();

  const gotopayment = () => {
    if (isLoggedIn) {
      router.push("/Payment");
    } else {
      router.push("/signin");
    }
  };

  const cardss = cartitem.map((product) => (
   
    <div className="row">
      <div className="col-md-8 cart">
        <div className="row border-top border-bottom">
          <div className="row main align-items-center">
            <div className="col-2">
              <Image src={product.image} width={80} height={100} />
            </div>
            <div className="col">
              <div className="row text-muted">{product.title}</div>
              <div className="row">INR:{product.price}/-</div>
            </div>
            {/* <div className="col me-4">
              <div className="col me-4">
                <a href="#" className="border">
                  {product.quantity}
                </a>
                <a href="#" onClick={() => increaseQuantity(product.id)}>
                  +
                </a>
                <a href="#" onClick={() => decreaseQuantity(product.id)}>
                  -
                </a>
              </div>
            </div> */}
            <div className="col-4">
              <div className="row">
                {/* <div className="col">
                  <span> INR:{(product.price * product.quantity).toFixed(2)}; </span>
                </div> */}
                <div className="col-1">
                <Button className="bg-primary"style={{width:"80px"}} onClick={() => removeItem(product.id)}>
                  Remove
                </Button></div>
                    </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  const subtotal = products
    .reduce(
      (accumulator, product) => accumulator + product.price * product.quantity,
      0
    )
    .toFixed(2);
  const subitem = products.reduce(
    (accumulator, product) => accumulator + product.quantity,
    0
  );

  return (
    <>
    <div className='text-primary'><Link href="/Homepage">back to Dashboard</Link></div>
      <div className="container">
        {products.length === 0 ? (
          <>
            <div className="modal-body">
              <h5>Ohooo!</h5>
              <p>
                This cart is empty please go through this button{" "}
                <a
                  href="/Homepage"
                  role="button"
                  className="btn btn-secondary popover-test"
                  title="Popover title"
                  data-bs-content="Popover body content is set in this attribute."
                  style={{ width: "200px" }}
                >
                  Shop Now
                </a>
              </p>
              <hr />
            </div>
          </>
        ) : (
          <>
            <div className="row">{cardss}</div>
          </>
        )}
      </div>

      <div className="container">
        <div className="row">
          <div className="col text-end my-3">
            <h2>Total Item:({subitem})</h2>
            <span>
              <h2>Subtotal: &#8377;{subtotal}</h2>
            </span>
            <br />
            {products.length > 0 && (
              <Button
                className="bg-warning rounded-pills"
                style={{ width: "200px", textDecoration: "none" }}
                onClick={gotopayment}
              >
                <Link
                  href={""}
                  className="text-dark"
                  style={{ textDecoration: "none" }}
                >
                  Proceed to Checkout
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cartpage;

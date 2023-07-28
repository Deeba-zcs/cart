"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

//import Card from "react-bootstrap/Card";

import {increase, decrease,remove,persistCart} from "src/app/Store/registerslice.js";

//import { BiSolidMessageAltAdd, BiSolidMessageAltMinus } from "react-icons/bi";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./addcart.css";

function Cartpage() {
  const isLoggedIn = useSelector((state) => state.signup.isLoggedIn);
  const currentUser = useSelector((state) => state.signup.currentUser);
  const cartUser = isLoggedIn ? currentUser[0]?.cartItems || [] : [];
  console.log("isLoggedIn", isLoggedIn);

  const products = useSelector((state) => state.signup.cartUser);
  console.log("Cartdisplay", products);

  const dispatch = useDispatch();

  


  const removeItem = (id) => {
    dispatch(remove(id));
    dispatch(updateUserCart({ userId: currentUser[0]?.id, cartItems: cartUser }));
  };

  const increaseQuantity = (id) => {
    dispatch(increase(id));
    dispatch(updateUserCart({ userId: currentUser[0]?.id, cartItems: cartUser }));
  };
  const decreaseQuantity = (id) => {
    const productToDecrease = products.find((product) => product.id === id);
    if (productToDecrease) {
      if (productToDecrease.quantity > 1) {
        dispatch(decrease(id));
       // dispatch(persistCart(cartProducts)); 
      } else {
    
        dispatch(deleteitem(id));
       // dispatch(persistCart(cartProducts)); 
      }
    } else {
      alert("Product not found in the cart.");
    }
  };

 
  const router = useRouter();

  const gotopayment = () => {
    if (isLoggedIn) {
      router.push("/Payment");
    } else {
      router.push("/signin");
    }
  };

  const cardss = products.map((product) => (
   
    <div className="row">
      <div className="col-md-8 cart">
        <div className="row border-top border-bottom">
          <div className="row main align-items-center">
            <div className="col-2">
              <Image src={product.image} width={80} height={100} />
            </div>
            <div className="col">
              <div className="row text-muted">{product.title}</div>
              <div className="row">INR: {product.price}/-</div>
            </div>
            <div className="col me-4">
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
            </div>
            <div className="col-4">
              <div className="row">
                <div className="col">
                  <span> INR:{(product.price * product.quantity).toFixed(2)}; </span>
                </div>
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
                  href="/Product"
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

'use client'
import React ,{useState}from "react";
import { useSelector,useDispatch } from "react-redux";
import {Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import {
  updateQuantity,
  removeItem,
} from "src/app/Store/registerslice.js";

function Cartpage() {
  const currentUser = useSelector((state) => state.signup.currentUser);
  const cartItems = JSON.parse(localStorage.getItem("cartState")) || {};
 
  const [userCartItems, setUserCartItems] = useState(cartItems[currentUser.id] || []);
  console.log(userCartItems);
  const dispatch = useDispatch();

  const updateLocalStorageCartItems = (cartItems) => {
    const existingCartItems = JSON.parse(localStorage.getItem("cartState")) || {};
    existingCartItems[currentUser.id] = cartItems;
    localStorage.setItem("cartState", JSON.stringify(existingCartItems));
  };
  const handleIncreaseQuantity = (item) => {
    console.log("firstincrease",item)
    console.log("firstincreasequatity",item.quantity)
    console.log("firstincreasequatityid",item.id)
    // Dispatch the action to increase the quantity of the item in the Redux store
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1,subitem:subitem+1 }));

    // Update the quantity of the item in the local state and local storage
    const updatedCartItems = userCartItems.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
console.log("updatedCartItems",updatedCartItems)
    setUserCartItems(updatedCartItems);
    updateLocalStorageCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (item,subitem) => {
    if (item.quantity > 1) {
      // Dispatch the action to decrease the quantity of the item in the Redux store
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1,subitem:subitem-1 }));

      // Update the quantity of the item in the local state and local storage
      const updatedCartItems = userCartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      );

      setUserCartItems(updatedCartItems);
      updateLocalStorageCartItems(updatedCartItems);
    }
  };
  const handleRemoveItem = (item) => {
    // Dispatch the action to remove the item from the Redux store
    dispatch(removeItem(item));
  
    // Get the current cart items from local storage
    const existingCartItems = JSON.parse(localStorage.getItem("cartState")) || {};

    // Get the cart items of the current user
    let updatedCartItems = existingCartItems[currentUser.id] || [];
  
    // Filter out the selected item from the cart
    updatedCartItems = updatedCartItems.filter((cartItem) => cartItem.id !== item.id);
  
    // Update the local storage with the updated cart items
    existingCartItems[currentUser.id] = updatedCartItems;
    localStorage.setItem("cartState", JSON.stringify(existingCartItems));
  
    // Update the userCartItems state with the filtered cart items
    setUserCartItems(updatedCartItems); // Make sure to set the updatedCartItems to the state
  
   
  };

  const subtotal =userCartItems
  .reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  )
  .toFixed(2);
const subitem = userCartItems.reduce(
  (accumulator, item) => accumulator + item.quantity,
  0
);
const gotopayment = () => {
  if (isLoggedIn) {
    router.push("/Payment");
  } else {
    router.push("/signin");
  }
};
  return (
    <>
   
      <div>Cart Items</div>
      {userCartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        userCartItems.map((item) => (
          <div className="row ms-5 me-0">
      <div className="col-md-8 cart">
        <div className="row border-top border-bottom">
          <div className="row main align-items-center">
            <div className="col-2">
              <Image src={item.image} width={80} height={100} />
            </div>
            <div className="col">
              <div className="row text-muted">{item.title}</div>
              <div className="row">INR:{item.price}/-</div>
            </div>
             <div className="col-3">
              <div className="col-3">
                <a href="#" className="border mx-2">
                  {item.quantity}
                </a>
                <a className="mx-2"href="#" onClick={() => handleIncreaseQuantity(item,subitem)}>
                  +
                </a>
                <a  className="mx-2" href="#" onClick={() =>handleDecreaseQuantity(item,subitem)}>
                  -
                </a>
              </div>
            </div> 
            <div className="col-4">
              <div className="row">
                <div className="col">
                  <span> INR:{(item.price * item.quantity).toFixed(2)}; </span>
                </div>
                <div className="col-1 ms-5">
                <Button className="bg-primary"style={{width:"80px"}} onClick={() =>handleRemoveItem(item)}>
                  Remove
                </Button></div>
                    </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
        ))
      )}

      <div className="container">
        <div className="row">
          <div className="col text-end my-3">
            <h2>Total Item:({subitem})</h2>
            <span>
              <h2>Subtotal: &#8377;{subtotal}</h2>
            </span>
            <br />
            {userCartItems.length > 0 && (
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

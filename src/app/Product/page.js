import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "src/app/Store/registerslice.js";
import { Card, Button } from "react-bootstrap";

function Productpage() {
  const currentUser = useSelector((state) => state.signup.currentUser);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch products from the API and store them in the state
    fetch("https://fakestoreapi.com/products")
      .then((data) => data.json())
      .then((result) => setItems(result));
  }, []);

  useEffect(() => {
    // Get the username from the currentUser and set it to the state
    setUsername(currentUser.username);
  }, [currentUser]);

  const addToCartHandler = (product) => {
    // Dispatch the addToCart action with the product
    dispatch(addToCart(product));

    // Get the existing cart items from localStorage (if any)
    const existingCartItems = localStorage.getItem("cartState");
    const cartItems = existingCartItems ? JSON.parse(existingCartItems) : {};

    // Save the cart item with the user's login ID as the key in localStorage
    cartItems[currentUser.id] = cartItems[currentUser.id] || [];
    cartItems[currentUser.id].push(product);

    // Save the updated cartItems object to localStorage
    localStorage.setItem("cartState", JSON.stringify(cartItems));
  };

  const cards = items.slice(0, 10).map((product) => (
    <div className="col-lg-3 mt-3" key={product.id}>
      <Card className="h-100">
        <Card.Body>
          <div className="text-center">
            <Card.Img
              variant="top"
              src={product.image}
              style={{ width: "90px", height: "150px" }}
            />
          </div>
          <div className="text-center mt-3">
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>INR: {product.price}</Card.Text>
          </div>
        </Card.Body>
        <Card.Footer className="text-center">
          <Button
            variant="primary"
            className="text-center"
            onClick={() => addToCartHandler(product)}
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

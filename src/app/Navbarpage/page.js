'use client'
import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { logout } from "src/app/Store/registerslice.js"; // Import the logout action

function Navbarpage() {
  const cartProducts = useSelector((state) => state.signup.cartUser);
  const isLoggedIn = useSelector((state) => state.signup.isLoggedIn);
  const username = useSelector((state) => state.signup.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Redux Toolkit</Navbar.Brand>
          <Nav className="me-auto"></Nav>
          {isLoggedIn ? (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="px-2 text-white">Hello {username?.username}</Navbar.Text>

              <Navbar.Text>
                <Link href="/Cart" passHref className="text-white text-decoration-none">
                  <BsFillCartPlusFill size={24} /> <sup>{cartProducts.length}</sup>{" "}
                </Link>
              </Navbar.Text>
              <Navbar.Text className="text-white">
                <Link
                  href="/"
                  passHref
                  className="text-white text-decoration-none mx-3"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </Navbar.Text>
            </Navbar.Collapse>
          ) : (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Link href="/signin" passHref className="text-white text-decoration-none mx-2">
                  Login
                </Link>
              </Navbar.Text>
              <Navbar.Text>
                <Link href="/Cart" passHref className="text-white text-decoration-none">
                  <BsFillCartPlusFill size={24} /> <sup>{cartProducts.length}</sup>{" "}
                </Link>
              </Navbar.Text>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarpage;

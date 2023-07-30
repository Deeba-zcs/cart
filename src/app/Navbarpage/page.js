'use client'
import { useSelector } from "react-redux";
import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { logout } from "src/app/Store/registerslice.js"; // Import the logout action
import React, { useEffect ,useState} from "react";

function Navbarpage() {

 const isLoggedIn = useSelector((state) => state.signup.isLoggedIn);
  const username = useSelector((state) => state.signup.username);
  const subitem = useSelector((state) => state.signup.subitem);
console.log("state.subitem",subitem)
  const router=useRouter()
  const dispatch = useDispatch();
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartState")) || {};
    const userCartItems = cartItems[username?.id] || [];
    setCartLength(userCartItems.length);
  }, []);

 
 
  const handleLogout = () => {
  
    dispatch(logout());

    router.push("/");
  };
 
  
 
  console.log("userCartItemsstate",cartLength)
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
                  <BsFillCartPlusFill size={24} /> <sup>{cartLength}</sup>{" "}
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
                <Link href="/" passHref className="text-white text-decoration-none mx-2">
                  Login
                </Link>
              </Navbar.Text>
              <Navbar.Text>
                <Link href="/Cart" passHref className="text-white text-decoration-none">
                <BsFillCartPlusFill size={24} /> <sup>{0}</sup>{" "}
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

"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Router, { useRouter } from "next/navigation";
import Productpage from "../Product/page";



function HomePage() {
  const currentUser = useSelector((state) => state.signup.currentUser);

  const isLoggedIn = useSelector((state) => state.signup.isLoggedIn);
  console.log("cu",currentUser)
  const [userData, setUserData] = useState(null);
  const router=useRouter()
   useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    console.log("savedusr",savedUserData)
    const registeredUsers = savedUserData ? JSON.parse(savedUserData) : [];
    const userExists = registeredUsers.find(
      (user) => user.username === currentUser.username
    );
    console.log("userexist",userExists)
    if (isLoggedIn ) {
     
      setUserData(userExists);
    }
  }, []);

  const clickUser = () => {
    router.push("/RegisteredUser");
  };
 // console.log("userdataa",userData)
  return (
    <>
      <div>
      
        {userData && (
          <div>
          <h1>User Details</h1>
            <p>User Name: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phone}</p>
            <p>Name: {userData.name}</p>
            <p>ID: {userData.id}</p>
          </div>)}
        {/* ) : (
          <p>Please log in to view your details.</p>
        )} */}
      </div>

      <Productpage/>
      <div className="text-center mt-5">
      <Button  onClick={()=>clickUser()}>Click to view registered User</Button></div>
    
    </>
  );
}

export default HomePage;
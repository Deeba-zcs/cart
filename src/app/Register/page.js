"use client";
import React, { useState } from "react";

import { Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation"

import Image from "next/image";
import { useDispatch } from "react-redux";
import { register } from "src/app/Store/registerslice.js";
function page() {
  const dispatch = useDispatch();
  const router=useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName] = useState("");
  const [phone, setPhone] = useState("");
  const [uid, setid] = useState(1);
  console.log("email", email);

  const handleSubmitform =  (e) => {
    console.log("userData");
    e.preventDefault();
    const usedata = ( JSON.parse(localStorage.getItem("userData"))) || [];
    const isUsernameTaken = usedata.some(
      (userData) => userData.username === username
    );
    if (isUsernameTaken) {
      alert("Username is already registered  try another username");
      setUsername("");
      setEmail("");
      setName("");
      setPhone("");
      setPassword("");
      return;
    }
    

   else{
    ;
    const userData = {  id: Math.floor(Math.random(0,100)*100).toString(),username, email,password,name,phone};
     console.log("Arr",userData,);
     usedata.push(userData);
   
    dispatch(register(userData));

    localStorage.setItem("userData", JSON.stringify(usedata));}
    alert("You have been successfully registered now you may login");
    setUsername("");
    setEmail("");
    setName("");
    setPhone("");
    setPassword("");
    router.push("/Homepage")
  };

  return (
    <>
     
        <div className="container" style={{marginTop:"100px"}}>
          <div className="row  justify-content-center">
            <div className="col-11 col-md-6 col-lg-6 ">
              <div className="card shadow">
                <div className="card-body mx-auto" style={{  borderBottom: "none"}}>
                 
                    <span className="company__logo">
                
                    </span>
                    <h6 className="company_title text-primary text-center">
                      Codentic Software
                    </h6>
                 
                  <h4 className="card-title mt-3 text-center">
                    Create Account
                  </h4>
                  <p className="text-center">
                    Get started with your free account
                  </p>

                
                  <form onSubmit={handleSubmitform}>
                    <div className="form-group input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          {" "}
                          <i className="fa fa-user"></i>{" "}
                        </span>
                      </div>
                      <input
                        name=""
                        className="form-control"
                        placeholder="username "
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          {" "}
                          <i className="fa fa-user"></i>{" "}
                        </span>
                      </div>
                      <input
                        name=""
                        className="form-control"
                        placeholder="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          {" "}
                          <i className="fa fa-envelope"></i>{" "}
                        </span>
                      </div>
                      <input
                        name=""
                        className="form-control"
                        placeholder="Email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          {" "}
                          <i className="fa fa-user"></i>{" "}
                        </span>
                      </div>
                      <input
                        name=""
                        className="form-control"
                        placeholder="phone"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="form-group input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          {" "}
                          <i className="fa fa-lock"></i>{" "}
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Create password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {/* <div className="form-group input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                      </div>
                      <input className="form-control" placeholder="Repeat password" type="password"/>
                    </div> */}
                    {/* <div className="form-check d-flex justify-content-center mx-1 mt-2 mb-4">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" style={{borderColor:"black"}}/>
                    <label className="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div> */}
                    <div className="form-group mt-3 text-center mb-2">
                      <Button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                      
                        Register
                      </Button>
                    </div>
                    {/* <div className=" row mt-3">
                      <div className="col-lg-6">
                        <Link href="" className="btn btn-block btn-info">
                          login via <i className="fab fa-twitter "></i>
                        </Link>
                      </div>
                      <div className="col-lg-6">
                        <Link href="" className="btn btn-block btn-primary">
                          login via <i className="fab fa-facebook "></i>
                        </Link>
                      </div>
                    </div> */}
                    <p className="text-center">
                      Have an account?
                      <Link href="/signin">Log In</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
   
    </>
  );
}

export default page;

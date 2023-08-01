"use client";
import React from "react";

import { useSelector } from "react-redux";

function RegisteredUserList() {
   const usedata = JSON.parse(localStorage.getItem("userData")) || [];

  let count = 1;
  // console.log("registerd user", usedata);
  return (
    <>
     <h1 className=" d-flex justify-content-center">Registered Users List</h1>
     <div className=" d-flex justify-content-center">
<table style={{ border: "2px solid red", borderCollapse: "collapse" }}>
  <thead className="text-primary" style={{ border: "1px solid red" }}>
    <tr>
      <th style={{ border: "1px solid blue" }}>Sr.</th>
      <th style={{ border: "1px solid blue" }}>Name</th>
      <th style={{ border: "1px solid blue" }}>Phone</th>
      <th style={{ border: "1px solid blue" }}>Email</th>
      <th style={{ border: "1px solid blue" }}>UserName</th>
    </tr>
  </thead>
  <tbody>
    {usedata.map((user, index) => (
      <tr key={index} style={{ border: "1px solid blue" }}>
        <td style={{ border: "1px solid blue" }}>{index + 1}</td>
        <td style={{ border: "1px solid blue" }}>{user.name}</td>
        <td style={{ border: "1px solid blue" }}>{user.phone}</td>
        <td style={{ border: "1px solid blue" }}>{user.email}</td>
        <td style={{ border: "1px solid blue" }}>{user.username}</td>
      </tr>
    ))}
  </tbody>
</table></div>




    </>
  );
}

export default RegisteredUserList;
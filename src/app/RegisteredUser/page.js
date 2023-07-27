"use client";
import React from "react";

import { useSelector } from "react-redux";

function RegisteredUserList() {
   const usedata = JSON.parse(localStorage.getItem("userData")) || [];
 // const currentUser = useSelector((state) => state.signup.users ||[]);
  let count = 1;
  // console.log("registerd user", usedata);
  return (
    <>
      <h1>Registered Users List</h1>
      <thead className="text-primary">
        <th>Sr.</th>
        <th>Name</th>

        <th>Phone</th>
        <th>Email</th>
        <th>UserName</th>
      </thead>
      {usedata.map((user) => (
        <>
          <tbody>
            <tr>
              <td>{count++}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
            </tr>
          </tbody>
        </>
      ))}
    </>
  );
}

export default RegisteredUserList;
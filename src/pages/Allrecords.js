//import React, { useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
//import { Container, Table } from "react-bootstrap";

import React from "react";
export default function Allrecords() {
  const items = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    items.push({ key, value });
    console.log(items );
  }

  return (
    <div className="row">
      {items.map((item) => (
        <div className="card mb-4" key={item.key}>
          <div className="card-body">
            <h5 className="card-title">{item.key}</h5>
            <p className="card-text">Im {item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

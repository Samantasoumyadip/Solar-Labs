import React from "react";
import "./App.css";
export default function Card({ title, children }) {
  return (
    <div className="review">
      <p> {title}</p>
      {children}
    </div>
  );
}
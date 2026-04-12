import React, { use, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { pizzaData } from "./data.js";
import "./index.css";
function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  const style = {};
  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}
function Menu() {
  const pizzas = pizzaData.length;
  return (
    <div className="menu">
      <h2>Our Menu</h2>
      {pizzas > 0 ? (
        <>
            <p>Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, all delicious.</p>
            <ul className="pizzas">
            {pizzaData.map((e) => (
                <Pizza pizza={e} key={e.name} />
            ))}
            </ul>
        </>
      ) : (
        <p>We're still working on our menu please come back later :)</p>
      )}
    </div>
  );
}
function Pizza({pizza}) {
  return (
    <li className={`pizza ${pizza.soldOut ? 'sold-out' : ''}`}>
      <img src={pizza.photoName} alt={pizza.name} />
      <div>
        <h3>{pizza.name}</h3>
        <p>{pizza.ingredients}</p>
        {pizza.soldOut ? <span>SOLD OUT</span>  : <span>{pizza.price}$</span> }
      </div>
    </li>
  );
}

function Footer() {
  const hours = new Date().getHours();
  const openHour = 8;
  const closeHour = 21;
  const isOpen = hours >= openHour && hours < closeHour;

  return (
    <footer className="footer">
      {isOpen ? <Order close={closeHour}/> : <p>We're happy to welcome you between {openHour}:00  and {closeHour}:00</p>}
    </footer>
  );
}
function Order({close}){
    return<div className="order">
          <p>
            We're open until {close}:00. come visit us or order online
          </p>
          <button className="btn">order</button>
        </div>
}

// V18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// React before V18

//! React.render(<App/>,document.getElementById('root'))

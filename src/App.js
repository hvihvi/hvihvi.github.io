import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import AboutUs from "./about/AboutUs";
import Knees from "./knees/Knees";
import Home from "./home/Home";
import Button from "./components/Button";

const App = ({ className }) => (
  <div className={className}>
    <BrowserRouter>
      <>
        <NavBar
          links={[
            <Button exact to="/">Home</Button>,
            <Button to="/knees">Knees</Button>,
            <Button to="/about">About Us</Button>
          ]}
        >
          <Route exact path="/" component={Home} />
          <Route exact path="/knees" component={Knees} />
          <Route exact path="/about" component={AboutUs} />
        </NavBar>
      </>
    </BrowserRouter>
  </div>
);

export default App;

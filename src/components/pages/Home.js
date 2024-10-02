import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="background">
      <div className="maintext">
        Unpacking The future <br /> of Education
      </div>
      <div className="footer">
        <div className="about">
          <Link to="/about">About</Link>
        </div>

        <div className="testimonies">
          <Link to="/testimonials">Testimonials</Link>
        </div>

        <div className="pricing">
          <Link to="/allproducts">Pricing</Link>
        </div>

        <div className="featured">Featured</div>
      </div>
    </div>
  );
};

export default Home;

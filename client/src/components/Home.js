/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
		Home<br />
    <Link to="/login">Login</Link>
    <br />
    <Link to="/register">Register</Link>
  </div>
);

export default Home;

import React from 'react';

const Login = () => (
  <form method="post" action="/api/login">
    <label htmlFor="username">Username</label>
    <input type="text" name="username" id="username" />
    <br />
    <label htmlFor="password">Password</label>
    <input type="password" name="password" id="password" />
    <br />
    <button type="submit">Submit</button>
  </form>
);

export default Login;

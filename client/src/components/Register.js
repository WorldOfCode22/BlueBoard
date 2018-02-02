import React from 'react';

const Register = () => (
  <form method="post" action="/api/register">
    <label htmlFor="username">Username</label>
    <input type="text" name="username" id="username" />
    <br />
    <label htmlFor="password">Password</label>
    <input type="password" name="password" id="password" />
    <br />
    <label htmlFor="firstName">First Name</label>
    <input type="text" name="firstName" id="firstName" />
    <br />
    <label htmlFor="lastName">Last Name</label>
    <input type="text" name="lastName" id="lastName " />
    <br />
    <label htmlFor="organization">Organization</label>
    <input type="text" name="organization" id="organization" />
    <br />
    <button type="submit">Submit</button>
  </form>
);

export default Register;

import React from 'react'
import {Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage.js';
import img from '../assets/images/not-found.svg';
const Error = () => {
  const error = useRouteError();
  if (error.status===404){
     return <Wrapper>
      <div>
        <img src={img} alt="not found"/>
        <h3>ohh! page not found</h3>
        <p>we cant seem to find your page</p>
        <Link to='/dashboard'>back home</Link>
      </div>
     </Wrapper>
  }
  return (
    <div>
  <h3>something went wrong</h3>
  <Link to="/">back home</Link>
  </div>
  )
};

export default Error;

import React from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/LandingPage';


const Landing = () => {
  return (
    <Wrapper>
      <nav>
        
      </nav>
      <div className="container-page">
        <div className="info">
          <h1>
            Task<span>Manager</span>app
          </h1>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn ">
            Login / Demo User
          </Link>
        </div>
        {/* <img src={main} alt="job hunt" className='img main-img'/> */}
      </div>
    </Wrapper>
  );
};

export default Landing;

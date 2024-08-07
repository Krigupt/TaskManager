import React from 'react'
import {FaAlignLeft} from 'react-icons/fa';
import Wrapper from '../assets/wrappers/Navbar';

import { useDashboardContext } from '../pages/DashboardLayout';
import LogoutContainer from './Logout';
import { Link } from 'react-router-dom';
const Navbar = () => {
    //we are calling the togglesidebar fucntiuon from the dashboard
    
  return (
    <Wrapper>
      <div className='nav-center'>
        <div>
           
            <h4 className='logo-text'>dashboard</h4>
        </div>

<Link to="/dashboard" className="logo-text">
      <h4>Add task</h4>
    </Link>

        <div className='btn-container'>
           <LogoutContainer />
        </div>
        
      </div>
    </Wrapper>
  )
};
export default Navbar;
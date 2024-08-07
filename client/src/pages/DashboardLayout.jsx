import {createContext,useState,React, useContext} from 'react';
import { Outlet,redirect, useLoaderData,useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard';
import {Navbar} from '../Components';
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';

//creating the loader to fetch the user 
export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/current-user');
    return data;
  } catch (error) {
    return redirect('/');
  }
};




//easy way for prop drilling
const DashboardContext = createContext()

const DashboardLayout = () => {

const {user} =  useLoaderData();
const navigate = useNavigate()


  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');
  };

  return (
<DashboardContext.Provider value={{user,logoutUser}}>
    <Wrapper>
      <main className='dashboard'>
           <div>
          <Navbar/>
            <div className='dashboard-page'>
              <Outlet context={{ user }} /> 
              </div>
           </div>
        </main>
    </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext =()=>useContext(DashboardContext);

export default DashboardLayout

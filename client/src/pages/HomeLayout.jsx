import React from 'react'
//here outlet is used so that we can view all the children which we have passed in this parent class.
import { Outlet } from 'react-router-dom'
const HomeLayout = () => {
  return (
  <div>
      <Outlet/>
    </div>
  )
};

export default HomeLayout;
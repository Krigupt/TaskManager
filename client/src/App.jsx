import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  DashboardLayout,
  Register,
  Login,
  HomeLayout,
  Landing,
  Error,
  AddTask,
  EditTask,
  AllTasks
} from './pages';

import {action as registerAction} from './pages/Register'
import {action as loginAction} from './pages/Login'
import {loader as dashboardloader} from './pages/DashboardLayout'
import {loader as Alltaskloader} from './pages/AllTasks'
import {action as addtaskaction} from './pages/AddTask'
import { loader as edittaskLoader } from './pages/EditTask';
import { action as edittaskaction } from './pages/EditTask';
import { action as DeletetaskAction } from './pages/Deletetask';
// Create routers
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />, // Error page for routing errors
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'login',
        element: <Login />,
        action:loginAction
      },
      {
        path: 'register',
        element: <Register />,
        action:registerAction
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader:dashboardloader,
        children: [
          {
            index: true,
            element: <AddTask />,
            action:addtaskaction
          },
           {
            path: 'edit-task/:id',
            element: <EditTask />,
            loader:edittaskLoader,
            action:edittaskaction ,
          } ,
           {
            path: 'all-task',
            element: <AllTasks />,
            loader:Alltaskloader,
          },
          {path:"delete-task/:id",
           action:DeletetaskAction
        },
        ]
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

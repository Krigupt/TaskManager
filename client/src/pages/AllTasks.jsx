import React from 'react'
import { toast } from 'react-toastify';
import  {Container,Search} from '../Components' 
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';


export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data } = await customFetch.get('/jobs',{params});
    return {data};
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AlltaskContext = createContext()
const AllTasks = () => {
    const { data } = useLoaderData();
  return (
    <AlltaskContext.Provider value={{ data }}>
    <Search/>
      <Container />
    </AlltaskContext.Provider>
  )
}


export const useAlltasksContext = () => useContext(AlltaskContext);
export default AllTasks;


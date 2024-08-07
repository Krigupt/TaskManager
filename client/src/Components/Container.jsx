import React from 'react';
import Task from './Tasks';  // Ensure this import is correct and matches the component name
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAlltasksContext } from '../pages/AllTasks';

const Container = () => {
  const { data } = useAlltasksContext();
  console.log(data);

  // Ensure data is properly accessed
  const tasks = data?.tasks || []; // Assuming data contains an object with a "tasks" array

  return (
    <Wrapper>
      <div className='jobs'>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task key={task._id} {...task} />  // Use the Task component to render each task
          ))
        ) : (
          <h2>No tasks to display...</h2>  // Message when there are no tasks
        )}
      </div>
    </Wrapper>
  );
};

export default Container;

import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { Link,Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './Taskinfo'; // Ensure TaskInfo is correctly defined and exported
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

const Task = ({ _id, task, completed, createdAt }) => {
  const date = dayjs(createdAt).format('MMM Do, YYYY');
  const JobStatus = completed ? 'completed' : 'pending'; // Determine status

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{task.charAt(0)}</div>
        <div className='info'>
         
          <h3>{task}</h3>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaCalendarAlt />} text={date} />
           <h5 className={`status ${JobStatus}`}>{JobStatus.charAt(0).toUpperCase() + JobStatus.slice(1)}</h5> {/* Display status */}
        </div>
        <footer className='actions'>
          <Link to={`../edit-task/${_id}`} className='btn edit-btn'>Edit</Link>
          <Form method='post' action={`../delete-task/${_id}`}>
  <button type='submit' className='btn delete-btn'>
    Delete
  </button>
</Form>
          
        </footer>
      </div>
    </Wrapper>
  );
};

export default Task;

import React from 'react';
import { FormRow } from '../Components';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useOutletContext } from 'react-router-dom';


// Action function to handle form submission
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/jobs', data);
    toast.success('Task added successfully');
    return redirect('/dashboard/all-task');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const TaskManager = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Add Task</h4>
        <div className='form-center'>
          <FormRow type='text' name='task' labelText='task' />
          <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default TaskManager;

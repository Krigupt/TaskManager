
import { FormRow } from '../Components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = async ({ params }) => {
 
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`); // Adjusted to `/tasks` based on your schema
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect('/dashboard/all-task'); // Ensure this route matches your app's routes
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
   data.completed = data.completed === 'on';
  try {
    await customFetch.patch(`/jobs/${params.id}`, data); // Adjusted to `/tasks` based on your schema
    toast.success('Task edited successfully');
    return redirect('/dashboard/all-task'); // Ensure this route matches your app's routes
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
  return null;
};

const EditTask = () => {
  const { task } = useLoaderData();
  
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Edit Task</h4>
        <div className='form-center'>
          
          <FormRow
            type='text'
            name='task'
            labelText='task'
            defaultValue={task.task}
          />
          <div className='form-control'>
            <label htmlFor='completed'>Mark Completed</label>
            <input
              type='checkbox'
              id='completed'
              name='completed'
              defaultChecked={task.completed}
            />
          </div>
          <button
            type='submit'
            className='btn btn-block form-btn'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditTask;

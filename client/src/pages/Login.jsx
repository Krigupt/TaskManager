import {FormRow,Logo} from '../Components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch.js';



//this is the function of action
export const action = async ({ request }) => {
  //here we are requesting the formData
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  //after registering we are getting redirected to login page.
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};



const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form'>
       
        <h4>Login</h4>
        
        <FormRow type='email' name='email' />

        <FormRow type='password' name='password' />

        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <p>
          Not a member?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login

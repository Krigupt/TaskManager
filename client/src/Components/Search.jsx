import { FormRow, SubmitBtn } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';

import { useAlltasksContext} from '../pages/AllTasks';

const Search = () => {
  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          {/* search position */}
          <FormRow type='text' name='task' />

          <FormRow
            type='select'
            name='completed'
            labelText='Task Status'
            options={[
              { value: '', label: 'All' },
              { value: 'true', label: 'Completed' },
              { value: 'false', label: 'Pending' },
            ]}
          />



          <Link to='/dashboard/all-task' className='btn form-btn delete-btn'>
            Reset Search Values
          </Link>
          {/* TEMP!!!! */}
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Search;
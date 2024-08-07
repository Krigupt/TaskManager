import React from 'react';

const FormRow = ({ type, name, labelText, defaultValue, options }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      {type === 'select' ? (
        <select id={name} name={name} className='form-input' defaultValue={defaultValue || ''}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} id={name} name={name} className='form-input' defaultValue={defaultValue || ''} />
      )}
    </div>
  );
};

export default FormRow;


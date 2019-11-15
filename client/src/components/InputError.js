import React from 'react';

function InputError({ errorMessage }) {
  return (
    <p
      style={{
        color: 'red',
        margin: 0
      }}
    >
      {errorMessage}
    </p>
  );
}

export default InputError;

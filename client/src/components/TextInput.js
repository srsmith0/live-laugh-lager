import React from 'react';

const TextInput = (props) => {
  return (
    <div>
      <p>{props.label}</p>
      {props.textarea ? (<textarea {...props.useFormInput} />) :
        (<input {...props.useFormInput} />)
      }
    </div>
  )
}

export default TextInput;
import React, { useState } from 'react';
import { Form } from '../components/Form';
import TextInput from '../components/TextInput';
import { useFormInput }from '../customHooks/useFormInput';
import { Button, Segment } from 'semantic-ui-react';

export default function PostForm (props) {
  const title = useFormInput ('', 'title');
  const content = useFormInput ('', 'content');

  const handleSubmit = (e) => {
    props.add({title: title.value, content: content.value })
  }
  
  return (
    <>
    <Form header="Add a Post" onSubmit={handleSubmit}>
      <TextInput label="Title" useFormInput={title} />
      <br />
      <TextInput label="Content" useFormInput={content} textarea />
      <Button style={{marginTop:"10px"}}>Submit</Button>
    </Form>
    <br />
    <Button onClick={props.history.goBack}>Go Back</Button>
    </>
    
  )
}
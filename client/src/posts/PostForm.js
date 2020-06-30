import React, { useState } from 'react';
import { Form } from '../components/Form';
import TextInput from '../components/TextInput';
import { useFormInput }from '../customHooks/useFormInput';

export default function PostForm (props) {
  const title = useFormInput ('', 'title');
  const content = useFormInput ('', 'content');

  const handleSubmit = (e) => {
    props.add({title: title.value, content: content.value })
  }
  
  return(
    <Form header="Add a Post" onSubmit={handleSubmit}>
      <TextInput label="title" useFormInput={title} />
      <TextInput label="content" useFormInput={content} textarea />
    </Form>
  )
}
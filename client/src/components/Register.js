import React from 'react';
import { AuthConsumer } from '../providers/AuthProvider';
import { Button, Form, Segment, Header } from 'semantic-ui-react';

class Register extends React.Component {
  state = {email: '', password: '', passwordConfirmation: '' };

  handleSubmit = (e) => {
    const { email, password, passwordConfirmation } = this.state;
    const { auth: { handleRegister }, history } = this.props;

    if (password === passwordConfirmation)
    handleRegister({email, password, passwordConfirmation }, history);
    else 
    alert("Passwords Do Not Match!")
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState ({ [name]: value });
  }

  render () {
    const { email, password, passwordConfirmation } = this.state;

    return (
      <Segment>
        <Header as='h1' textAlign='center'>Five 'o' Clock</Header>
        <Header as='h3' textAlign='center'>Register</Header>
        <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label='Email'
          autoFocus
          required
          type='email'
          name='email'
          value={email}
          placeholder='Email'
          onChange={this.handleChange}
          />
          <Form.Input
          label='Password'
          required
          name='password'
          type='password'
          value={password}
          placeholder='Password'
          onChange={this.handleChange}
          />
          <Form.Input
          label='Password Confirmation'
          required
          name='passwordConfirmation'
          type='password'
          value={passwordConfirmation}
          placeholder='Password Confirmation'
          onChange={this.handleChange}
          />
          <Segment textAlign='center'>
            <Button primary type='submit'>Submit</Button>
          </Segment>
        </Form>
      </Segment>
    )
  }
};

export default class ConnectedRegister extends React.Component {
  render () {
    return (
      <AuthConsumer>
        { auth => <Register {...this.props} auth={auth} />}
      </AuthConsumer>
    )
  }
}
import React, { useState } from 'react';
import { Form, Rating, Header, Segment, Button } from 'semantic-ui-react';
import Axios from 'axios';
import { AuthConsumer } from '../providers/AuthProvider';

//Want to add details of beer, the brewery (from api call?),
// rating of each part, compiled rating, and description
const ReviewForm = (props) => {
  const [name, setName] = useState('')
  const [brewery, setBrewery] = useState('')
  const [style, setStyle] = useState('')
  const [app, setApp] = useState('')
  const [aroma, setAroma] = useState('')
  const [flavor, setFlavor] = useState('')
  const [overall, setOverall] = useState('')
  
  const review = {name, brewery, style}

  async function handleSubmit(e) {
    e.preventDefault();
    let res = await Axios.post(`/api/users/${props.auth.user.id}/reviews`, review)
    props.history.push('/profile')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Header as='h2' textAlign='center' style={{marginTop:'15px'}}>Beer Review</Header>
      <Segment horizontal>
        <div style={styles.form}>
        <Form.Input 
          label='Beer Name'
          name='name'
          required
          value={name}
          style={{width:"25%"}}
          onChange={(e) => setName(e.target.value) }
        />
          <Form.Input 
          label='Brewery Name'
          name='brewery'
          required
          value={brewery}
          style={{width:"25%"}}
          onChange={(e) => setBrewery(e.target.value) }
        />
          <Form.Input 
          label='Style'
          name='style'
          value={style}
          style={{width:"25%"}}
          onChange={(e) => setStyle(e.target.value) }
        />
        </div>
        <div style={styles.ranking}>
        {/* has onRate function to use.  Compile all rankings */}
       <div>
       <Header as="h3">Appearance</Header>
       <Rating 
       icon='heart' 
       onRate={(e) => console.log(e)} 
       defaultRating={0} 
       maxRating={5}
        />
       </div>
       <div>
       <Header as="h3">Aroma</Header>
       <Rating icon='heart' onRate defaultRating={0} maxRating={5} />
       </div>
       <div>
       <Header as="h3">Flavor</Header>
       <Rating icon='heart' onRate defaultRating={0} maxRating={5} />
       </div>
       <div>
       <Header as="h3">Mouthfeel</Header>
       <Rating icon='heart' onRate defaultRating={0} maxRating={5} />
       </div>
       {/* Overall ranking will be here */}
       </div>
       </Segment>
       <Button onClick={props.history.goBack}>Go Back</Button>
       <Button>Submit</Button>
    </Form>
   
    
  
  )
}

function ConnectedReviewForm (props) {
    return (
      <AuthConsumer>
        { (auth) => <ReviewForm {...props} auth={auth} />}
      </AuthConsumer>
    )
  }

export default ConnectedReviewForm;

const styles={
  form: {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  },
  ranking: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gridTemplateGap: "200px"
  }
}
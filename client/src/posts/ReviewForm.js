import React, { useState } from 'react';
import { Form, Rating, Header, Segment, Button } from 'semantic-ui-react';

//Want to add details of beer, the brewery (from api call?),
// rating of each part, compiled rating, and description
const ReviewForm = (props) => {
  const [name, setName] = useState('')
  const [brewery, setBrewery] = useState('')
  const [style, setStyle] = useState('')

  return (
    <Form>
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
       <Rating icon='heart' onRate defaultRating={0} maxRating={5} />
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
    </Form>
   
    
  
  )
}

export default ReviewForm;

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
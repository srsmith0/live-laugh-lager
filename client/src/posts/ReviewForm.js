import React, { useState } from 'react';
import { Form, Rating, Header, Segment } from 'semantic-ui-react';

//Want to add details of beer, the brewery (from api call?),
// rating of each part, compiled rating, and description
const ReviewForm = () => {
  const [name, setName] = useState('')
  const [brewery, setBrewery] = useState('')
  const [style, setStyle] = useState('')

  return (
    <Form>
      <Segment horizontal>
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
        <div>
        {/* has onRate function to use.  Compile all rankings */}
        <Header as="h3">Appearance</Header>
       <Rating icon='heart' defaultRating={0} maxRating={5} />
       <Header as="h3">Aroma</Header>
       <Rating icon='heart' defaultRating={0} maxRating={5} />
       <Header as="h3">Flavor</Header>
       <Rating icon='heart' defaultRating={0} maxRating={5} />
       <Header as="h3">Mouthfeel</Header>
       <Rating icon='heart' defaultRating={0} maxRating={5} />
       </div>
       </Segment>
    </Form>
  )
}

export default ReviewForm;
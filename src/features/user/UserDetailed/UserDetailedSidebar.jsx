import React, { Fragment } from 'react'
import { Grid, Segment, Button } from 'semantic-ui-react'

const UserDetailedSidebar = () => {
  return (
    <Fragment>
      <Grid.Column width={4}>
          <Segment>
            <Button color='teal' fluid basic content='Edit Profile' />
          </Segment>
        </Grid.Column>
    </Fragment>
  )
}

export default UserDetailedSidebar

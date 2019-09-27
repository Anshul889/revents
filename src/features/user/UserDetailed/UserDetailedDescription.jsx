import React, { Fragment } from 'react'
import { Grid, Segment, Header, List, Item, Icon } from 'semantic-ui-react'
import { format } from 'date-fns/';

const UserDetailedDescription = ({profile}) => {
  let createdAt;
  if (profile.createdAt) {
    createdAt = format(profile.createdAt.toDate(), 'EEEE do LLL');
  }
  return (
    <Fragment>
      <Grid.Column width={12}>
          <Segment>
            <Grid columns={2}>
              <Grid.Column width={10}>
                <Header icon='smile' content='About' />
                <p>
                  I am a: <strong>{profile.occupation || 'tbn'}</strong>
                </p>
                <p>
                  Originally from <strong>{profile.origin || 'tbn'}</strong>
                </p>
                <p>
                  Member Since: <strong>{createdAt}</strong>
                </p>
                <p>{profile.description}</p>
              </Grid.Column>
              <Grid.Column width={6}>
                <Header icon='heart outline' content='Interests' />
                {profile.interest ?
                <List>
                  {profile.interests && 
                    profile.interests.map((interest, index)=> (
                      <Item key={index}>
                        <Icon name='heart' />
                        <Item.Content>{interest}</Item.Content>
                      </Item>
                    ))}
                </List> : <p>No Interests</p>}
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
    </Fragment>
  )
}

export default UserDetailedDescription

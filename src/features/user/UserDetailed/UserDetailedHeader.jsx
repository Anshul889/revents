import React, { Fragment } from 'react';
import { Grid, Segment, Item, Header, Image } from 'semantic-ui-react';
import { differenceInYears } from 'date-fns/';
import LazyLoad from 'react-lazyload';

const UserDetailedHeader = ({ profile }) => {
  let age;
  if (profile.dateOfBirth) {
    age = differenceInYears(Date.now(), profile.dateOfBirth.toDate());
  }
  return (
    <Fragment>
      <Grid.Column width={16}>
        <Segment>
          <Item.Group>
            <Item>
              <LazyLoad
                height={150}
                placeholder={<Item.Image avatar size='small' src='/assets/user.png' />}>
                <Item.Image
                  avatar
                  size='small'
                  src={profile.photoURL || '/assets/user.png'}
                />
              </LazyLoad>

              <Item.Content verticalAlign='bottom'>
                <Header as='h1'>{profile.displayName}</Header>
                <br />
                <br />
                <Header as='h3'>{profile.occupation}</Header>
                <br />
                <br />
                <Header as='h3'>
                  {age || 'Unknown age'}, Lives in{' '}
                  {profile.city || 'Unknown city'}
                </Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Grid.Column>
    </Fragment>
  );
};

export default UserDetailedHeader;

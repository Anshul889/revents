/*global google*/
import React, { Component } from 'react';
import { Form, Segment, Button, Grid, Header } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';
import { connect } from 'react-redux';
import { createEvent, updateEvent, cancelToggle } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import { withFirestore } from 'react-redux-firebase';

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events.length > 0) {
    event = state.firestore.ordered.events.filter(event => event.id === eventId)[0] || {};
  }

  return {
    initialValues: event,
    event
  };
};

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
};

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired({ message: 'Please provide a category' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description' }),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
});

class EventForm extends Component {
  state = {
    cityLatLang: {},
    venueLatLng: {}
  };

  async componentDidMount() {
    const {firestore, match} = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const {firestore, match} = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  onFormSubmit = async values => {
    values.venueLatLng = this.state.venueLatLng;
    try {
      if (this.props.initialValues.id) {
        if(Object.keys(values.venueLatLng).length === 0) {
          values.venueLatLng = this.props.event.venueLatLng
        }
        this.props.updateEvent(values);
        this.props.history.push(`/event/${this.props.initialValues.id}`);
      } else {
        let createdEvent = await this.props.createEvent(values);
        this.props.history.push(`/event/${createdEvent.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('city', selectedCity);
      });
  };

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('venue', selectedVenue);
      });
  };

  render() {
    const { invalid, submitting, pristine, event, cancelToggle } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event Details' />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name='title'
                type='text'
                component={TextInput}
                placeholder='Give your event a name'
              />
              <Field
                name='category'
                type='text'
                component={SelectInput}
                options={category}
                placeholder='What is your event about'
              />
              <Field
                name='description'
                type='text'
                component={TextArea}
                rows={3}
                placeholder='Tell us about your event'
              />
              <Header sub color='teal' content='Event Location Details' />
              <Field
                name='city'
                type='text'
                component={PlaceInput}
                options={{ types: ['(cities)'] }}
                placeholder='Event City'
                onSelect={this.handleCitySelect}
              />
              <Field
                name='venue'
                type='text'
                component={PlaceInput}
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types: ['establishment']
                }}
                placeholder='Event Venue'
                onSelect={this.handleVenueSelect}
              />
              <Field
                name='date'
                type='text'
                component={DateInput}
                dateFormat='dd LLL yyyy h:mm a'
                timeFormat='HH:mm'
                showTimeSelect
                placeholder='Date and Time of Event'
              />
              <Button
                disabled={invalid || submitting || pristine}
                positive
                type='submit'>
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type='button'>
                Cancel
              </Button>
              <Button 
              type='button'
              color={event.cancelled ? 'green' : 'red'}
              floated='right'
              content={event.cancelled ? 'Reactivate event' : 'Cancel Event'}
              onClick={() => cancelToggle(!event.cancelled, event.id)}
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(
      EventForm
    )
  )
);

import React, { Component, Fragment } from 'react';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/event/EventForm/EventFom';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Route path='/' exact component={HomePage}/>
        <Container className="main">
          <Route path='/events' component={EventDashboard} />
          <Route path="/event/:id" component={EventDetailedPage} />
          <Route path='/people' component={PeopleDashboard} />
          <Route path='/profile/:id' component={UserDetailedPage} />
          <Route path='/settings' component={SettingsDashboard} />
          <Route path='/createEvent' component={EventForm} />
        </Container>
      </Fragment>
    );
  }
}
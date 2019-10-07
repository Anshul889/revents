import React from 'react';

const HomePage = ({history}) => {
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <img className="ui image massive" src="/assets/logo.png" alt="logo" />
            <div className="content">Re-vents</div>
          </h1>
          <ul style={{listStyle: 'none'}}>
            <li>Login and Register functionality using Firebase authentication</li>
            <li>Social login for Facebook and Google into the application</li>
            <li>Google maps and Places autocomplete integration</li>
            <li>Photo uploading using drag and drop, with resizing and cropping of the images before upload</li>
            <li>Live chat system</li>
            <li>Paging, Sorting and Filtering with Firestore</li>
            <li>Infinite scroll for the pagination</li>
            <li>Firestore database design</li>
            <li>Creating reusable form components with Redux forms</li>
          </ul>
          <div onClick={() => history.push('/events')} className="ui huge white inverted button">
            Get Started
            <i className="right arrow icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

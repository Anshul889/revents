import React, { Component } from 'react'
import { connect } from 'react-redux'
import {incrementCounter, decrementCounter} from './testActions';
import { Button } from 'semantic-ui-react';

const actions = {
  incrementCounter,
  decrementCounter
}

export class TestComponent extends Component {
  render() {
    const {data, incrementCounter, decrementCounter} = this.props;
    return (
      <div>
        <h1>Test Component</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} positive content="Increment"></Button>
        <Button onClick={decrementCounter} negative content="Decrement"></Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data : state.test.data
})



export default connect(mapStateToProps, actions)(TestComponent)


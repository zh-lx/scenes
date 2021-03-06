import React, { Component } from 'react';

class AutomaticBatching extends Component {
  state: { count: number };
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  handleClickButton = () => {
    Promise.resolve().then(() => {
      this.setState({
        count: this.state.count + 1,
      });
      console.log(this.state.count); // 1
    });
    this.setState({
      count: this.state.count + 1,
    });
    console.log(this.state.count); // 0
  };
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.handleClickButton}>增加</button>
      </div>
    );
  }
}

export default AutomaticBatching;

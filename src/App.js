import React, { Component } from "react";
import Login from "./Login";
import Description from "./Description";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="p-4 heading-4 text-center bg-light">ELOC Token</h1>
        <Description />

        <nav class="navbar navbar-expand-sm justify-content-center fixed-bottom bg-dark ">
          <ul class="navbar-nav">
            <div className="d-flex ">
              <div className="flex-grow-1"></div>
              <Login />
              <div className="flex-grow-1"></div>
            </div>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}
export default App;

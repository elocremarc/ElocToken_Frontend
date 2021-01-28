import React, {Component} from 'react';
import Login from './Login'
class App extends Component {

render() {

  return (

    <React.Fragment>  
    <div class="d-flex bg-secondary">
    <div id="heading" class="m-2 p-2 rounded text-light" ><h1 class="display-6">Web3 Login</h1></div>
    <div class="flex-grow-1"></div>

    <Login/>
      </div>
    </React.Fragment>  
  
  );
}
}
export default App;

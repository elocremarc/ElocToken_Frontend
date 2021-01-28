import React, {Component} from 'react';
import Web3 from 'web3'; 
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

class Login extends Component {


 handleClick = () => {
      const metamaskInstalled = typeof window.web3 !== 'undefined'
      let connected = true
      this.setState({connected})
      this.setState({metamaskInstalled})
       if(metamaskInstalled) {
       this.loadBlockchainData()
        }  
    }
    
 
  async loadBlockchainData()  {
    const web3 = new Web3(Web3.givenProvider)
    await window.ethereum.send('eth_requestAccounts');

    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    
    const balance = await web3.eth.getBalance(accounts[0])
    this.setState({balance: web3.utils.fromWei(balance, 'ether')})

  }
    constructor(props) {
    super(props)
    this.state = {account: " ", balance: ""}
  }




render() {

let login =
  <React.Fragment>  
     <div id="login" class="m-2 p-2">
        <div class="d-flex ">
        <div id="network" ></div>
        <div id="jazzicon" class="p-2  bg-light rounded-left"> <Jazzicon  diameter={25} seed={jsNumberForAddress(this.state.account)} /></div>
        <div id="address"class="p-2 bg-light" >{this.state.account.slice(0,5)}...{this.state.account.slice(-4)}</div>
        <div id="balance"class="p-2 rounded-right bg-primary text-light">{this.state.balance.slice(0,6)} ETH</div>
      </div>
  </div>

  </React.Fragment>

let notMeta =

  <React.Fragment>
    <div class="rounded p-4 m-2"> 
         <a href="https://metamask.io/" class="p-2 rounded bg-warning font-weight-bold" >Install Metamask</a></div>
  </React.Fragment>

let connectNow =
    <React.Fragment>    
        <button type='button' class='btn btn-primary m-4' onClick={this.handleClick}>Connect Wallet</button>  
    </React.Fragment>

  return (
   
    <React.Fragment>  
    
    { this.state.connected ? this.state.metamaskInstalled ? login : notMeta  : connectNow}
    
    </React.Fragment>  
  
  );
}
}
export default Login;

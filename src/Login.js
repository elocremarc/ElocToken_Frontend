import React, { Component } from "react";
import Web3 from "web3";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import ElocToken from "./abi/ElocToken.json";
import commaNum from "./commaNum";

class Login extends Component {
  handleClick = () => {
    const metamaskInstalled = typeof window.web3 !== "undefined";
    let connected = true;
    this.setState({ connected });
    this.setState({ metamaskInstalled });
    if (metamaskInstalled) {
      this.loadBlockchainData();
    }
  };

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider);
    await window.ethereum.send("eth_requestAccounts");

    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = ElocToken.networks[networkId];

    //if(networkData) {
    const token = new web3.eth.Contract(ElocToken.abi, networkData.address);
    this.setState({ token });

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const balance = web3.utils.fromWei(
      await token.methods.balanceOf(accounts[0]).call()
    );
    this.setState({ balance });

    const symbol = await token.methods.symbol().call();
    this.setState({ symbol });

    const claimed = await token.methods.claimed(accounts[0]).call();
    this.setState({ claimed });

    // const ethBalance = await web3.eth.getBalance(accounts[0]);
    // this.setState({ ethBalance: web3.utils.fromWei(balance, "ether") });

    this.setState({ loading: false });
  }
  constructor(props) {
    super(props);
    this.state = { account: " ", balance: "" };
  }

  render() {
    let login = (
      <React.Fragment>
        <div id="login" className="m-2 p-2">
          <div className="d-flex ">
            <div id="network"></div>
            {!this.state.claimed ? (
              <React.Fragment>
                <div className="pl-2"></div>
                <button
                  onClick={() => {
                    this.state.token.methods
                      .claim()
                      .send({ from: this.state.account })
                      .once("receipt", (receipt) => {
                        this.loadBlockchainData();
                      });
                  }}
                  className="btn bg-success text-light"
                >
                  Claim
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )}{" "}
            <div className="p-2"></div>
            <div id="jazzicon" className="p-2  bg-light rounded-left">
              {" "}
              <Jazzicon
                diameter={25}
                seed={jsNumberForAddress(this.state.account)}
              />
            </div>
            <div id="address" className="p-2 bg-light">
              {this.state.account.slice(0, 5)}...{this.state.account.slice(-4)}
            </div>
            <div
              id="balance"
              className="p-2 rounded-right bg-primary text-light"
            >
              {commaNum(this.state.balance)} {this.state.symbol}
            </div>
          </div>
        </div>
      </React.Fragment>
    );

    let notMeta = (
      <React.Fragment>
        <div className="rounded p-4 m-2">
          <a
            href="https://metamask.io/"
            className="p-2 rounded bg-warning font-weight-bold"
          >
            Install Metamask
          </a>
        </div>
      </React.Fragment>
    );

    let connectNow = (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-primary m-4"
          onClick={this.handleClick}
        >
          Connect Wallet
        </button>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {this.state.connected
          ? this.state.metamaskInstalled
            ? login
            : notMeta
          : connectNow}
      </React.Fragment>
    );
  }
}
export default Login;

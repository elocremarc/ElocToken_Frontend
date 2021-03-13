import React from "react";

export default function Description() {
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center">
        <p className="w-50 container pt-4 text-left">
          Claim 10 ELOC tokens. You need to change your wallet to the Kovan Test
          Network with Kovan ETH loaded in your wallet for gas fees. You can get
          Kovan test Ethereum from{" "}
          <a href="https://faucet.metamask.io/">here</a>.
        </p>
      </div>
    </React.Fragment>
  );
}

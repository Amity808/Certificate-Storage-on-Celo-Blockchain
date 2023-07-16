import React from "react";
import { Container, Nav } from "react-bootstrap";
import { useContractKit } from "@celo-tools/use-contractkit";
import { Notification } from "./components/ui/Notifications";
import Wallet from "./components/Wallet";
import Cover from "./components//minter/Cover";
import Certificates from './components/minter/nft';
import bg from './assets/nft_geo_cover.png'
import { useBalance, useMinterCertContract } from "./hooks";

import "./App.css";

const App = function AppWrapper() {
  const { address, destroy, connect } = useContractKit();
  const { balance, getBalance } = useBalance();
  const minterContract = useMinterCertContract();

  return (
    <>
      <Notification />
      {address ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              {/*display user wallet*/}
              <Wallet
                address={address}
                amount={balance.CELO}
                symbol="CELO"
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          {/* display cover */}
          <main>
            <Certificates 
              name="My Certificate Cloud"
              updateBalance={getBalance}
              minterContract={minterContract}/>
          </main>
        </Container>
      ) : (
        // display cover if user is not connected
        <div className="App">
          <header className="App-header">
            <Cover name="My Certificate Cloud" connect={connect} coverImg={bg} />
          </header>
        </div>
      )}
    </>
  );
};

export default App;

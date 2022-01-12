import React, { useState, useEffect } from "react";
import BuyerContract from "./contracts/Buyer.json";
import SellerContract from "./contracts/Seller.json";
import getWeb3 from "./getWeb3";
import Buyers from "./components/Buyers";
import Suppliers from "./components/Suppliers";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./App.css";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState();
  const [buyerContract, setBuyerContract] = useState();
  const [sellerContract, setSellerContract] = useState();

  useEffect(() => {
    async function getContracts() {
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instances.
      const networkId = await web3.eth.net.getId();
      const buyerDeployedNetwork = BuyerContract.networks[networkId];
      const buyerInstance = new web3.eth.Contract(
        BuyerContract.abi,
        buyerDeployedNetwork && buyerDeployedNetwork.address
      );
      const sellerDeployedNetwork = SellerContract.networks[networkId];
      const sellerInstance = new web3.eth.Contract(
        SellerContract.abi,
        sellerDeployedNetwork && sellerDeployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setWeb3(web3);
      setAccounts(accounts);
      setBuyerContract(buyerInstance);
      setSellerContract(sellerInstance);
      console.log(sellerInstance);
    }

    getContracts();
  }, []);

  // runExample = async () => {
  //   const { accounts, buyerContract, sellerContract } = this.state;

  //   console.log(accounts);
  //   console.log(buyerContract);
  //   console.log(sellerContract);

  //   // Stores a given value, 5 by default.
  //   // await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   // const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   // this.setState({ storageValue: response });
  // };

  return (
    <div className="App">
      <h1>Marketplace Dapp</h1>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            {web3 && accounts && buyerContract && sellerContract && (
              <Buyers
                web3={web3}
                accounts={accounts}
                buyerContract={buyerContract}
                sellerContract={sellerContract}
              />
            )}
          </Col>
          <Col xs={12} md={6}>
            {web3 && accounts && buyerContract && sellerContract && (
              <Suppliers
                web3={web3}
                accounts={accounts}
                buyerContract={buyerContract}
                sellerContract={sellerContract}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;

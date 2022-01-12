import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

class Suppliers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerContractMarketItems: [],
      buyerContractPurchasedItems: [],
    };
  }

  componentDidMount() {
    this.contractEventListeners();
  }

  contractEventListeners = () => {
    const { sellerContract, buyerContract } = this.props;

    sellerContract.events
      .ItemAdded({
        filter: {},
        fromBlock: 0,
      })
      .on("data", (event) => {
        console.log(event);
        this.setState({
          sellerContractMarketItems: [
            ...this.state.sellerContractMarketItems,
            {
              id: parseInt(event.returnValues.idItem.toString()),
              name: event.returnValues.itemName.toString(),
              price: parseInt(event.returnValues.price.toString()),
            },
          ],
        });
      })
      .on("error", console.error);

    buyerContract.events
      .OrderRaisedOrUpdated({
        filter: {},
        fromBlock: 0,
      })
      .on("data", (event) => {
        console.log(event);
        this.setState({
          buyerContractPurchasedItems: [
            ...this.state.buyerContractPurchasedItems,
            {
              id: parseInt(event.returnValues.idOrder.toString()),
              name: event.returnValues.itemName.toString(),
              quantity: parseInt(event.returnValues.quantity.toString()),
              status: event.returnValues.status,
            },
          ],
        });
      })
      .on("error", console.error);

    sellerContract.events
      .ProcessAnOrder({
        filter: {},
        fromBlock: 0,
      })
      .on("data", (event) => {
        console.log(event);
        this.setState((prevState) => ({
          buyerContractPurchasedItems:
            prevState.buyerContractPurchasedItems.map((item) =>
              item.id == event.returnValues.idOrder
                ? { ...item, status: event.returnValues.status }
                : item
            ),
        }));
        console.log(this.state);
      })
      .on("error", console.error);
  };

  addItem = async (e) => {
    e.preventDefault();
    const { accounts, sellerContract } = this.props;
    const itemName = e.target.elements.formItemName.value;
    const price = e.target.elements.formPrice.value;

    await sellerContract.methods.addItem(itemName, price).send(
      {
        from: accounts[0],
        gas: 200000,
      },
      function (err, result) {
        if (err) {
          console.error("[Supplier Contract] Error adding item", err);
        } else {
          console.log("[Supplier Contract] New item added", result);
        }
      }
    );
  };

  processOrder = async (itemId, customerId) => {
    const { accounts, sellerContract } = this.props;

    await sellerContract.methods.processOrder(itemId, customerId).send(
      {
        from: accounts[0],
        gas: 200000,
      },
      function (err, result) {
        if (err) {
          console.error("[Supplier Contract] Error processing an order", err);
        } else {
          console.log("[Supplier Contract] Order processed", result);
        }
      }
    );
  };

  render() {
    return (
      <Card>
        <Card.Header>Sell</Card.Header>
        <Card.Body>
          <Tabs defaultActiveKey="newListing" id="sell-tab">
            <Tab eventKey="newListing" title="New Listing">
              <Form onSubmit={this.addItem}>
                <Form.Group className="mb-3" controlId="formItemName">
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="What are you selling?"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label>Price (USD)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="How much do you want for it?"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  List on Market
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="prevListings" title="Your Listings">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.sellerContractMarketItems.map((item) => {
                    return (
                      <tr>
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                        <td>Remove</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="process" title="Process Orders">
              Orders to be processed
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.buyerContractPurchasedItems.map((item) => {
                    if (!item.status)
                      return (
                        <tr onClick={() => this.processOrder(item.id, 1)}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      );
                    else return null;
                  })}
                </tbody>
              </Table>
              Processed Orders
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.buyerContractPurchasedItems.map((item) => {
                    if (item.status)
                      return (
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      );
                    else return null;
                  })}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    );
  }
}

export default Suppliers;

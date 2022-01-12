import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

class Buyers extends Component {
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
    this.props.sellerContract.events
      .ItemAdded({
        filter: {}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0,
      })
      .on("data", (event) => {
        console.log(event); // same results as the optional callback above
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

    this.props.buyerContract.events
      .OrderRaisedOrUpdated({
        filter: {}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0,
      })
      .on("data", (event) => {
        console.log(event); // same results as the optional callback above
        this.setState({
          buyerContractPurchasedItems: [
            ...this.state.buyerContractPurchasedItems,
            {
              id: parseInt(event.returnValues.idOrder.toString()),
              name: event.returnValues.itemName.toString(),
              quantity: parseInt(event.returnValues.quantity.toString()),
              status: event.returnValues.status.toString(),
            },
          ],
        });
        console.log(this.state); // same results as the optional callback above
      })
      .on("error", console.error);
  };

  purchaseThisItem = async (itemName) => {
    const { accounts, buyerContract } = this.props;

    await buyerContract.methods.purchaseItem(itemName, 1).send(
      {
        from: accounts[0],
        gas: 200000,
      },
      (err, result) => {
        if (err) {
          console.error(
            "[Customer Contract] Error during purchasing an item",
            err
          );
        } else {
          console.log("[Customer Contract] - item purchased", result);
        }
      }
    );
  };

  render() {
    return (
      <Card>
        <Card.Header>Buy</Card.Header>
        <Card.Body>
          <Tabs defaultActiveKey="market" id="buy-tab">
            <Tab eventKey="market" title="Market">
              {this.state.sellerContractMarketItems.map((item) => {
                return (
                  <div>
                    <Card>
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>${item.price}</Card.Text>
                        {/* <InputGroup className="mb-3"> */}
                        {/* <Form.Select aria-label="quantity">
                            <option>Quantity</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </Form.Select> */}
                        <Button
                          variant="primary"
                          id="buttonPurchase"
                          onClick={() => this.purchaseThisItem(item.name)}
                        >
                          Purchase
                        </Button>
                        {/* </InputGroup> */}
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </Tab>
            <Tab eventKey="orders" title="Your Orders">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Order Processed</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.buyerContractPurchasedItems.map((item) => {
                    return (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.status ? "No" : "Yes"}</td>
                      </tr>
                    );
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

export default Buyers;

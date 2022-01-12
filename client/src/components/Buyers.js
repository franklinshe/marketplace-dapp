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
      buyerContract_blockchainRecordedPurchaseOrderIds: [],
    };
  }

  componentDidMount() {
    this.sellerContractEventListeners();
  }

  sellerContractEventListeners = () => {
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
  };

  sellerContract_getItem(idItem) {
    return this.props.sellerContract.methods
      .getItem(idItem)
      .call({ from: this.props.accounts[0] });
  }

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
                        <InputGroup className="mb-3">
                          <Form.Select aria-label="quantity">
                            <option>Quantity</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </Form.Select>
                          <Button
                            variant="primary"
                            id="buttonPurchase"
                            onClick={() =>
                              this.purchaseThisItem({
                                id: item.id,
                                itemName: item.name,
                                price: item.price,
                                quantity: 1,
                              })
                            }
                          >
                            Purchase
                          </Button>
                        </InputGroup>
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
                    <th>Seller</th>
                    <th>Item Name</th>
                    <th>Order Processed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2</td>
                    <td>Jane</td>
                    <td>Coffee Beans</td>
                    <td>Yes</td>
                  </tr>
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

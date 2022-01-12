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
      supplierContract_blockchainRecordedItemIds: [],
      customerContract_blockchainRecordedPurchaseOrderIds: [],
    };
  }

  render() {
    return (
      <Card>
        <Card.Header>Buy</Card.Header>
        <Card.Body>
          <Tabs defaultActiveKey="market" id="buy-tab">
            <Tab eventKey="market" title="Market">
              {this.state.supplierContract_blockchainRecordedItemIds.map(
                (itemId) => {
                  var itemDetails = this.supplierContract_getItem(itemId);
                  return (
                    <div>
                      <Card>
                        <Card.Body>
                          <Card.Title>
                            {String(itemDetails).split(",")[0]}
                          </Card.Title>
                          <Card.Text>
                            {parseInt(String(itemDetails).split(",")[1])}
                          </Card.Text>
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
                                  id: itemId,
                                  itemName: String(itemDetails).split(",")[0],
                                  price: parseInt(
                                    String(itemDetails).split(",")[1]
                                  ),
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
                }
              )}

              <Card>
                <Card.Body>
                  <Card.Title>Coffee</Card.Title>
                  <Card.Text>$4.00</Card.Text>
                  <InputGroup className="mb-3">
                    <Form.Select aria-label="quantity">
                      <option>Quantity</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Form.Select>
                    <Button variant="primary" id="buttonPurchase">
                      Purchase
                    </Button>
                  </InputGroup>
                </Card.Body>
              </Card>
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

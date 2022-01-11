import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

class Suppliers extends Component {
  render() {
    return (
      <Card>
        <Card.Header>Sell</Card.Header>
        <Card.Body>
          <Tabs defaultActiveKey="newListing" id="sell-tab">
            <Tab eventKey="newListing" title="New Listing">
              <Form>
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
                  <tr>
                    <td>Coffee Beans</td>
                    <td>$4.00</td>
                    <td>
                      <a>Remove</a>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="process" title="Process Orders">
              Orders to be processed
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Coffee Beans</td>
                    <td>2</td>
                    <td>
                      <a>Process</a>
                    </td>
                  </tr>
                </tbody>
              </Table>
              Processed Orders
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2</td>
                    <td>Joe</td>
                    <td>Coffee Beans</td>
                    <td>5</td>
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

export default Suppliers;

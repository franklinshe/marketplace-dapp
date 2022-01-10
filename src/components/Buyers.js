import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

class Buyers extends Component {
  render() {
    return (
      <Card>
        <Card.Header>Buy</Card.Header>
        <Card.Body>
          <Tabs defaultActiveKey="market" id="buy-tab">
            <Tab eventKey="market" title="Market"></Tab>
            <Tab eventKey="orders" title="Orders"></Tab>
          </Tabs>
        </Card.Body>
      </Card>
    );
  }
}

export default Buyers;

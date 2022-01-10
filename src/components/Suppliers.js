import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

class Suppliers extends Component {
  render() {
    return (
      <Card>
        <Card.Header>Sell</Card.Header>
        <Card.Body>
          <Tabs defaultActiveKey="list" id="sell-tab">
            <Tab eventKey="list" title="List"></Tab>
            <Tab eventKey="process" title="Process"></Tab>
          </Tabs>
        </Card.Body>
      </Card>
    );
  }
}

export default Suppliers;

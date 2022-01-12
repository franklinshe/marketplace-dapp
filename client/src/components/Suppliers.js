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
      sellerContract_blockchainRecordedItemIds: [],
      sellerContract_blockchainRecordedPurchaseOrderServices: [],
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
          sellerContract_blockchainRecordedItemIds: [
            ...this.state.sellerContract_blockchainRecordedItemIds,
            parseInt(event.returnValues.idItem.toString()),
          ],
        });
      })
      .on("error", console.error);

    // this.props.sellerContract.events.ProcessAnOrder(
    //   {},
    //   {
    //     fromBlock: 0,
    //     toBlock: "latest",
    //   },
    //   (err, eventLogs) => {
    //     if (err) {
    //       console.error("[Event Listener Error]", err);
    //     } else {
    //       console.log("[Event Logs]", eventLogs);
    //       this.setState({
    //         supplierContract_blockchainRecordedPurchaseOrderServices: [
    //           ...this.state
    //             .supplierContract_blockchainRecordedPurchaseOrderServices,
    //           {
    //             idOfCustomer: parseInt(eventLogs.args.idOfCustomer.toString()),
    //             idOrder: parseInt(eventLogs.args.idOrder.toString()),
    //             status: eventLogs.args.status,
    //           },
    //         ],
    //       });
    //     }
    //   }
    // );

    // this.props.buyerContract.events.OrderRaisedOrUpdated(
    //   {},
    //   {
    //     fromBlock: 0,
    //     toBlock: "latest",
    //   },
    //   (err, eventLogs) => {
    //     if (err) {
    //       console.error("[Event Listener Error]", err);
    //     } else {
    //       console.log("[Event Logs]", eventLogs);
    //       if (
    //         this.state.customerContract_blockchainRecordedPurchaseOrderIds.indexOf(
    //           parseInt(eventLogs.args.idOrder.toString())
    //         ) === -1
    //       ) {
    //         this.setState({
    //           customerContract_blockchainRecordedPurchaseOrderIds: [
    //             ...this.state
    //               .customerContract_blockchainRecordedPurchaseOrderIds,
    //             parseInt(eventLogs.args.idOrder.toString()),
    //           ],
    //         });
    //       }
    //     }
    //   }
    // );
  };

  addNewItemToMarketBySupplier = async (e) => {
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
          console.error(
            "[Supplier Contract] Error during adding new item to marketPlace",
            err
          );
        } else {
          console.log(
            "[Supplier Contract] - New Item added to Marketplace",
            result
          );
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
              <Form onSubmit={this.addNewItemToMarketBySupplier}>
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
                    <td>Remove</td>
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
                    <td>Process</td>
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

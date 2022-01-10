import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import Buyers from "./components/Buyers";
import Suppliers from "./components/Suppliers";

function App() {
  return (
    <div className="App">
      <h1>Marketplace Dapp</h1>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <Buyers />
          </Col>
          <Col xs={12} md={6}>
            <Suppliers />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

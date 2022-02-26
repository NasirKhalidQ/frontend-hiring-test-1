import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { useState } from "react";
function App() {
  const [key, setKey] = useState("calls");

  return (
    <div className=" d-flex m-5">
      <Container fluid>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="calls" title="Calls">
            Hello Hello
          </Tab>
          <Tab eventKey="archived" title="Archived">
            Hello 22
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default App;

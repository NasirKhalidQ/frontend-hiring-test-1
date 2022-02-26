import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Table,
  Button,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axiosIns from "./services/AxiosInstance";
import axios from "axios";

function App() {
  const [key, setKey] = useState("calls");
  const [calls, setCalls] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [offset, setOffset] = useState(0);

  const authenticate = async () => {
    await axios
      .post("https://frontend-test-api.aircall.io/auth/login/", {
        username: "nasir",
        password: "1234",
      })
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
      });
  };

  const fetchCalls = async (offset) => {
    await axiosIns.get(`/calls/?offset=${offset}&limit=10`).then((res) => {
      setCalls(
        res.data.nodes.sort(function (a, b) {
          return a.created_at < b.created_at
            ? -1
            : a.created_at > b.created_at
            ? 1
            : 0;
        })
      );
      setHasNextPage(res.data.hasNextPage);
    });
  };

  const nextPage = () => {
    setOffset(offset + 10);
  };
  const previousPage = () => {
    setOffset(offset - 10);
  };

  useEffect(() => {
    fetchCalls(offset);
  }, [offset]);

  return (
    <div className="d-flex m-5">
      <Container>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="my-3"
        >
          <Tab eventKey="calls" title="Calls">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>View Details</th>
                  <th>Archive</th>
                </tr>
              </thead>
              <tbody>
                {calls.map((call, index) => (
                  <tr key={index}>
                    <td>{index + 1 + offset}</td>
                    <td>{call.created_at}</td>
                    <OverlayTrigger
                      trigger="click"
                      placement="left"
                      overlay={
                        <Popover>
                          <Popover.Header as="h3">Call Details</Popover.Header>
                          <Popover.Body>
                            <Container className="d-flex flex-column">
                              <div>
                                <strong>Id:</strong> {call.id}
                              </div>
                              <div>
                                <strong>Duration:</strong> {call.duration}
                                seconds
                              </div>
                              <div>
                                <strong>Is archived:</strong>
                                {call.is_archived ? "True" : "False"}
                              </div>
                              <div>
                                <strong>From:</strong> {call.from}
                              </div>
                              <div>
                                <strong>To:</strong> {call.to}
                              </div>
                              <div>
                                <strong>Directon:</strong> {call.direction}
                              </div>
                              <div>
                                <strong>Call Type:</strong> {call.call_type}
                              </div>
                              <div>
                                <strong>Via:</strong> {call.via}
                              </div>
                              <div>
                                <strong>Created At:</strong> {call.created_at}
                              </div>
                              {call.notes.length > 0 && (
                                <>
                                  <div className="mt-2">
                                    <strong>Notes:</strong>
                                  </div>
                                  {call.notes.map((note, index) => (
                                    <>
                                      <div>
                                        <strong>({index + 1}) Note Id:</strong>{" "}
                                        {note.id}
                                      </div>
                                      <div>
                                        <strong>Note Content:</strong>{" "}
                                        {note.content}
                                      </div>
                                    </>
                                  ))}
                                </>
                              )}
                            </Container>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <Container>
                        <Button variant="outline-primary">View</Button>
                      </Container>
                    </OverlayTrigger>
                    <td>@mdo</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Container className="d-flex gap-4">
              <Button onClick={authenticate} variant="dark">
                Authenticate
              </Button>
              <Button onClick={() => fetchCalls(offset)} variant="dark">
                Fetch Calls
              </Button>
              <Button
                disabled={offset <= 0}
                onClick={previousPage}
                variant="dark"
              >
                Previous
              </Button>
              <Button disabled={!hasNextPage} onClick={nextPage} variant="dark">
                Next
              </Button>
            </Container>
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

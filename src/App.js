import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Tabs, Tab, Table, Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axiosIns from "./services/AxiosInstance";
import axios from "axios";
import CallDetails from "./components/CallDetails";
import dayjs from "dayjs";

function App() {
  const [key, setKey] = useState("calls");
  const [calls, setCalls] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [offset, setOffset] = useState(0);

  const [showDetails, setShowDetails] = useState(false);
  const [hideOthers, setHideOthers] = useState(false);

  const [loading, setLoading] = useState(false);

  const authenticate = async () => {
    setLoading(true);
    await axios
      .post("https://frontend-test-api.aircall.io/auth/login/", {
        username: "nasir",
        password: "1234",
      })
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("timestamp", dayjs());
      })
      .then(() => setLoading(false));
  };

  const fetchCalls = async (offset) => {
    setLoading(true);
    await axiosIns
      .get(`/calls/?offset=${offset}&limit=10`)
      .then((res) => {
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
      })
      .then(() => setLoading(false));
  };

  const refreshToken = async () => {
    setLoading(true);
    await axiosIns
      .post("https://frontend-test-api.aircall.io/auth/refresh-token")
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("timestamp", dayjs());
      })
      .then(() => setLoading(false));
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

  useEffect(() => {
    const timer = setInterval(() => {
      if (localStorage.getItem("timestamp")) {
        const timestamp = localStorage.getItem("timestamp");
        console.log(timestamp);
        if (dayjs().diff(timestamp, "minute") >= 9) {
          refreshToken();
        }
      }
    }, 30000);
    return () => clearInterval(timer);
  }, []);

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
                  <th>Add Note</th>
                </tr>
              </thead>
              {loading ? (
                <tbody className="text-center">
                  <tr>
                    <td colSpan={5}>
                      <Spinner animation="border" />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {calls.map((call, index) => (
                    <tr key={index}>
                      <td>{index + 1 + offset}</td>
                      <td>{dayjs(call.created_at).format("D MMMM, YYYY")}</td>
                      <td>
                        <CallDetails call={call} />
                      </td>
                      <td>@mdo</td>
                      <td>
                        <div className="d-grid gap-2">
                          <Button variant="dark">Add</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </Table>
            <Container className="d-flex gap-4">
              <Button onClick={authenticate} variant="dark">
                Authenticate
              </Button>
              <Button
                onClick={() => {
                  setOffset(0);
                  fetchCalls(0);
                }}
                variant="dark"
              >
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

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Tabs, Tab, Table, Spinner, Alert } from "react-bootstrap";
// import Pusher from "pusher-js";

import React, { useEffect, useState } from "react";
import useRequests from "../hooks/useRequests";
import dayjs from "dayjs";
import CallDetails from "../components/CallDetails";
import Archive from "../components/Archive";
import AddNote from "../components/AddNote";
import Buttons from "../components/Buttons";

function HomePage() {
  // const {
  //   REACT_APP_PUSHER_AUTH_ENDPOINT,
  //   REACT_APP_PUSHER_APP_CLUSTER,
  //   REACT_APP_PUSHER_API_KEY,
  // } = process.env;

  const [key, setKey] = useState("calls");
  const [calls, setCalls] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(false);
  const [archiveLoading, setArchiveLoading] = useState(false);
  const [archiveArray, setArchiveArray] = useState([]);

  const { fetchCalls, authenticate, refreshToken, archiveCall, archiveAll } =
    useRequests(setLoading, setCalls, setHasNextPage);

  //run every time page number is changed
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchCalls(offset);
    }
  }, [offset]);

  //authenticate initially when the page is loaded
  useEffect(() => {
    authenticate().then(() => {
      fetchCalls(offset);
    });
  }, []);

  //check every 30 seconds for token expiry to refresh token
  useEffect(() => {
    const timer = setInterval(() => {
      if (localStorage.getItem("timestamp")) {
        const timestamp = localStorage.getItem("timestamp");
        if (dayjs().diff(timestamp, "minute") >= 9) {
          refreshToken();
        }
      }
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // pusher api attempt...facing authentication error 403
  // useEffect(() => {
  //   const pusher = new Pusher(REACT_APP_PUSHER_API_KEY, {
  //     cluster: REACT_APP_PUSHER_APP_CLUSTER,
  //     encrypted: true,
  //     authEndpoint: REACT_APP_PUSHER_AUTH_ENDPOINT,
  //   });
  //   const channel = pusher.subscribe("private-aircall");

  //   channel.bind("update-call", (data) => {
  //     console.log(data);
  //   });
  // }, []);

  return (
    <div className="d-flex m-5">
      <Container>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="my-3"
        >
          <Tab eventKey="calls" title="All Calls">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date Created</th>
                  <th>View Call Details</th>
                  <th>Archive Call</th>
                  <th>Add Note</th>
                </tr>
              </thead>
              {loading ? (
                <tbody className="text-center">
                  <tr>
                    <td className="spinner-wrapper" colSpan={5}>
                      <Spinner animation="border" />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {calls.length > 0 && (
                    <tr>
                      <td colSpan={5}>
                        <Alert className="m-0 p-2" variant="secondary">
                          {dayjs(calls[0].created_at).format("D MMMM, YYYY")}
                        </Alert>
                      </td>
                    </tr>
                  )}

                  {calls.map((call, index) => (
                    <React.Fragment key={index}>
                      {index > 0 &&
                      dayjs(call.created_at).format("DD") !==
                        dayjs(calls[index - 1].created_at).format("DD") ? (
                        <tr>
                          <td colSpan={5}>
                            <Alert className="m-0 p-2" variant="secondary">
                              {dayjs(call.created_at).format("D MMMM, YYYY")}
                            </Alert>
                          </td>
                        </tr>
                      ) : null}
                      <tr>
                        <td>{index + 1 + offset}</td>
                        <td>{dayjs(call.created_at).format("D MMMM, YYYY")}</td>
                        <td>
                          <CallDetails call={call} />
                        </td>
                        <td>
                          <Archive
                            call={call}
                            archiveArray={archiveArray}
                            setArchiveArray={setArchiveArray}
                            archiveCall={archiveCall}
                          />
                        </td>
                        <td>
                          <AddNote call={call} />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              )}
            </Table>
          </Tab>
          <Tab eventKey="archived" title="Archived">
            Hello 22
          </Tab>
        </Tabs>
        <Buttons
          authenticate={authenticate}
          offset={offset}
          setOffset={setOffset}
          fetchCalls={fetchCalls}
          archiveAll={archiveAll}
          archiveArray={archiveArray}
          archiveLoading={archiveLoading}
          setArchiveLoading={setArchiveLoading}
          hasNextPage={hasNextPage}
        />
      </Container>
    </div>
  );
}

export default HomePage;

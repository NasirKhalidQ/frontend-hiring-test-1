import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Tabs, Tab, Toast } from "react-bootstrap";
// import Pusher from "pusher-js";

import React, { useEffect, useState } from "react";
import useRequests from "../hooks/useRequests";
import dayjs from "dayjs";
import Buttons from "../components/Buttons";
import CallsTable from "../components/CallsTable";
import FilteredButtons from "../components/FilterButtons";

function HomePage() {
  // const {
  //   REACT_APP_PUSHER_AUTH_ENDPOINT,
  //   REACT_APP_PUSHER_APP_CLUSTER,
  //   REACT_APP_PUSHER_API_KEY,
  // } = process.env;

  const [calls, setCalls] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [offset, setOffset] = useState(0);
  const [active, setActive] = useState("All Calls");

  const [showToast, setShowToast] = useState(false);
  const [toastString, setToastString] = useState("");

  const [loading, setLoading] = useState(false);
  const [archiveLoading, setArchiveLoading] = useState(false);

  const [archiveArray, setArchiveArray] = useState([]);

  const { fetchCalls, authenticate, refreshToken, archiveCall, archiveAll } =
    useRequests(setLoading, setCalls, setHasNextPage);

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
        <Toast
          className="mb-1"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">API call completed</strong>
            <small>success</small>
          </Toast.Header>
          <Toast.Body>{toastString}</Toast.Body>
        </Toast>
        <FilteredButtons
          active={active}
          setActive={setActive}
          calls={calls}
          setCalls={setCalls}
          setLoading={setLoading}
          offset={offset}
          setHasNextPage={setHasNextPage}
        />
        <Tabs className="my-3">
          <Tab eventKey="calls" title={active}>
            <CallsTable
              archiveArray={archiveArray}
              setArchiveArray={setArchiveArray}
              archiveCall={archiveCall}
              setShowToast={setShowToast}
              setToastString={setToastString}
              calls={calls}
              loading={loading}
              offset={offset}
            />
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
          setToastString={setToastString}
          setShowToast={setShowToast}
        />
      </Container>
    </div>
  );
}

export default HomePage;

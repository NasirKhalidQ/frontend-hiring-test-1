import dayjs from "dayjs";
import { Alert, Spinner, Table } from "react-bootstrap";
import AddNote from "./AddNote";
import Archive from "./Archive";
import CallDetails from "./CallDetails";
import React from "react";

const CallsTable = ({
  calls,
  loading,
  offset,
  archiveArray,
  setArchiveArray,
  archiveCall,
  setShowToast,
  setToastString,
}) => {
  return (
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
                    setShowToast={setShowToast}
                    setToastString={setToastString}
                  />
                </td>
                <td>
                  <AddNote
                    setShowToast={setShowToast}
                    setToastString={setToastString}
                    call={call}
                  />
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      )}
    </Table>
  );
};

export default CallsTable;

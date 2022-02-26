import dayjs from "dayjs";
import { Container, Button, OverlayTrigger, Popover } from "react-bootstrap";

const CallDetails = ({ call }) => {
  return (
    <OverlayTrigger
      trigger="click"
      placement="left"
      rootClose
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
                <strong>Created At:</strong>{" "}
                {dayjs(call.created_at).format("D MMMM, YYYY")}
              </div>
              {call.notes.length > 0 && (
                <>
                  <div className="mt-2">
                    <strong>Notes:</strong>
                  </div>
                  {call.notes.map((note, index) => (
                    <div key={index}>
                      <div>
                        <strong>({index + 1}) Note Id:</strong> {note.id}
                      </div>
                      <div>
                        <strong>Note Content:</strong> {note.content}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </Container>
          </Popover.Body>
        </Popover>
      }
    >
      <div className="d-grid gap-2">
        <Button variant="dark">View</Button>
      </div>
    </OverlayTrigger>
  );
};

export default CallDetails;

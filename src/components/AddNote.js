import {
  Container,
  Button,
  OverlayTrigger,
  Popover,
  Form,
} from "react-bootstrap";
import React, { useState } from "react";
import useRequests from "../hooks/useRequests";

const AddNote = ({ call }) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const { addNote } = useRequests();
  const handleAdd = async () => {
    await addNote(setLoading, call.id, text);
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <OverlayTrigger
      trigger="click"
      placement="left"
      rootClose
      overlay={
        <Popover>
          <Popover.Header as="h3">Add Note</Popover.Header>
          <Popover.Body>
            <Container className="d-flex flex-column gap-3">
              <Form.Control
                value={text}
                onChange={handleChange}
                as="textarea"
                rows={3}
              />
              <Button disabled={loading} onClick={handleAdd} variant="success">
                {loading ? "Adding..." : "Submit"}
              </Button>
            </Container>
          </Popover.Body>
        </Popover>
      }
    >
      <div className="d-grid gap-2">
        <Button variant="dark">Add</Button>
      </div>
    </OverlayTrigger>
  );
};

export default AddNote;

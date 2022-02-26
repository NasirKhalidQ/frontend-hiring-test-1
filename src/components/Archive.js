import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Archive = ({ call, archiveArray, setArchiveArray, archiveCall }) => {
  const [checked, setChecked] = useState(false);
  const handleSelect = (call) => {
    setChecked(!checked);
    const exists = archiveArray.filter((c) => c.id === call.id).length > 0;
    if (exists) {
      setArchiveArray(archiveArray.filter((c) => c.id !== call.id));
    } else {
      setArchiveArray([...archiveArray, call]);
    }
  };
  return (
    <div className="row">
      <div className="col d-grid">
        <Button onClick={() => archiveCall(call.id)} variant="dark">
          Archive
        </Button>
      </div>
      <div className="col d-grid align-items-center">
        <Form.Check
          value={checked}
          onChange={() => handleSelect(call)}
          type="checkbox"
          label="Select"
        />
      </div>
    </div>
  );
};

export default Archive;

import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import box from "../assets/box-solid.svg";

const Archive = ({
  call,
  archiveArray,
  setArchiveArray,
  archiveCall,
  setShowToast,
  setToastString,
}) => {
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

  const handleArchive = async () => {
    await archiveCall(call.id).then(() => {
      setToastString(`Successfully archived call`);
      setShowToast(true);
    });
  };
  return (
    <div className="row">
      <div className="col d-grid">
        <Button onClick={handleArchive} variant="light">
          <img width={20} height={20} src={box} alt="" />
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

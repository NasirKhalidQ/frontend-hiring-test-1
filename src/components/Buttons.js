import { Container, Button } from "react-bootstrap";
const Buttons = ({
  authenticate,
  offset,
  setOffset,
  fetchCalls,
  archiveAll,
  archiveArray,
  archiveLoading,
  setArchiveLoading,
  hasNextPage,
  setShowToast,
  setToastString,
}) => {
  const nextPage = () => {
    setOffset(offset + 10);
  };
  const previousPage = () => {
    setOffset(offset - 10);
  };

  const handleAuthenticate = async () => {
    await authenticate().then(() => {
      setToastString("Successfully Authenticated user");
      setShowToast(true);
    });
  };

  const handleFetch = async () => {
    await setOffset(0);
    await fetchCalls(0).then(() => {
      setToastString("Successfully Fetched calls");
      setShowToast(true);
    });
  };

  const handleArchiveAll = async () => {
    await archiveAll(archiveArray, setArchiveLoading).then(() => {
      setToastString(`Successfully archived ${archiveArray.length} calls`);
      setShowToast(true);
    });
  };

  return (
    <Container className="d-flex gap-4">
      <Button onClick={handleAuthenticate} variant="dark">
        Authenticate
      </Button>
      <Button onClick={handleFetch} variant="dark">
        Fetch Calls
      </Button>
      <Button disabled={offset <= 0} onClick={previousPage} variant="dark">
        Previous
      </Button>
      <Button disabled={!hasNextPage} onClick={nextPage} variant="dark">
        Next
      </Button>
      <Button
        onClick={handleArchiveAll}
        variant="danger"
        disabled={archiveLoading || archiveArray.length <= 0}
      >
        {archiveLoading ? "Archiving..." : "Archive All"}
      </Button>
    </Container>
  );
};

export default Buttons;

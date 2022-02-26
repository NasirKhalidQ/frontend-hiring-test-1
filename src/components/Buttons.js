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
}) => {
  const nextPage = () => {
    setOffset(offset + 10);
  };
  const previousPage = () => {
    setOffset(offset - 10);
  };
  return (
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
      <Button disabled={offset <= 0} onClick={previousPage} variant="dark">
        Previous
      </Button>
      <Button disabled={!hasNextPage} onClick={nextPage} variant="dark">
        Next
      </Button>
      <Button
        onClick={() => archiveAll(archiveArray, setArchiveLoading)}
        variant="danger"
        disabled={archiveLoading || archiveArray.length <= 0}
      >
        {archiveLoading ? "Archiving..." : "Archive All"}
      </Button>
    </Container>
  );
};

export default Buttons;

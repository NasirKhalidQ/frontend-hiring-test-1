import useRequests from "../hooks/useRequests";

const useFilter = ({ calls, setCalls, setLoading, offset }) => {
  const { fetchCalls } = useRequests(setLoading, setCalls);
  const filter = async (active) => {
    if (active === "Archived Calls") {
      await fetchCalls(offset).then(() =>
        setCalls(calls.filter((call) => call.isArchived))
      );
    }
  };

  return {
    filter,
  };
};

export default useFilter;

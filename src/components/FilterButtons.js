import { useEffect } from "react";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import useRequests from "../utils/useRequests";
import axiosIns from "../utils/AxiosInstance";

const FilteredButtons = ({
  setActive,
  setCalls,
  setLoading,
  offset,
  active,
  setHasNextPage,
}) => {
  const { fetchCalls } = useRequests(setLoading, setCalls, setHasNextPage);
  const handleClick = async (e) => {
    setActive(e.target.innerText);
  };

  //run every time page number is changed or a filter is selected
  useEffect(() => {
    const allCalls = async () => {
      await fetchCalls(offset);
    };

    const archive = async () => {
      setLoading(true);
      await axiosIns
        .get(`/calls/?offset=${offset}&limit=10`)
        .then((res) => {
          setCalls(res.data.nodes.filter((call) => call.is_archived === true));
          setHasNextPage(res.data.hasNextPage);
        })
        .then(() => setLoading(false));
    };

    const missed = async () => {
      setLoading(true);
      await axiosIns
        .get(`/calls/?offset=${offset}&limit=10`)
        .then((res) => {
          setCalls(
            res.data.nodes.filter((call) => call.call_type === "missed")
          );
          setHasNextPage(res.data.hasNextPage);
        })
        .then(() => setLoading(false));
    };

    const answered = async () => {
      setLoading(true);
      await axiosIns
        .get(`/calls/?offset=${offset}&limit=10`)
        .then((res) => {
          setCalls(
            res.data.nodes.filter((call) => call.call_type === "answered")
          );
          setHasNextPage(res.data.hasNextPage);
        })
        .then(() => setLoading(false));
    };

    const voicemail = async () => {
      setLoading(true);
      await axiosIns
        .get(`/calls/?offset=${offset}&limit=10`)
        .then((res) => {
          setCalls(
            res.data.nodes.filter((call) => call.call_type === "voicemail")
          );
          setHasNextPage(res.data.hasNextPage);
        })
        .then(() => setLoading(false));
    };

    const inbound = async () => {
      setLoading(true);
      await axiosIns
        .get(`/calls/?offset=${offset}&limit=10`)
        .then((res) => {
          setCalls(
            res.data.nodes.filter((call) => call.direction === "inbound")
          );
          setHasNextPage(res.data.hasNextPage);
        })
        .then(() => setLoading(false));
    };

    const outbound = async () => {
      setLoading(true);
      await axiosIns
        .get(`/calls/?offset=${offset}&limit=10`)
        .then((res) => {
          setCalls(
            res.data.nodes.filter((call) => call.direction === "outbound")
          );
          setHasNextPage(res.data.hasNextPage);
        })
        .then(() => setLoading(false));
    };
    if (localStorage.getItem("token")) {
      if (active === "All Calls") {
        allCalls();
      } else if (active === "Archived Calls") {
        archive();
      } else if (active === "Missed Calls") {
        missed();
      } else if (active === "Answered Calls") {
        answered();
      } else if (active === "Voicemail Calls") {
        voicemail();
      } else if (active === "Inbound Calls") {
        inbound();
      } else if (active === "Outbound Calls") {
        outbound();
      }
    }
  }, [active, offset]);

  return (
    <ToggleButtonGroup className="d-flex gap-1" name="archived">
      <ToggleButton onClick={handleClick} variant="dark">
        All Calls
      </ToggleButton>
      <ToggleButton onClick={handleClick} variant="dark">
        Archived Calls
      </ToggleButton>
      <ToggleButton onClick={handleClick} variant="dark">
        Missed Calls
      </ToggleButton>
      <ToggleButton onClick={handleClick} variant="dark">
        Answered Calls
      </ToggleButton>
      <ToggleButton onClick={handleClick} variant="dark">
        Voicemail Calls
      </ToggleButton>
      <ToggleButton onClick={handleClick} variant="dark">
        Inbound Calls
      </ToggleButton>
      <ToggleButton onClick={handleClick} variant="dark">
        Outbound Calls
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default FilteredButtons;

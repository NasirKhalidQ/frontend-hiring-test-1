import axios from "axios";
import dayjs from "dayjs";
import axiosIns from "../utils/AxiosInstance";

const useRequests = (setLoading, setCalls, setHasNextPage) => {
  const { REACT_APP_API_BASE_URL, REACT_APP_USERNAME, REACT_APP_PASSWORD } =
    process.env;

  const authenticate = async () => {
    setLoading(true);
    await axios
      .post(`${REACT_APP_API_BASE_URL}auth/login`, {
        username: REACT_APP_USERNAME,
        password: REACT_APP_PASSWORD,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("timestamp", dayjs());
      })
      .then(() => setLoading(false));
  };

  const fetchCalls = async (offset) => {
    setLoading(true);
    await axiosIns
      .get(`/calls/?offset=${offset}&limit=10`)
      .then((res) => {
        setCalls(
          //sorting lexicographically
          res.data.nodes.sort(function (a, b) {
            return a.created_at < b.created_at
              ? -1
              : a.created_at > b.created_at
              ? 1
              : 0;
          })
        );
        setHasNextPage(res.data.hasNextPage);
      })
      .then(() => setLoading(false));
  };

  const refreshToken = async () => {
    setLoading(true);
    await axiosIns
      .post("/auth/refresh-token")
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("timestamp", dayjs());
      })
      .then(() => setLoading(false));
  };

  const archiveCall = async (id) => {
    await axiosIns.put(`/calls/${id}/archive`);
  };

  const archiveAll = async (archiveArray, setArchiveLoading) => {
    setArchiveLoading(true);
    await Promise.all(archiveArray.map((call) => archiveCall(call.id))).then(
      () => setArchiveLoading(false)
    );
  };

  const addNote = async (setLoading, id, text) => {
    setLoading(true);
    await axiosIns
      .post(`/calls/${id}/note`, {
        content: text,
      })
      .then(() => setLoading(false));
  };

  return {
    fetchCalls,
    authenticate,
    refreshToken,
    archiveCall,
    archiveAll,
    addNote,
  };
};

export default useRequests;

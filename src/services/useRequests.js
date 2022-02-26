import axios from "axios";
import dayjs from "dayjs";
import axiosIns from "./AxiosInstance";

const useRequests = (setLoading, setCalls, setHasNextPage) => {
  const authenticate = async () => {
    setLoading(true);
    await axios
      .post("https://frontend-test-api.aircall.io/auth/login/", {
        username: "nasir",
        password: "1234",
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
      .post("https://frontend-test-api.aircall.io/auth/refresh-token")
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("timestamp", dayjs());
      })
      .then(() => setLoading(false));
  };

  const archiveCall = async (id) => {
    await axiosIns.put(
      `https://frontend-test-api.aircall.io/calls/${id}/archive`
    );
  };

  const archiveAll = async (archiveArray, setArchiveLoading) => {
    setArchiveLoading(true);
    await Promise.all(archiveArray.map((call) => archiveCall(call.id))).then(
      () => setArchiveLoading(false)
    );
  };

  return {
    fetchCalls,
    authenticate,
    refreshToken,
    archiveCall,
    archiveAll,
  };
};

export default useRequests;

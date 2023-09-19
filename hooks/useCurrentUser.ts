import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useCurrentUser = () => {
  // due to SWR, if we already have data api call will not be made again. Due to which no need to use redux etc.
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;

import useSWR from "swr";
import { api } from "./api";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useUsers() {
  const { data, error, mutate } = useSWR("/users", fetcher);

  return {
    users: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

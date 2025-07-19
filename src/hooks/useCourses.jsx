import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCourses = () => {
  const axiosPublic = useAxiosSecure();

  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/courses");
      return res.data;
    },
  });

  return { data, isLoading, refetch };
};

export default useCourses;

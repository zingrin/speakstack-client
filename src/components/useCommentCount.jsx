import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useCommentCount = (postTitle) => {
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ["commentCount", postTitle],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/count/${postTitle}`);
      return res.data;
    },
    enabled: !!postTitle, 
  });

  return data?.count || 0;
};

export default useCommentCount;

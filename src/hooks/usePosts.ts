import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import postService, { Post } from "../services/postService";

interface PostQuery {
  pageSize: number;
  userId?: number;
}

const usePosts = (query: PostQuery) => {
  return useInfiniteQuery<Post[], Error>({
    queryKey: /* userId ? ["users", userId, "posts"] : */ ["posts", query],
    queryFn: ({ pageParam }: any) =>
      postService.getPage({ pageNumber: pageParam, pageSize: query.pageSize }),
    initialPageParam: 1,
    staleTime: 1 * 60 * 1000, //1m
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};

export default usePosts;

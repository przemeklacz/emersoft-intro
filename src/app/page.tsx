import CategoryFilter from "@/app/components/categoryFilterList";
import Post from "@/app/components/post";
import { IPost } from "@/model/post";
import { PostsResponse } from "@/model/posts-response";
import React from "react";
import Pagination from "./components/pagination";
import TitleFilter from "./components/titleFilter";
import { POSTS_API_URL } from "./config/api-urls";
import { getDataFromApi } from "./utils/get-data-from-api";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: "Blog",
};

const page = async ({ searchParams }: Props) => {
  const postsResponse: PostsResponse = await getDataFromApi(
    new URL(POSTS_API_URL),
    searchParams
  );

  return (
    <section className="max-w-6xl w-full mx-auto flex-center flex-col p-16 text-center">
      <h1 className="text-2xl font-bold mb-4">From the blog</h1>
      <p className="text-slate-400 max-w-lg mx-auto mb-6">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
        dolorum ea aperiam id debitis laborum cumque maiores aliquam?
      </p>
      <CategoryFilter categories={postsResponse.categories} />
      <TitleFilter />
      <div className="flex gap-4 flex-col tablet:flex-row ">
        {postsResponse.posts.map((post: IPost) => (
          <Post
            key={post.id}
            post={post}
            categories={postsResponse.categories}
          />
        ))}
      </div>
      <Pagination totalPages={postsResponse.totalPages} />
    </section>
  );
};

export default page;

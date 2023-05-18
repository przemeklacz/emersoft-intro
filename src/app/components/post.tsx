import { ICategory } from "@/model/category";
import { IPost } from "@/model/post";
import React from "react";

const post = ({
  post,
  categories,
}: {
  post: IPost;
  categories: ICategory[];
}) => (
  <article
    key={post.id}
    className="basis-1/3 flex max-w-xl flex-col text-left rounded-md shadow overflow-hidden
     transition-transform  hover:-translate-y-1 cursor-pointer
    "
  >
    <div>
      <img src={post.imageUrl} alt={post.title} />
    </div>
    <div className="flex flex-col p-3">
      <div className="flex gap-2 mb-2 text-xs text-violet-600">
        {post.categories.map((category: number) => (
          <span key={category}>
            {categories?.find(({ id }) => id === category)?.name}
          </span>
        ))}
      </div>
      <div className="font-semibold mb-2">{post.title}</div>
      <div className="text-xs text-gray-500">{post.excerpt}</div>
    </div>
  </article>
);

export default post;

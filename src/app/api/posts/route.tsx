import { PaginationQuery } from "@/model/pagination-query";
import { IPost } from "@/model/post";
import { PostsQuery } from "@/model/posts-query";
import { PostsResponse } from "@/model/posts-response";
import { NextResponse } from "next/server";
import path from "path";
import { readJSONFile } from "@/app/api/utils/read-json-file";
import { PostQueryEnum } from "@/model/post-query.enum";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 3;

export async function GET(req: Request) {
  try {
    const postsJSON: PostsResponse = await readJSONFile(
      path.join(process.cwd(), "data", "posts.json")
    );
    const { pagination, title, categoryId } = getQueryParamsFromUrl(
      new URL(req.url)
    );
    let processedPosts: IPost[] = [...postsJSON.posts];

    if (categoryId && typeof categoryId === "string") {
      processedPosts = filterPostsByCategoryId(
        processedPosts,
        Number(categoryId)
      );
    }

    if (title && typeof title === "string") {
      processedPosts = filterPostsByTitle(processedPosts, title);
    }

    const processedResponse: PostsResponse = {
      ...performPagination(processedPosts, pagination),
      categories: postsJSON.categories,
    };

    return NextResponse.json({ ...processedResponse });
  } catch (error) {
    console.error(error);
  }
}

function performPagination(
  posts: IPost[],
  { page: pageQuery, limit: limitQuery }: PaginationQuery
): { posts: IPost[]; totalPages: number } {
  const page = Number(pageQuery) > 0 ? Number(pageQuery) : DEFAULT_PAGE;
  const limit = Number(limitQuery) > 0 ? Number(limitQuery) : DEFAULT_LIMIT;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const totalPages = posts.length === 0 ? 0 : Math.ceil(posts.length / limit);

  return {
    posts: posts.slice(startIndex, endIndex),
    totalPages,
  };
}

function getQueryParamsFromUrl(url: URL): PostsQuery {
  const pagination: PaginationQuery = {
    page: url.searchParams.get(PostQueryEnum.PAGE),
    limit: url.searchParams.get(PostQueryEnum.LIMIT),
  };

  return {
    categoryId: url.searchParams.get(PostQueryEnum.CATEGORY_ID),
    title: url.searchParams.get(PostQueryEnum.TITLE),
    pagination,
  };
}

function filterPostsByCategoryId(posts: IPost[], categoryId: number): IPost[] {
  return posts.filter((post: IPost) =>
    post.categories.some(
      (postCategoryId: number) => postCategoryId === categoryId
    )
  );
}

function filterPostsByTitle(posts: IPost[], title: string): IPost[] {
  const searchTerm: string = title.toLowerCase();
  return posts.filter((post: IPost) =>
    post.title.toLowerCase().includes(searchTerm)
  );
}

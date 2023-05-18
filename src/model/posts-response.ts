import { ICategory } from "./category";
import { IPost } from "./post";

export interface PostsResponse {
    posts: IPost[];
    categories: ICategory[];
    totalPages: number;
}
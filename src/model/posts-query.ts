import { PaginationQuery } from "./pagination-query";
import { SearchParam } from "./search-params";

export interface PostsQuery {
    categoryId: SearchParam;
    title: SearchParam;
    pagination: PaginationQuery;
}
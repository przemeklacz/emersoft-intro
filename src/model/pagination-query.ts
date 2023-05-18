import { SearchParam } from "./search-params";

export interface PaginationQuery {
    page: SearchParam;
    limit: SearchParam;
}

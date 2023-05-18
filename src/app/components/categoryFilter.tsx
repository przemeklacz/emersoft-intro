"use client";

import { ICategory } from "@/model/category";
import { PostQueryEnum } from "@/model/post-query.enum";
import React from "react";
import { useQueryParams } from "../hooks/useQueryParam";

const categoryFilter = ({ category }: { category: ICategory }) => {
  const { queryParam, setQueryParams } = useQueryParams();
  const isActiveCategory =
    Number(queryParam.get(PostQueryEnum.CATEGORY_ID)) === category.id;

  const changeCategoryFilter = () => {
    const newCategoryId = isActiveCategory ? "" : String(category.id);
    setQueryParams({
      [PostQueryEnum.CATEGORY_ID]: newCategoryId,
      [PostQueryEnum.PAGE]: "",
    });
  };

  return (
    <div
      onClick={changeCategoryFilter}
      className={`${isActiveCategory ? "bg-blue-600" : "bg-gray-500"}
          inline-block text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors
          `}
    >
      {category.name}
    </div>
  );
};

export default categoryFilter;

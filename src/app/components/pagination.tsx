"use client";

import { PostQueryEnum } from "@/model/post-query.enum";
import React from "react";
import { useQueryParams } from "../hooks/useQueryParam";

const pagination = ({ totalPages }: { totalPages: number }) => {
  const { queryParam, setQueryParams } = useQueryParams();
  const currentPage = Number(queryParam.get(PostQueryEnum.PAGE)) || 1;
  const isPrevButtonDisabled = currentPage === 1 || totalPages === 0;
  const isNextButtonDisabled = currentPage === totalPages || totalPages === 0;

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setQueryParams({
        [PostQueryEnum.PAGE]: String(currentPage - 1),
      });
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setQueryParams({
        [PostQueryEnum.PAGE]: String(currentPage + 1),
      });
    }
  };

  return (
    <div className="flex items-center justify-center mt-6">
      <button
        className={`mr-4 py-2 px-4 rounded ${
          isPrevButtonDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 cursor-pointer hover:bg-blue-700 text-white"
        }`}
        onClick={goToPreviousPage}
        disabled={isPrevButtonDisabled}
      >
        Previous
      </button>
      <button
        className={`py-2 px-4 rounded ${
          isNextButtonDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 cursor-pointer hover:bg-blue-700 text-white"
        }`}
        onClick={goToNextPage}
        disabled={isNextButtonDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default pagination;

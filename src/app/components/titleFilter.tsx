"use client";

import { PostQueryEnum } from "@/model/post-query.enum";
import React, { FormEvent, useRef } from "react";
import { useQueryParams } from "../hooks/useQueryParam";

const titleFilter = () => {
  const { setQueryParams } = useQueryParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (typeof inputRef.current?.value === "string") {
      setQueryParams({ [PostQueryEnum.TITLE]: inputRef.current.value });
    }
  };

  const handleClear = (e: FormEvent) => {
    e.preventDefault();
    if (typeof inputRef.current?.value === "string") {
      inputRef.current.value = "";
      setQueryParams({ [PostQueryEnum.TITLE]: inputRef.current.value });
    }
  };

  return (
    <div className="mb-8 relative">
      <form
        className="flex justify-center items-center gap-2"
        onSubmit={handleSubmit}
        onReset={handleClear}
      >
        <div className="relative">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter post title"
            className="px-4 py-2 rounded-lg border border-blue-500 border-focus:outline-none focus:border-blue-500"
          />
          {inputRef.current?.value && (
            <button
              type="reset"
              className="absolute right-2 top-2 w-6 h-6 p-1 rounded-full text-gray-800 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default titleFilter;

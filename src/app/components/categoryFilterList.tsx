import { ICategory } from "@/model/category";
import React from "react";
import CategoryFilter from "./categoryFilter";

const categoryFilterList = ({ categories }: { categories: ICategory[] }) => {
  return (
    <div className="flex flex-row flex-wrap space-between tablet:justify-center my-4 gap-4">
      {categories.map((category: ICategory) => (
        <CategoryFilter key={category.id} category={category} />
      ))}
    </div>
  );
};

export default categoryFilterList;

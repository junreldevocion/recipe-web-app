import React from 'react';
import FilterRecipe from './recipe/FilterRecipe';
import SortRecipe from './recipe/SortRecipe';
import { useAppSelectore } from '@/redux/store';

const Sidebar: React.FC = () => {

  const { data: recipies } = useAppSelectore(({ recipe }) => recipe);

  const isHasRecipies = (recipies ?? []).length > 0

  return (
    <div className="flex flex-col bg-card border-2 border-muted w-full lg:w-[300px]">
      {isHasRecipies && (
        <>
          <div className="flex p-4 flex-col">
            <h2 className="text-xl font-bold mb-4">Sort by Title</h2>
            <SortRecipe />
          </div>
          <FilterRecipe />
        </>
      )}
    </div>
  );
};

export default Sidebar;

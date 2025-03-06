import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { useGetRecipies } from '@/hooks/useGetRecipies';

const Sidebar: React.FC = () => {
  const { recipies } = useGetRecipies()

  if ((recipies?.data ?? [])?.length <= 0) {
    return null
  }

  return (
    <div className="flex flex-col bg-card p-4">
      <div className="flex p-4 flex-col">
        <h2 className="text-xl font-bold mb-4">Sort by Title</h2>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a recipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort</SelectLabel>
              <SelectItem value="apple">ASC</SelectItem>
              <SelectItem value="banana">DSC</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold mb-4">Filter</h2>
        <h3 className='text-sm'>Favorites</h3>
        <div className="flex items-center space-x-2 pt-4">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Yes
          </label>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            No
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

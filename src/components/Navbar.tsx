import { useAppDispatch } from '@/redux/store';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Input } from './ui/input';
import { searchRecipies } from '@/redux/recipe/recipe.slice';
import { debounce } from '@/lib/utils';

const Navbar: React.FC = () => {

  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value.toLowerCase();

    const debouncedSearch = debounce((title: string) => {
      dispatch(searchRecipies({ title }));
    }, 500);

    debouncedSearch(title);
  };

  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold"><Link href="/">RECIPE</Link></div>
        <div className="relative">
          <Input
            type="text"
            className="bg-background text-primary rounded-full pl-4 pr-10 py-2 focus:outline-none focus:bg-muted"
            placeholder="Search here..."
            onChange={handleChange}
          />
          <button className="absolute right-0 top-0 mt-2 mr-4">
            <Search color="oklch(.554 .046 257.417)" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
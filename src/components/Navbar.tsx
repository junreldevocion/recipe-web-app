import { Search } from 'lucide-react';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">RECIPE</div>
        <div className="relative">
          <input
            type="text"
            className="bg-gray-700 text-white rounded-full pl-4 pr-10 py-2 focus:outline-none focus:bg-gray-600"
            placeholder="Search here..."
          />
          <button className="absolute right-0 top-0 mt-2 mr-4">
            <Search color="#fff" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
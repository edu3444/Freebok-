import React from 'react';
import SearchBar from './SearchBar';
import BookOpenIcon from './icons/BookOpenIcon';
import SortControls from './SortControls';
import type { SortKey, SortDirection } from '../App';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortKey: SortKey;
  onSortKeyChange: (key: SortKey) => void;
  sortDirection: SortDirection;
  onSortDirectionChange: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  searchTerm, 
  onSearchChange,
  sortKey,
  onSortKeyChange,
  sortDirection,
  onSortDirectionChange,
}) => {
  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <BookOpenIcon className="h-8 w-8 text-teal-400" />
            <span className="ml-3 text-2xl font-bold text-white tracking-wider hidden sm:inline">Gemini Calibre</span>
          </div>
          <div className="flex-grow flex items-center justify-end gap-4 max-w-xl">
            <div className="flex-grow max-w-md">
              <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
            </div>
            <SortControls 
              sortKey={sortKey}
              onSortKeyChange={onSortKeyChange}
              sortDirection={sortDirection}
              onSortDirectionChange={onSortDirectionChange}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
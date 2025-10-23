import React from 'react';
import type { SortKey, SortDirection } from '../App';
import SortAscIcon from './icons/SortAscIcon';
import SortDescIcon from './icons/SortDescIcon';

interface SortControlsProps {
  sortKey: SortKey;
  onSortKeyChange: (key: SortKey) => void;
  sortDirection: SortDirection;
  onSortDirectionChange: () => void;
}

const SortControls: React.FC<SortControlsProps> = ({
  sortKey,
  onSortKeyChange,
  sortDirection,
  onSortDirectionChange
}) => {
  return (
    <div className="flex items-center gap-2">
      <select
        value={sortKey}
        onChange={(e) => onSortKeyChange(e.target.value as SortKey)}
        className="bg-gray-700 text-gray-200 border border-gray-600 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-sm"
        aria-label="Sort by"
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="publishedYear">Year</option>
      </select>
      <button
        onClick={onSortDirectionChange}
        className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
        aria-label={`Sort direction: ${sortDirection === 'asc' ? 'Ascending' : 'Descending'}`}
        title={`Sort direction: ${sortDirection === 'asc' ? 'Ascending' : 'Descending'}`}
      >
        {sortDirection === 'asc' ? <SortAscIcon className="h-5 w-5" /> : <SortDescIcon className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default SortControls;

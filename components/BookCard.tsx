
import React from 'react';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
  onSelectBook: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onSelectBook }) => {
  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group"
      onClick={() => onSelectBook(book)}
    >
      <div className="relative w-full aspect-[2/3] overflow-hidden">
        <img 
          src={book.coverImageUrl} 
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-md font-bold text-gray-100 truncate group-hover:text-teal-400 transition-colors">{book.title}</h3>
          <p className="text-sm text-gray-400">{book.author}</p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

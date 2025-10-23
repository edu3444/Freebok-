
import React from 'react';
import type { Book } from '../types';
import BookCard from './BookCard';

interface BookGridProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
}

const BookGrid: React.FC<BookGridProps> = ({ books, onSelectBook }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {books.map(book => (
        <BookCard key={book.id} book={book} onSelectBook={onSelectBook} />
      ))}
    </div>
  );
};

export default BookGrid;

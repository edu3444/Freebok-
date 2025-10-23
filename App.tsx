import React, { useState, useMemo, useEffect } from 'react';
import type { Book } from './types';
import { generateBookLibrary } from './services/geminiService';
import Header from './components/Header';
import BookGrid from './components/BookGrid';
import BookDetailModal from './components/BookDetailModal';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';

export type SortKey = 'title' | 'author' | 'publishedYear';
export type SortDirection = 'asc' | 'desc';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleGenerateLibrary = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const generatedBooks = await generateBookLibrary();
      setBooks(generatedBooks);
    } catch (err) {
      console.error("Failed to generate book library:", err);
      setError("Failed to load the book library. The Gemini API might be unavailable. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGenerateLibrary();
  }, []);

  const sortedAndFilteredBooks = useMemo(() => {
    if (books.length === 0) return [];
    
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Now sort the filtered books
    filtered.sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      let comparison = 0;
      if (typeof valA === 'string' && typeof valB === 'string') {
        comparison = valA.localeCompare(valB, undefined, { sensitivity: 'base' });
      } else if (typeof valA === 'number' && typeof valB === 'number') {
        comparison = valA - valB;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [books, searchTerm, sortKey, sortDirection]);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleSortDirectionChange = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
        sortKey={sortKey}
        onSortKeyChange={setSortKey}
        sortDirection={sortDirection}
        onSortDirectionChange={handleSortDirectionChange}
      />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && <LoadingSpinner />}
        
        {error && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-red-400 text-lg mb-4">{error}</p>
                <button
                    onClick={handleGenerateLibrary}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    Try Again
                </button>
            </div>
        )}

        {!isLoading && !error && books.length > 0 && sortedAndFilteredBooks.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                 <p className="text-gray-400 text-lg">No books found matching your search.</p>
            </div>
        )}

        {!isLoading && !error && sortedAndFilteredBooks.length > 0 && (
          <BookGrid books={sortedAndFilteredBooks} onSelectBook={handleSelectBook} />
        )}
      </main>
      
      {selectedBook && (
        <BookDetailModal book={selectedBook} onClose={handleCloseModal} />
      )}

      <Footer />
    </div>
  );
};

export default App;
import React from 'react';
import type { Book } from '../types';
import CloseIcon from './icons/CloseIcon';
import StarIcon from './icons/StarIcon';
import AmazonIcon from './icons/AmazonIcon';
import DownloadIcon from './icons/DownloadIcon';

interface BookDetailModalProps {
  book: Book;
  onClose: () => void;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, onClose }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon 
          key={i} 
          className={`h-5 w-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-600'}`} 
        />
      );
    }
    return stars;
  };

  const isPublicDomain = book.publishedYear < 1928;
  const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(book.title)}+${encodeURIComponent(book.author)}`;
  const gutenbergSearchUrl = `https://www.gutenberg.org/ebooks/search/?query=${encodeURIComponent(book.title)}+${encodeURIComponent(book.author)}`;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/3 flex-shrink-0">
           <img src={book.coverImageUrl} alt={book.title} className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-2/3 p-6 md:p-8 overflow-y-auto">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-white">{book.title}</h2>
              <p className="text-xl text-gray-300 mt-1">{book.author}</p>
              <p className="text-sm text-gray-500">{book.publishedYear}</p>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <CloseIcon className="h-8 w-8" />
            </button>
          </div>

          <div className="flex items-center my-4">
            <div className="flex items-center">
              {renderStars(book.rating)}
            </div>
            <span className="ml-2 text-gray-300">{book.rating.toFixed(1)} / 5.0</span>
          </div>

          <div className="my-4">
            <div className="flex flex-wrap gap-2">
              {book.genres.map(genre => (
                <span key={genre} className="bg-gray-700 text-teal-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="my-6 flex flex-col sm:flex-row gap-4">
            <a
              href={amazonSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors"
            >
              <AmazonIcon className="h-5 w-5" />
              <span>Find on Amazon</span>
            </a>
            <a
              href={isPublicDomain ? gutenbergSearchUrl : undefined}
              target="_blank"
              rel="noopener noreferrer"
              title={isPublicDomain ? 'Search for a free version on Project Gutenberg' : 'Download is only available for public domain books (published before 1928)'}
              className={`flex items-center justify-center gap-2 w-full sm:w-auto font-bold py-2 px-4 rounded-lg transition-colors ${
                isPublicDomain 
                ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
              onClick={(e) => !isPublicDomain && e.preventDefault()}
            >
              <DownloadIcon className="h-5 w-5" />
              <span>Download (Free Only)</span>
            </a>
          </div>
          
          <div className="prose prose-invert max-w-none text-gray-300 mt-6">
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
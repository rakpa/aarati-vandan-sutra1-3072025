import React from 'react';
import { Link } from 'react-router-dom';
import { MenuBar } from './MenuBar';

const Header = () => {
  return (
    <header className="divine-gradient text-white shadow-md">
      <div className="w-full px-2 sm:container sm:mx-auto sm:px-4 py-6 md:py-8 flex flex-col md:flex-row items-center relative">
        <Link
          to="/"
          className="flex items-center gap-2 whitespace-nowrap text-xl md:text-2xl font-bold text-divine-gold hover:underline focus:underline mb-3 md:mb-0 md:absolute md:left-4"
          style={{ lineHeight: 1 }}
        >
          <img 
            src="/logo.png.png"
            alt="देव संस्कृती Logo" 
            className="h-12 w-12 md:h-16 md:w-16 object-contain rounded-full"
            onError={(e) => {
              // Fallback to logo.png if logo.png.png doesn't work
              const target = e.target as HTMLImageElement;
              if (!target.src.includes('/logo.png')) {
                target.src = '/logo.png';
              }
            }}
          />
          <span>देव संस्कृती</span>
        </Link>
        <nav className="flex flex-row items-center justify-center gap-4 md:gap-6 w-full">
          <MenuBar menuClassName="text-white font-normal font-marathi text-lg" />
          <Link
            to="/"
            className="px-3 py-2 rounded-md hover:bg-divine-light/20 transition-colors font-normal text-lg font-marathi"
          >
            मुख्यपृष्ठ
          </Link>
          <Link
            to="/favorites"
            className="px-3 py-2 rounded-md hover:bg-divine-light/20 transition-colors font-normal text-lg font-marathi"
          >
            आवडते
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

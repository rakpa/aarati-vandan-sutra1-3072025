import React from 'react';
import { Link } from 'react-router-dom';
import { MenuBar } from './MenuBar';

const Header = () => {
  return (
    <header className="divine-gradient text-white shadow-md">
      <div className="w-full px-2 sm:container sm:mx-auto sm:px-4 py-4 flex flex-row items-center justify-start">
        <Link
          to="/"
          className="whitespace-nowrap text-lg md:text-xl font-bold text-divine-gold ml-2 hover:underline focus:underline order-1 md:order-1 mr-4"
          style={{ lineHeight: 1 }}
        >
          देव आरती संग्रह
        </Link>
        <nav className="flex flex-row items-center gap-2 order-2 md:order-2 w-full">
          <MenuBar menuClassName="text-white font-normal font-marathi text-base" />
          <Link
            to="/"
            className="px-3 py-2 rounded-md hover:bg-divine-light/20 transition-colors font-normal text-base font-marathi"
          >
            मुख्यपृष्ठ
          </Link>
          <Link
            to="/favorites"
            className="px-3 py-2 rounded-md hover:bg-divine-light/20 transition-colors font-normal text-base font-marathi"
          >
            आवडते
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

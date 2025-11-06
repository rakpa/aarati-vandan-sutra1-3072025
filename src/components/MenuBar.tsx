import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { aartiData } from '@/data/aartis';
import { Menu as MenuIcon, X as CloseIcon } from 'lucide-react';

interface MenuBarProps {
  menuClassName?: string;
}

// Group aartis by type and deity
const groupedAartis = aartiData.reduce((acc, item) => {
  let type;
  if (item.title.includes('चालीसा')) {
    type = 'चालीसा';
  } else if (item.title.includes('आरती')) {
    type = 'आरती';
  } else if (item.title.includes('स्तोत्र')) {
    type = 'स्तोत्र';
  } else if (item.title.includes('मंत्र')) {
    type = 'मंत्र';
  } else {
    type = 'श्लोक';
  }
  if (!acc[type]) {
    acc[type] = [];
  }
  acc[type].push(item);
  return acc;
}, {} as Record<string, typeof aartiData>);

const categoryOrder = ['आरती', 'चालीसा', 'स्तोत्र', 'मंत्र', 'श्लोक'];
const navLinks: { label: string; to: string }[] = [];

export function MenuBar({ menuClassName }: MenuBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOpenCategory, setMobileOpenCategory] = useState<string | null>(null);

  const handleMouseEnter = (type: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setOpenDropdown(type);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  // Desktop menu
  const desktopMenu = (
    <ul className={`hidden md:flex space-x-4 items-center ${menuClassName || ''}`}>
      {categoryOrder.map((type) => (
        <li key={type} className="relative">
          <div
            onMouseEnter={() => handleMouseEnter(type)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="px-3 py-2 rounded-md hover:bg-divine-light/20 transition-colors font-normal text-base font-marathi focus:outline-none"
              style={{ background: openDropdown === type ? 'rgba(255,255,255,0.05)' : undefined }}
              type="button"
            >
              {type}
            </button>
            {openDropdown === type && groupedAartis[type] && groupedAartis[type].length > 0 && (
              <div className="absolute left-0 top-full z-50 w-max bg-divine rounded shadow-lg flex flex-col px-2 py-2" style={{minWidth: '200px'}}>
                {groupedAartis[type].map((item) => (
                  <Link
                    key={item.id}
                    to={`/aarti/${item.id}`}
                    className="whitespace-nowrap px-3 py-2 text-white font-marathi text-base hover:bg-divine-light/30 rounded transition-colors my-1"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
      {navLinks.map(link => (
        <li key={link.to}>
          <Link
            to={link.to}
            className="px-3 py-2 rounded-md hover:bg-divine-light/20 transition-colors font-normal text-base font-marathi"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  // Mobile menu
  const mobileMenu = (
    <>
      <button
        className="md:hidden flex items-center px-3 py-2 text-white focus:outline-none"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Open menu"
      >
        {mobileOpen ? <CloseIcon size={28} /> : <MenuIcon size={28} />}
      </button>
      {mobileOpen && (
        <div className="fixed left-0 right-0 top-16 w-full bg-divine z-50 flex flex-col items-stretch py-2 shadow-lg md:hidden animate-fade-in">
          {categoryOrder.map((type) => (
            <div key={type}>
              <button
                className="w-full px-6 py-3 text-white font-marathi text-base hover:bg-divine-light/30 transition-colors border-b border-divine-light/20 text-left"
                onClick={() => setMobileOpenCategory(mobileOpenCategory === type ? null : type)}
              >
                {type}
              </button>
              {mobileOpenCategory === type && groupedAartis[type] && groupedAartis[type].length > 0 && (
                <div className="bg-divine-light/10">
                  {groupedAartis[type].map((item) => (
                    <Link
                      key={item.id}
                      to={`/aarti/${item.id}`}
                      className="block px-8 py-2 text-white font-marathi text-base hover:bg-divine-light/30 transition-colors border-b border-divine-light/20"
                      onClick={() => {
                        setMobileOpen(false);
                        setMobileOpenCategory(null);
                      }}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="px-6 py-3 text-white font-marathi text-base hover:bg-divine-light/30 transition-colors border-b border-divine-light/20"
              onClick={() => {
                setMobileOpen(false);
                setMobileOpenCategory(null);
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );

  return (
    <>
      {desktopMenu}
      {mobileMenu}
    </>
  );
} 
import React from 'react';
import { Link } from 'react-router-dom';

export interface AartiItem {
  id: string;
  deity: string;
  title: string;
  thumbnail: string;
}

interface AartiListProps {
  aartis: AartiItem[];
}

const AartiList: React.FC<AartiListProps> = ({ aartis }) => {
  // Group aartis by deity
  const groupedAartis = aartis.reduce((acc, aarti) => {
    if (!acc[aarti.deity]) {
      acc[aarti.deity] = [];
    }
    acc[aarti.deity].push(aarti);
    return acc;
  }, {} as Record<string, AartiItem[]>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {Object.entries(groupedAartis).map(([deity, deityAartis]) => (
        <div
          key={deity}
          className="bg-white rounded-xl border border-orange-100 p-8 flex flex-col shadow-sm"
        >
          <div className="flex items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center mr-6">
              <span className="text-5xl font-bold text-divine">{deity.charAt(0)}</span>
            </div>
            <span className="text-3xl font-bold text-divine">{deity}</span>
          </div>
          <div className="flex flex-col gap-2 ml-32">
            {deityAartis.map((aarti) => (
              <Link
                key={aarti.id}
                to={`/aarti/${aarti.id}`}
                className="block text-lg text-gray-700 hover:text-divine transition-colors font-normal"
              >
                {aarti.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AartiList;

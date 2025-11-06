import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { aartiData, deitySubtitles } from '@/data/aartis';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';

// Mapping from card deity names to actual aartiData deity names
const deityDataNameMap: Record<string, string> = {
  'श्री गणेश': 'श्री गणपती बाप्पा',
  'श्री शिव': 'श्री शिव',
  'श्री विष्णु': 'श्री विष्णु',
  'श्री दुर्गा': 'श्री दुर्गा',
  'श्री हनुमान': 'श्री हनुमान',
  'श्री लक्ष्मी': 'श्री लक्ष्मी',
};

const DeityPage = () => {
  const { deity } = useParams<{ deity: string }>();
  const dataDeity = deityDataNameMap[deity || ''] || deity;
  const aartis = aartiData.filter(a =>
    (dataDeity === 'श्री गणपती बाप्पा' && (a.deity === 'श्री गणपती बाप्पा' || a.deity === 'श्री गणेश')) ||
    (dataDeity === 'श्री गणेश' && (a.deity === 'श्री गणपती बाप्पा' || a.deity === 'श्री गणेश')) ||
    a.deity === dataDeity
  );
  const subtitle = deitySubtitles[deity || ''] || '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container mx-auto py-6 px-4">
        <Card className="mb-8 border-divine/20 p-6 bg-gradient-to-r from-divine/5 to-divine-gold/5 temple-bg">
          <h2 className="text-2xl md:text-3xl font-bold text-divine text-center mb-3">
            {deity}
          </h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto">{subtitle}</p>
        </Card>
        <Card className="bg-white border-divine/10 shadow-sm p-6">
          <ul className="list-disc list-inside">
            {aartis.map((aarti, idx) => (
              <li
                key={aarti.id}
                className={idx !== aartis.length - 1 ? "mb-4" : ""}
              >
                <Link to={`/aarti/${aarti.id}`} className="text-lg font-bold text-divine underline hover:underline">
                  {aarti.title}
                </Link>
              </li>
            ))}
            {/* Add Gyaneshwar Haripath link for 'श्री विठ्ठल' only */}
            {deity === 'श्री विठ्ठल' && (
              <li className="mt-4">
                <Link to="/gyaneshwar-haripath" className="text-lg font-bold text-divine underline hover:underline">
                  श्री ज्ञानदेव हरिपाठ
                </Link>
              </li>
            )}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default DeityPage; 
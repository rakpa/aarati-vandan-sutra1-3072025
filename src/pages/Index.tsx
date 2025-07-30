import React from 'react';
import Header from '@/components/Header';
import { aartiData, deitySubtitles } from '@/data/aartis';
import { Card } from "@/components/ui/card";
import { Link } from 'react-router-dom';

// Import all images from the /public directory
const images = import.meta.glob('/public/*.png', { eager: true, as: 'url' });
console.log('Loaded images:', images);

// Mapping from card deity names to actual aartiData deity names
const deityDataNameMap: Record<string, string> = {
  'श्री गणेश': 'श्री गणपती बाप्पा',
  'श्री शिव': 'श्री शिव',
  'श्री विष्णु': 'श्री विष्णु',
  'श्री दुर्गा': 'श्री दुर्गा',
  'श्री हनुमान': 'श्री हनुमान',
  'श्री लक्ष्मी': 'श्री लक्ष्मी',
  'श्री दत्त': 'श्री दत्त',
  'श्री विठ्reल': 'श्री विठ्ठल',
  'श्री व्यंकटेश': 'श्री व्यंकटेश',
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container mx-auto py-6 px-4">
        <Card className="mb-8 border-divine/20 p-6 bg-gradient-to-r from-divine/5 to-divine-gold/5 temple-bg">
          <h2 className="text-2xl md:text-3xl font-bold text-divine text-center mb-3">
            देवांच्या आरत्या
          </h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto">
            या अॅपमध्ये आपण विविध देवांच्या आरत्या वाचू शकता. प्रत्येक आरती मराठी भाषेत उपलब्ध आहे.
          </p>
        </Card>
        
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(deitySubtitles).map(([deity, subtitle]) => {
              const mainName = deity.replace(/^श्री\s*/, '');
              const circleLetter = mainName.charAt(0);
              // Use mapping to find the correct aartiData deity name
              const dataDeity = deityDataNameMap[deity] || deity;
              const aarti = aartiData.find(a => a.deity === dataDeity);
              const imageUrl = aarti?.thumbnail ? images[`/public/${aarti.thumbnail}.png`] : null;
              console.log('Card:', deity, 'Image URL:', imageUrl);

              return (
                <Link
                  key={deity}
                  to={`/deity/${encodeURIComponent(deity)}`}
                  className="hover:scale-105 transition-transform"
                >
                  <Card className="flex flex-col items-stretch justify-between h-64 bg-[#f5e9e6] border-0 shadow-md p-0 overflow-hidden">
                    {/* Top section with circle or image */}
                    <div className="flex-1 flex flex-col items-center justify-center bg-[#f5e9e6]">
                      {imageUrl ? (
                        <img 
                          src={imageUrl}
                          alt={deity}
                          className="w-28 h-28 rounded-lg object-contain mb-4"
                        />
                      ) : (
                        <div className="w-28 h-28 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                          <span className="text-5xl font-bold text-divine">{circleLetter}</span>
                        </div>
                      )}
                    </div>
                    {/* Bottom white section for text */}
                    <div className="bg-white w-full pt-2 pb-4 px-2 rounded-b-lg flex flex-col items-center">
                      <div className="text-xl font-bold text-divine mb-1 mt-2">{deity}</div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      
      <footer className="bg-divine text-white p-4 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-divine-accent">© 2025 देव आरती संग्रह. सर्व हक्क राखीव.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

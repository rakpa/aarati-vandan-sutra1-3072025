import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';
import { getAartiById } from '@/data/aartis';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteAartis, setFavoriteAartis] = useState<any[]>([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(favs);
    setFavoriteAartis(favs.map((id: string) => getAartiById(id)).filter(Boolean));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="w-full px-2 sm:container sm:mx-auto sm:py-6 sm:px-4">
        <Card className="mb-8 border-divine/20 p-6 bg-gradient-to-r from-divine/5 to-divine-gold/5 temple-bg">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="h-6 w-6 text-divine fill-divine-gold" />
            <h2 className="text-2xl md:text-3xl font-bold text-divine text-center">
              आवडत्या आरत्या
            </h2>
          </div>
          <p className="text-center text-gray-700">
            तुमच्या आवडत्या आरत्या येथे दिसतील.
          </p>
        </Card>
        {favoriteAartis.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">अजून कोणतीही आरती आवडतीमध्ये जोडलेली नाही.</p>
            <Button
              variant="outline"
              className="border-divine hover:bg-divine hover:text-white"
              onClick={() => window.location.href = '/'}
            >
              आरत्या ब्राउझ करा
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favoriteAartis.map(aarti => (
              <Card key={aarti.id} className="p-4 border-divine/20">
                <div className="font-bold text-lg text-divine mb-2">{aarti.title}</div>
                <div className="text-gray-700 mb-2">{aarti.deity}</div>
                <Button
                  variant="outline"
                  className="border-divine text-divine hover:bg-divine hover:text-white"
                  onClick={() => window.location.href = `/aarti/${aarti.id}`}
                >
                  वाचा
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <footer className="bg-divine text-white p-4 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-divine-accent">© 2025 देव आरती संग्रह. सर्व हक्क राखीव.</p>
          <Link to="/privacy-policy" className="text-divine-accent hover:text-white underline text-sm mt-2 block">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default FavoritesPage;

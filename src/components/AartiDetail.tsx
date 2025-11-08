import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

interface AartiDetailProps {
  id: string;
  deity: string;
  title: string;
  content: string;
  audioUrl?: string;
}

const AartiDetail: React.FC<AartiDetailProps> = ({ id, deity, title, content, audioUrl }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // Check if this aarti is in favorites on mount
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favs.includes(id));
  }, [id]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updated;
    if (favs.includes(id)) {
      updated = favs.filter((fid: string) => fid !== id);
      setIsFavorite(false);
    } else {
      updated = [...favs, id];
      setIsFavorite(true);
    }
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="container mx-auto py-6 px-1">
      <Card className="overflow-hidden border-divine/20">
        <div className="bg-divine p-6 text-white">
          <div className="flex justify-between items-center relative">
            <div className="flex-1 flex flex-col items-center text-center">
              <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
              <p className="text-divine-accent mt-1">{deity}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-divine-gold hover:bg-white/20 absolute right-0"
              onClick={toggleFavorite}
            >
              <Heart className={`h-6 w-6 ${isFavorite ? 'fill-divine-gold' : ''}`} />
            </Button>
          </div>
        </div>
        
        {audioUrl && <AudioPlayer audioUrl={audioUrl} />}
        
        <CardContent className="p-3">
          <div className="aarti-text whitespace-pre-line">
            {(() => {
              const lines = content.split('\n').filter(line => line.trim() !== '');
              const elements = [];
              for (let i = 0; i < lines.length; i += 2) {
                // Bold 'दोहा' and 'चौपाई'
                const renderLine = (line, key) => {
                  if (line.trim() === 'चौपाई') {
                    return [
                      <div key={`space-before-chaupai-${key}`} style={{ height: '1.5em' }} />,
                      <p key={key} className="mb-2 font-bold">{line}</p>
                    ];
                  }
                  if (line.trim() === 'दोहा') {
                    return <p key={key} className="mb-2 font-bold">{line}</p>;
                  }
                  return <p key={key} className="mb-2">{line}</p>;
                };
                // For the first two lines (doha), do not add extra space after
                const isFirstDoha = i === 0;
                elements.push(renderLine(lines[i], i));
                if (lines[i + 1]) {
                  elements.push(renderLine(lines[i + 1], i + 1));
                }
                // Add extra space after every two lines, except after the last group and not after the first doha
                if (!isFirstDoha && i + 2 < lines.length) {
                  elements.push(
                    <div key={`space-${i}`} style={{ height: '1.5em' }} />
                  );
                }
              }
              return elements;
            })()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AartiDetail;


import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAartiById } from '@/data/aartis';
import Header from '@/components/Header';
import AartiDetail from '@/components/AartiDetail';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

const AartiPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const aarti = id ? getAartiById(id) : null;

  const goBack = () => {
    navigate(-1);
  };

  if (!aarti) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <Header />
        <div className="container mx-auto py-10 px-4 text-center">
          <p className="text-xl text-divine mb-4">आरती सापडली नाही</p>
          <Button onClick={goBack} variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={16} /> मागे जा
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container mx-auto py-4 px-2">
        <Button 
          onClick={goBack} 
          variant="ghost" 
          className="mb-4 text-divine hover:bg-divine/10 flex items-center gap-2"
        >
          <ArrowLeft size={16} /> मागे जा
        </Button>

        <AartiDetail
          id={aarti.id}
          deity={aarti.deity}
          title={aarti.title}
          content={aarti.content}
          audioUrl={aarti.audioUrl}
        />
      </div>
      
      <footer className="bg-divine text-white p-4 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-divine-accent">© 2025 देव आरती संग्रह. सर्व हक्क राखीव.</p>
        </div>
      </footer>
    </div>
  );
};

export default AartiPage;

import { useState, useEffect } from 'react';
import { Input } from "./ui/input";
import { Link } from 'react-router-dom';

interface SearchResult {
  title: string;
  type: string;
  path: string;
  deity: string;
}

// Common transliteration mappings
const transliterationMap: Record<string, string[]> = {
  'a': ['अ', 'आ'],
  'aa': ['आ'],
  'i': ['इ', 'ई'],
  'ii': ['ई'],
  'u': ['उ', 'ऊ'],
  'uu': ['ऊ'],
  'e': ['ए', 'ऐ'],
  'ai': ['ऐ'],
  'o': ['ओ', 'औ'],
  'au': ['औ'],
  'k': ['क'],
  'kh': ['ख'],
  'g': ['ग'],
  'gh': ['घ'],
  'ng': ['ङ'],
  'ch': ['च'],
  'chh': ['छ'],
  'j': ['ज'],
  'jh': ['झ'],
  'ny': ['ञ'],
  't': ['त', 'ट'],
  'th': ['थ', 'ठ'],
  'd': ['द', 'ड'],
  'dh': ['ध', 'ढ'],
  'n': ['न', 'ण'],
  'p': ['प'],
  'ph': ['फ'],
  'b': ['ब'],
  'bh': ['भ'],
  'm': ['म'],
  'y': ['य'],
  'r': ['र'],
  'l': ['ल', 'ळ'],
  'v': ['व'],
  'w': ['व'],
  'sh': ['श', 'ष'],
  's': ['स'],
  'h': ['ह'],
  'ksh': ['क्ष'],
  'tr': ['त्र'],
  'gy': ['ज्ञ'],
  'shri': ['श्री'],
  'om': ['ॐ'],
  // Ganpati/Ganesh variations
  'ganpati': ['गणपती', 'गणपति'],
  'ganesh': ['गणेश'],
  'ganapati': ['गणपती', 'गणपति'],
  'ganapati bappa': ['गणपती बाप्पा'],
  'ganesh bappa': ['गणेश बाप्पा'],
  'ganpati bappa': ['गणपती बाप्पा'],
  'ganapati aarti': ['गणपतीची आरती'],
  'ganesh aarti': ['गणेशाची आरती'],
  'ganpati aarti': ['गणपतीची आरती'],
  'ganapati stotra': ['गणपती स्तोत्र'],
  'ganesh stotra': ['गणेश स्तोत्र'],
  'ganpati stotra': ['गणपती स्तोत्र'],
  'ganapati atharvashirsha': ['गणपती अथर्वशीर्ष'],
  'ganesh atharvashirsha': ['गणेश अथर्वशीर्ष'],
  'ganpati atharvashirsha': ['गणपती अथर्वशीर्ष'],
  // Other deity mappings
  'hanuman': ['हनुमान'],
  'shiva': ['शिव'],
  'vishnu': ['विष्णु'],
  'durga': ['दुर्गा'],
  'lakshmi': ['लक्ष्मी'],
  'datta': ['दत्त'],
  'vitthal': ['विठ्ठल'],
  // Common words
  'aarti': ['आरती'],
  'stotra': ['स्तोत्र'],
  'chalisa': ['चालीसा'],
  'bappa': ['बाप्पा'],
  'morya': ['मोरया'],
  'morya re': ['मोरया रे'],
};

function transliterateToMarathi(text: string): string[] {
  const words = text.toLowerCase().split(/\s+/);
  const marathiWords: string[] = [];
  
  words.forEach(word => {
    // Check if the word exists in our mapping
    if (transliterationMap[word]) {
      marathiWords.push(...transliterationMap[word]);
    }
    // If not, try to transliterate character by character
    else {
      let marathiWord = '';
      let i = 0;
      while (i < word.length) {
        let found = false;
        // Try to match the longest possible sequence
        for (let len = Math.min(4, word.length - i); len > 0; len--) {
          const seq = word.slice(i, i + len);
          if (transliterationMap[seq]) {
            marathiWord += transliterationMap[seq][0];
            i += len;
            found = true;
            break;
          }
        }
        if (!found) {
          marathiWord += word[i];
          i++;
        }
      }
      marathiWords.push(marathiWord);
    }
  });
  
  return marathiWords;
}

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchData = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        // Import all data files
        const aartisModule = await import('../data/aartis');
        
        // Get all aartis data
        const allData = aartisModule.aartiData.map((item: any) => ({
          title: item.title,
          type: item.title.includes('आरती') ? 'Aarti' : 'Stotra',
          path: `/aarti/${item.id}`,
          deity: item.deity
        }));

        // Generate Marathi variations of the search query
        const marathiVariations = transliterateToMarathi(searchQuery);
        
        // Filter results based on search query and its Marathi variations
        const results = allData.filter((item) => {
          const searchLower = searchQuery.toLowerCase();
          const titleLower = item.title.toLowerCase();
          const deityLower = item.deity.toLowerCase();
          
          // Check if any of the Marathi variations match
          const matchesMarathi = marathiVariations.some(variation => 
            titleLower.includes(variation) || deityLower.includes(variation)
          );
          
          // Check if the original search query matches
          const matchesOriginal = titleLower.includes(searchLower) || 
                                deityLower.includes(searchLower);
          
          return matchesMarathi || matchesOriginal;
        });

        setSearchResults(results);
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Input
        type="text"
        placeholder="आरती किंवा स्तोत्र शोधा (मराठीत किंवा इंग्रजीत)..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-4 text-lg border-2 border-primary/50 rounded-lg shadow-sm focus:ring-2 focus:ring-primary hover:border-primary"
      />
      
      {searchQuery && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center">Searching...</div>
          ) : searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <Link
                key={index}
                to={result.path}
                className="block p-4 hover:bg-gray-50 border-b last:border-b-0"
                onClick={() => setSearchQuery('')}
              >
                <div className="font-medium">{result.title}</div>
                <div className="text-sm text-gray-500">{result.deity} • {result.type}</div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
} 
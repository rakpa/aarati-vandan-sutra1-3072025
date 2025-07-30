import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const dattaBavaniContent = `जय योगीश्वर दत्त दयाळ । तूंच एक जगती प्रतिपाळ ॥ १॥

अत्र्यनुसये करूनि निमित्त । प्रगटसि जगतास्तव निश्चित ॥ २॥

ब्रह्माऽच्युतशंकर अवतार । शरणांगतासि तूं आधार ॥ ३॥

अंतर्यामी ब्रह्यस्वरूप । बाह्य गुरु नररूप सुरूप ॥ ४॥

काखिं अन्नपूर्णा झोळी । शांति कमंडलु करकमळी ॥ ५॥

कुठें षड्भुजा कोठें चार । अनंत बाहू तूं निर्धार ॥ ६॥

आलो चरणी बाळ अजाण । दिगंबरा, उठ जाई प्राण ॥ ७॥

ऐकुनि अर्जुन-भक्ती-साद । प्रसन्न झाला तूं साक्षात् ॥ ८॥

दिधली ऋद्धी सिद्धी अपार । अंती मोक्ष महापद सार ॥ ९॥

केला कां तूं आज विलंब? तुजविण मजला ना आलंब ।  । १०॥

विष्णुशर्म द्विज तारुनिया । श्राद्धिं जेंविला प्रेममया ॥ ११॥

जंभे देवा त्रासविले । कृपामृते त्वां हांसविलें ॥ १२॥

पसरी माया दितिसुत मूर्त । इंद्रा करवी वधिला तूर्त? ॥ १३॥

ऐसी लीला जी जी शर्व । केली, वर्णिल कैसी सर्व? ॥ १४॥

घेई आयु सुतार्थी नाम । केला त्यातें तूं निष्काम ॥ १५॥

बोधियले यदु परशुराम । साध्य देव प्रह्लाद अकाम ॥ १६॥

ऐसी ही तव कृपा अगाध । कां न ऐकसी माझी साद  ॥ १७॥

धांव अनंता, पाहि न अंत । न करी मध्येच शिशुचा अंत ॥ १८॥

पाहुनि द्विजपत्नीकृत स्नेह । झाला सुत तूं निःसंदेह ॥ १९॥

स्मर्तृगामी कलितार कृपाळ । जडमुढ रजका तारी दयाळ ॥ २०॥

पोटशुळी द्विज तारियला । ब्राह्यणश्रेष्ठी उद्धरिला ॥ २१॥

सहाय कां ना दे अजरा? । प्रसन्न नयने देख जरा ॥ २२॥

वृक्ष शुष्क तूं पल्लविला । उदास मजविषयी झाला ॥ २३॥

वंध्या स्त्रीची सुत-स्वप्नें । फळली झाली गृहरत्नें ॥ २४॥

निरसुनि विप्रतनूचे कोड । पुरवी त्याच्या मनिचें कोड ॥ २५॥

दोहविली वंध्या महिषी । ब्राह्मण दारिद्र्या हरिसी ॥ २६॥

घेवडा भक्षुनि प्रसन्न-क्षेम । दिधला सुवर्ण घट सप्रेम ॥ २७॥

ब्राह्मण स्त्रीचा मृत भ्रतार । केला सजीव, तूं आधार ॥ २८॥

पिशाच्च पीडा केली दूर । विप्रपुत्र उठवीला शूर ॥ २९॥

अंत्यज हस्तें विप्रमदास । हरुनी रक्षिले त्रिविक्रमास ॥ ३०॥

तंतुक भक्ता क्षणांत एक । दर्शन दिधले शैलीं नेक ॥ ३१॥

एकत्र वेळी अष्टस्वरूप । झाला अससी, पुन्हां अरूप ॥ ३२॥

तोषविले निज भक्त सुजात । दाखवुनि प्रचिती साक्षात ॥ ३३॥

हरला यवननृपाचा कोड । समता ममता तुजला गोड ॥ ३४॥

राम-कन्हैया रूपधरा । केल्या लीला दिगंबरा! ॥ ३५॥

शिला तारिल्या, गणिका, व्याध । पशुपक्षी तुज देती साद ॥ ३६॥

अधमा तारक तव शुभ नाम । गाता किती न होती काम ॥ ३७॥

आधि-व्याधि-उपाधि-गर्व । टळती भावें भजतां सर्व ॥ ३८॥

मूठ मंत्र नच लागे जाण । पावे नर स्मरणे निर्वाण ॥ ३९॥

डाकिण, शाकिण, महिषासूर । भूतें, पिशाच्चें, झिंद, असूर ॥ ४०॥

पळती मुष्टी आवळुनी । धून-प्रार्थना-परिसोनी ॥ ४१॥

करुनि धूप गाइल नेमें । दत्तवावनी जो प्रेमें ॥ ४२॥

साधे त्याला इह परलोक । मनी तयाच्या उरे न शोक ॥ ४३॥

राहिल सिद्धी दासीपरी । दैन्य आपदा पळत दुरी ॥ ४४॥

नेमे बावन गुरुवारी । प्रेमे बावन पाठ करी ॥ ४५॥

यथावकाशे स्मरी सुधी । यम ना दंडे त्यास कधी ॥ ४६॥

अनेक रूपी हाच अभंग । भजतां नडे न मायारंग ॥ ४७॥

सहस्र नामें वेष अनेक । दत्त दिगंबर अंती एक ॥ ४८॥

वंदन तुजला वारंवार । वेद श्वास हें तव निर्धार ॥ ४९॥

थकला वर्णन करतां शेष । कोण रंक मी बहुकृत वेष ॥ ५०॥

अनुभवतृप्तीचे उद्गार । ऐकुनी हंसता खाइल मार ॥ ५१॥

तपसी तत्त्वमसी हा देव । बोला जयजय श्री गुरुदेव ॥ ५२॥

॥ अवधूत चिंतन श्री गुरुदेव दत्त ॥`;

const DATTA_BAVANI_ID = 'datta-bavani';

const DattaBavani = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favs.includes(DATTA_BAVANI_ID));
  }, []);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updated;
    if (favs.includes(DATTA_BAVANI_ID)) {
      updated = favs.filter((fid) => fid !== DATTA_BAVANI_ID);
      setIsFavorite(false);
    } else {
      updated = [...favs, DATTA_BAVANI_ID];
      setIsFavorite(true);
    }
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container mx-auto py-6 px-4">
        <div className="mb-4">
          <Link to="/deity/श्री दत्त" className="inline-flex items-center font-bold text-divine text-base hover:underline">
            <span className="mr-1">←</span> मागे जा
          </Link>
        </div>
        <Card className="mb-8 border-0 overflow-hidden">
          <div className="bg-divine p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">श्री दत्तबावनी</h2>
                <p className="text-divine-accent mt-1">श्री दत्त</p>
              </div>
              <button
                type="button"
                className="text-white hover:text-divine-gold hover:bg-white/20 rounded-full p-2"
                onClick={toggleFavorite}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`h-6 w-6 ${isFavorite ? 'fill-divine-gold' : ''}`} />
              </button>
            </div>
          </div>
        </Card>
        <Card className="bg-white border-divine/10 shadow-sm p-6 whitespace-pre-line text-lg">
          {dattaBavaniContent}
        </Card>
      </div>
    </div>
  );
};

export default DattaBavani; 
import React, { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+C, Ctrl+A, Ctrl+X (copy, select all, cut) only within privacy policy content
      if ((e.ctrlKey || e.metaKey) && ['c', 'a', 'x'].includes(e.key.toLowerCase())) {
        const target = e.target as Node;
        if (contentRef.current?.contains(target)) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }
    };

    const handleSelectStart = (e: Event) => {
      // Prevent text selection within privacy policy content
      if (contentRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('selectstart', handleSelectStart, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('selectstart', handleSelectStart, true);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      <div className="container mx-auto py-6 px-4">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center font-bold text-divine text-base hover:underline">
            <span className="mr-1">←</span> मागे जा
          </Link>
        </div>
        <Card className="mb-8 border-divine/20 p-6 bg-gradient-to-r from-divine/5 to-divine-gold/5 temple-bg select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-divine text-center mb-3" onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>
            Privacy Policy
          </h2>
        </Card>
        <Card className="bg-white border-divine/10 shadow-sm p-6">
          <div ref={contentRef} className="prose max-w-none select-none text-center" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}>
            <p className="text-gray-700 mb-6 text-lg" onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>
              Devasanskriti.com is dedicated to providing devotional content such as Aarati, Shlok, and Stotra in Marathi and Hindi languages. Your privacy is important to us. This Privacy Policy explains how we handle your information when you use our website and Android app.
            </p>
            
            <h3 className="text-2xl font-bold text-divine mb-4 mt-6" onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>Information Collection and Use</h3>
            <p className="text-gray-700 mb-4 text-lg" onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>
              Currently, we do not collect any personal information from users. In the future, if you choose to sign up for our newsletter or updates, we may collect your email ID. Providing your email ID is completely optional, and it will be used solely to send you devotional updates or newsletters.
            </p>
            
            <h3 className="text-2xl font-bold text-divine mb-4 mt-6" onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>Cookies and Tracking</h3>
            <p className="text-gray-700 mb-4 text-lg" onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>
              At present, we do not use cookies or any tracking technologies on our website or app. In the future, if we implement Google AdMob or other ad services, standard cookies or tracking technologies may be used by those services to display relevant ads.
            </p>
            
            <h3 className="text-2xl font-bold text-divine mb-4 mt-6" onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>Third-Party Services</h3>
            <p className="text-gray-700 mb-4 text-lg" onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>
              We plan to use Google AdMob or other Google advertising services to display ads in our app and website to support our devotional content. These third-party services may collect anonymous information such as device identifiers and ad interaction data to serve personalized ads. We do not control how these services use your data; please review their privacy policies for more details.
            </p>
            
            <h3 className="text-2xl font-bold text-divine mb-4 mt-6" onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>Data Security</h3>
            <p className="text-gray-700 mb-4 text-lg" onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>
              We take reasonable measures to protect any personal information you provide, such as your email ID, against unauthorized access, disclosure, or misuse. However, no method of transmission over the internet or electronic storage is completely secure.
            </p>
            
            <h3 className="text-2xl font-bold text-divine mb-4 mt-6" onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>Changes to This Privacy Policy</h3>
            <p className="text-gray-700 mb-4 text-lg" onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify users of significant changes by posting the updated policy on this page. Your continued use of our website or app after changes indicates your acceptance of the updated policy.
            </p>
            
            <h3 className="text-2xl font-bold text-divine mb-4 mt-6" onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>Contact Information</h3>
            <p className="text-gray-700 mb-4 text-lg" onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>
              If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us at:
            </p>
            <p className="text-gray-700 mb-4 text-lg" onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>
              <a href="mailto:info@devasanskriti.com" className="text-divine hover:underline" onCopy={(e) => e.preventDefault()}>
                info@devasanskriti.com
              </a>
            </p>
          </div>
        </Card>
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

export default PrivacyPolicy;


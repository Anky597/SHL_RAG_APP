
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-shl-black text-shl-silver mt-auto border-t border-shl-gray/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-shl-green">SHL Finder</h3>
            <p className="text-shl-silver/70 text-sm">
              AI-powered assessment solution recommendations for HR professionals.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-end gap-8">
            <div>
              <h4 className="font-semibold mb-3 text-shl-white">Quick Links</h4>
              <ul className="space-y-2 text-shl-silver/70">
                <li><Link to="/products" className="hover:text-shl-light-blue transition-colors">Products</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-shl-white">Contact</h4>
              <div className="flex items-center space-x-2 text-shl-silver/70">
                <Mail size={16} />
                <a href="mailto:contact@shl.com" className="hover:text-shl-light-blue transition-colors">aniket0nikam@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-shl-gray/20 mt-6 pt-6 flex justify-center">
          <p className="text-sm text-shl-silver/50">© {new Date().getFullYear()} SHL Finder. All rights reserved to Aniket Nikam.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

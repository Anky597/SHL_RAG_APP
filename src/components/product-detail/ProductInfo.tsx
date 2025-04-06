import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Download, BarChart3, Globe, FileText, MessageCircle, ExternalLink } from 'lucide-react'; // Added ExternalLink
import { Button } from "@/components/ui/button"; // Assuming this is Shadcn UI Button

interface ProductInfoProps {
  // Use a more specific type if possible, otherwise 'any' is okay for now
  product: {
    id: string; // Added for link generation
    completionTime?: string;
    languages?: number | string; // Allow string like "30+"
    suitableFor?: string[];
    featuredBenefits?: string[];
    productName?: string; // Added for context
  };
  handleDownloadBrochure: () => void;
}

export const ProductInfo = ({ product, handleDownloadBrochure }: ProductInfoProps) => {
  // --- Reusable Style Classes (Dark Theme) ---
  const cardClasses = "bg-slate-800 border border-slate-700 rounded-lg shadow-md overflow-hidden p-6";
  const primaryTextColor = "text-slate-100";
  const secondaryTextColor = "text-slate-300"; // Slightly brighter silver
  const tertiaryTextColor = "text-slate-400"; // For less emphasis
  const accentColor = "text-blue-400";
  const iconWrapperClasses = "bg-slate-700 rounded-full p-2 mr-3 flex-shrink-0"; // Consistent icon background
  const tagClasses = "px-2.5 py-1 bg-slate-700 rounded-full text-xs text-slate-300 whitespace-nowrap";
  const outlineButtonClasses = `border border-slate-600 ${secondaryTextColor} hover:bg-slate-700 hover:border-slate-500 hover:${primaryTextColor} focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors duration-200`;
  // Define a secondary button style if needed, or reuse outline/primary
  const secondaryButtonClasses = `bg-slate-700 ${secondaryTextColor} hover:bg-slate-600 hover:${primaryTextColor} border border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors duration-200`;
  // --- End Reusable Style Classes ---

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 md:mb-12">

      {/* Column 1: Key Information */}
      <div className={cardClasses}>
        <h3 className={`text-lg font-semibold mb-5 ${primaryTextColor}`}>Key Information</h3>

        <div className="space-y-4">
          {/* Completion Time */}
          {product.completionTime && (
             <div className="flex items-start">
               <div className={iconWrapperClasses}>
                 <Clock size={18} className={accentColor} />
               </div>
               <div>
                 <h4 className={`text-sm font-medium ${tertiaryTextColor}`}>Est. Completion Time</h4>
                 <p className={`text-sm ${secondaryTextColor}`}>{product.completionTime}</p>
               </div>
             </div>
          )}

          {/* Languages */}
          {product.languages && (
             <div className="flex items-start">
               <div className={iconWrapperClasses}>
                 <Globe size={18} className={accentColor} />
               </div>
               <div>
                 <h4 className={`text-sm font-medium ${tertiaryTextColor}`}>Available Languages</h4>
                 <p className={`text-sm ${secondaryTextColor}`}>
                    {typeof product.languages === 'number' ? `${product.languages}+` : product.languages}
                 </p>
               </div>
             </div>
          )}

          {/* Suitable For */}
          {product.suitableFor && product.suitableFor.length > 0 && (
             <div className="flex items-start">
               <div className={iconWrapperClasses}>
                 <FileText size={18} className={accentColor} />
               </div>
               <div>
                 <h4 className={`text-sm font-medium ${tertiaryTextColor} mb-1.5`}>Suitable For</h4>
                 <div className="flex flex-wrap gap-1.5">
                   {product.suitableFor.map((useCase: string) => (
                     <span key={useCase} className={tagClasses}>
                       {useCase}
                     </span>
                   ))}
                 </div>
               </div>
             </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-5 border-t border-slate-700 space-y-3">
          <Button
              variant="outline" // Use Shadcn variant mapping
              size="sm"
              onClick={handleDownloadBrochure}
              className={`${outlineButtonClasses} w-full justify-center gap-2`} // Added gap
            >
            <Download size={16} />
            Download Brochure
          </Button>
          <Button
             asChild
             variant="secondary" // Use Shadcn secondary or map custom class
             size="sm"
             className={`${secondaryButtonClasses} w-full justify-center gap-2`} // Added gap
           >
            {/* Ensure link is correct */}
            <Link to={`/roi-calculator?product=${product.id}`}>
              <BarChart3 size={16} />
              Calculate Potential ROI
            </Link>
          </Button>
        </div>
      </div>

      {/* Column 2: Key Benefits */}
       {product.featuredBenefits && product.featuredBenefits.length > 0 && (
         <div className={cardClasses}>
           <h3 className={`text-lg font-semibold mb-5 ${primaryTextColor}`}>Key Benefits</h3>
           <ul className="space-y-3">
             {product.featuredBenefits.map((benefit: string, index: number) => (
               <li key={index} className="flex items-start">
                 {/* Keep green check or use accent color */}
                 <CheckCircle size={18} className="text-green-500 mr-2.5 mt-0.5 flex-shrink-0" />
                 <span className={`text-sm ${secondaryTextColor}`}>{benefit}</span>
               </li>
             ))}
           </ul>
         </div>
       )}

      {/* Column 3: Call to Action */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-6 shadow-lg text-white flex flex-col"> {/* Added flex-col */}
        <h3 className="text-lg font-semibold mb-3 text-white">Ready to Learn More?</h3>
        <p className="text-sm text-blue-100 mb-6 flex-grow"> {/* Added flex-grow */}
          See how {product.productName || 'this assessment'} can fit into your talent strategy. Get a personalized demo or talk to an expert.
        </p>

        <div className="space-y-3 mt-auto"> {/* Added mt-auto */}
          <Button
            asChild
            variant="default" // This likely needs custom styling for light on dark gradient
            size="sm"
            // High contrast button style for gradient background
            className="w-full justify-center gap-2 bg-white text-blue-700 hover:bg-slate-100 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
           >
            {/* Ensure link is correct */}
            <Link to="/contact">
              Request Demo
            </Link>
          </Button>
          <Button
            asChild
            variant="outline" // Needs custom styling for gradient bg
            size="sm"
            // Outline style adapted for gradient
            className="w-full justify-center gap-2 border-white/50 text-white hover:bg-white/10 hover:border-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
           >
             {/* Ensure link is correct */}
            <Link to={`/products/compare?add=${product.id}`}>
              Add to Comparison
            </Link>
          </Button>
        </div>

        {/* Contact info (optional refinement) */}
        <div className="mt-6 pt-4 border-t border-white/30 text-sm text-blue-100">
          <p className="flex items-center justify-center gap-2 mb-1">
            <MessageCircle size={14} />
            Speak to a Solution Expert
          </p>
           {/* Make phone number more prominent */}
          <a href="tel:+18001234567" className="text-white font-semibold text-lg mt-1 block hover:underline text-center">
            +1 800 123 4567
          </a>
           {/* Optional: Link to contact page */}
           {/* <Link to="/contact" className={`text-xs ${accentColor} hover:underline block text-center mt-2`}>
             Or contact us online <ExternalLink size={12} className="inline ml-1"/>
           </Link> */}
        </div>
      </div>
    </div>
  );
};
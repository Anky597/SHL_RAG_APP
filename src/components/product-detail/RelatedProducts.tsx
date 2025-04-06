import { Link } from 'react-router-dom';
import { ChevronRight, Tag } from 'lucide-react'; // Added Tag icon

interface RelatedProduct {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
}

interface RelatedProductsProps {
  relatedProducts: RelatedProduct[];
}

export const RelatedProducts = ({ relatedProducts }: RelatedProductsProps) => {
  // --- Reusable Style Classes (Dark Theme) ---
  const primaryTextColor = "text-slate-100";        // White-ish
  const secondaryTextColor = "text-slate-300";      // Light silver/gray
  const accentColor = "text-blue-400";
  const accentHoverColor = "hover:text-blue-300";
  const contentBgColor = "bg-slate-800";            // Main dark background for content areas
  const contentBorderColor = "border-slate-700";    // Border for content areas
  // Card styling - slightly different hover for clickable card links
  const cardClasses = `${contentBgColor} border ${contentBorderColor} rounded-lg shadow-md overflow-hidden p-6 h-full flex flex-col transition-all duration-300 group`; // Added group for hover effects
  const cardHoverClasses = `hover:border-blue-600/70 hover:shadow-lg hover:shadow-blue-900/10 hover:-translate-y-1`; // Hover effect for the link card
  const tagClasses = "inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-700 rounded-full text-xs font-medium text-slate-300 whitespace-nowrap"; // Adjusted tag style
  // --- End Reusable Style Classes ---

  if (!relatedProducts || relatedProducts.length === 0) {
    return null; // Don't render anything if no related products
  }

  return (
    <div className="mb-10 md:mb-12 pt-10 md:pt-12 border-t border-slate-700"> {/* Added top border/padding */}
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 px-1"> {/* Added slight horizontal padding */}
        <h2 className={`text-2xl font-bold ${primaryTextColor}`}>Related Products</h2>
        {/* "View All" link styled for dark theme */}
        <Link
          to="/products" // Ensure this link is correct
          className={`mt-2 sm:mt-0 text-sm font-medium ${accentColor} ${accentHoverColor} flex items-center transition-colors duration-200 group`} // Added group for icon animation
         >
          <span>View all products</span>
          <ChevronRight size={16} className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5" /> {/* Subtle move on hover */}
        </Link>
      </div>

      {/* Grid of Related Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProducts.map((relatedProduct) => (
          // Entire card is a link
          <Link
            to={`/products/${relatedProduct.id}`} // Ensure product ID is correct for linking
            key={relatedProduct.id}
            className={`${cardClasses} ${cardHoverClasses}`} // Apply card styles and hover effects to the Link
           >
            {/* Category Tag */}
            <div className="mb-4">
              <span className={tagClasses}>
                 {/* Optional: Add a tag icon */}
                 {/* <Tag size={12} className="opacity-70" /> */}
                {relatedProduct.category}
              </span>
            </div>
            {/* Product Name (White) */}
            <h3 className={`text-lg font-semibold ${primaryTextColor} mb-2 group-hover:${accentColor} transition-colors duration-200`}>{relatedProduct.name}</h3> {/* Color change on hover */}
             {/* Short Description (Silver) */}
            <p className={`${secondaryTextColor} text-sm mb-4 flex-grow line-clamp-3`}>{relatedProduct.shortDescription}</p> {/* Added flex-grow and line-clamp */}
             {/* Learn More Link */}
            <div className="mt-auto pt-4 border-t ${contentBorderColor}"> {/* Ensure border color matches */}
              <span className={`${accentColor} font-medium text-sm flex items-center group-hover:underline`}> {/* Use group-hover */}
                Learn more
                <ChevronRight size={14} className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5" /> {/* Match animation */}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
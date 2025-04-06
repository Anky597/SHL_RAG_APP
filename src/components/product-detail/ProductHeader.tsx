
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Share2, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ProductHeaderProps {
  product: any;
  handleSaveToFavorites: () => void;
  handleShare: () => void;
}

export const ProductHeader = ({ product, handleSaveToFavorites, handleShare }: ProductHeaderProps) => {
  return (
    <>
      <div className="bg-shl-gray py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-white-600">
            <Link to="/" className="hover:text-shl-blue">Home</Link>
            <ChevronRight size={16} className="mx-1" />
            <Link to="/products" className="hover:text-shl-blue">Products</Link>
            <ChevronRight size={16} className="mx-1" />
            <Link to={`/products?category=${product.category}`} className="hover:text-shl-blue">{product.category}</Link>
            <ChevronRight size={16} className="mx-1" />
            <span className="text-gray-800 font-medium">{product.name}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <div className="flex items-center mb-3">
            <span className="px-3 py-1 bg-shl-gray rounded text-sm font-medium text-shl-blue mr-3">
              {product.category}
            </span>
            {product.featured && (
              <span className="px-3 py-1 bg-blue-100 rounded text-sm font-medium text-shl-blue flex items-center">
                <Star size={14} className="mr-1" />
                Featured Product
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-white-800 mb-2">{product.fullName || product.name}</h1>
          <p className="text-lg text-green-600">{product.shortDescription}</p>
        </div>
        
        <div className="flex mt-6 md:mt-0 space-x-3">
          <Button variant="outline" size="sm" onClick={handleSaveToFavorites} className="flex items-center">
            <Star size={16} className="mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center">
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
          <Button variant="default" size="sm" className="btn-primary flex items-center">
            <MessageCircle size={16} className="mr-2" />
            Contact Sales
          </Button>
        </div>
      </div>
    </>
  );
};

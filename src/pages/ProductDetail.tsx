
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useToast } from "@/components/ui/use-toast";
import ChatInterface from '@/components/ChatInterface';
import { productsData } from '@/data/products';
import { ProductHeader } from '@/components/product-detail/ProductHeader';
import { ProductInfo } from '@/components/product-detail/ProductInfo';
import { ProductDetailTabs } from '@/components/product-detail/ProductDetailTabs';
import { RelatedProducts } from '@/components/product-detail/RelatedProducts';
import { LoadingState } from '@/components/product-detail/LoadingState';
import { ProductNotFound } from '@/components/product-detail/ProductNotFound';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundProduct = productsData.find(p => p.id === id);
      setProduct(foundProduct || null);
      
      // Get related products if available
      if (foundProduct && foundProduct.relatedProducts) {
        const related = foundProduct.relatedProducts
          .map(relId => productsData.find(p => p.id === relId))
          .filter(Boolean);
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return <LoadingState />;
  }
  
  if (!product) {
    return <ProductNotFound />;
  }
  
  const handleSaveToFavorites = () => {
    toast({
      title: "Product saved",
      description: `${product.name} has been added to your favorites.`,
    });
  };
  
  const handleShare = () => {
    // In a real app, this would show sharing options
    toast({
      title: "Share link copied",
      description: "Product link copied to clipboard.",
    });
  };
  
  const handleDownloadBrochure = () => {
    // In a real app, this would trigger a download
    toast({
      title: "Download started",
      description: "The product brochure is being downloaded.",
    });
  };
  
  return (
    <Layout>
      <ProductHeader 
        product={product} 
        handleSaveToFavorites={handleSaveToFavorites}
        handleShare={handleShare}
      />
      
      <div className="container mx-auto px-4 py-8">
        <ProductInfo 
          product={product} 
          handleDownloadBrochure={handleDownloadBrochure} 
        />
        
        <ProductDetailTabs product={product} />
        
        <RelatedProducts relatedProducts={relatedProducts} />
      </div>
      
      {/* Chat Interface */}
      <ChatInterface />
    </Layout>
  );
};

export default ProductDetail;


import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, ChevronRight, Info } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ChatInterface from '@/components/ChatInterface';
import { productCategories, ProductCategory } from '@/data/productCategories';

const CategoryDetail = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [category, setCategory] = useState<ProductCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Find the category by slug
    if (categorySlug) {
      const foundCategory = productCategories.find(
        cat => cat.categoryName.toLowerCase().replace(/\s+/g, '-') === categorySlug
      );
      setCategory(foundCategory || null);
      setLoading(false);
    }
  }, [categorySlug]);

  // Filter products based on search query
  const filteredProducts = category?.products.filter(product =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.specificUseCases && product.specificUseCases.some(useCase => 
      useCase.toLowerCase().includes(searchQuery.toLowerCase())
    )) ||
    (product.targetAudience && product.targetAudience.some(audience => 
      audience.toLowerCase().includes(searchQuery.toLowerCase())
    )) ||
    (product.measures && product.measures.some(measure => 
      measure.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  ) || [];

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 bg-white-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-white-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white-800 mb-4">Category Not Found</h1>
            <p className="text-white-600 mb-6">The category you're looking for doesn't exist or may have been removed.</p>
            <Button asChild>
              <Link to="/categories">Back to Categories</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="bg-shl-gray py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-white">
            <Link to="/" className="hover:text-shl-blue">Home</Link>
            <ChevronRight size={16} className="mx-1" />
            <Link to="/categories" className="hover:text-shl-blue">Categories</Link>
            <ChevronRight size={16} className="mx-1" />
            <span className="text-white font-medium">{category.categoryName}</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">{category.categoryName}</h1>
          <p className="text-lg text-white">{category.categoryDescription}</p>
        </div>
        
        {/* Primary Use Cases */}
        {category.primaryUseCases && category.primaryUseCases.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-grey-800 mb-4">Primary Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.primaryUseCases.map((useCase, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-shl-gray rounded-full p-2 mr-3 text-shl-blue">
                    <ChevronRight size={16} />
                  </div>
                  <span className="text-black-700">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={`Search ${category.products.length} products in ${category.categoryName}...`}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-shl-light-blue focus:border-transparent text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Products list */}
        {filteredProducts.length > 0 ? (
          <div className="space-y-6">
            {filteredProducts.map((product, index) => (
              <Card key={index} className="card-hover overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{product.productName}</CardTitle>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                            <Info size={18} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            View detailed information about {product.productName} including specific use cases, target audiences, and what it measures.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  
                  <Accordion type="single" collapsible className="w-full border-0">
                    {product.specificUseCases && product.specificUseCases.length > 0 && (
                      <AccordionItem value="use-cases" className="border-0">
                        <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                          <span className="text-shl-blue">Specific Use Cases</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="text-sm text-white list-disc pl-5 space-y-2">
                            {product.specificUseCases.map((useCase, idx) => (
                              <li key={idx}>{useCase}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    
                    {product.targetAudience && product.targetAudience.length > 0 && (
                      <AccordionItem value="target-audience" className="border-0">
                        <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                          <span className="text-shl-blue">Target Audience</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-wrap gap-2">
                            {product.targetAudience.map((audience, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                                {audience}
                              </span>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    
                    {product.measures && product.measures.length > 0 && (
                      <AccordionItem value="measures" className="border-0">
                        <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                          <span className="text-shl-blue">What it Measures</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
                            {product.measures.map((measure, idx) => (
                              <li key={idx}>{measure}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>
                </CardContent>
                <CardFooter className="border-t border-gray-100 pt-4 flex justify-between">
                  <Button asChild variant="ghost" size="sm" className="text-shl-blue hover:text-shl-blue hover:bg-blue-50">
                    <Link to={`/products/${product.productName.toLowerCase().replace(/\s+/g, '-')}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/contact?product=${encodeURIComponent(product.productName)}`}>
                      Request Demo
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search</p>
            <Button 
              variant="outline" 
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
      
      {/* Chat Interface */}
      <ChatInterface />
    </Layout>
  );
};

export default CategoryDetail;

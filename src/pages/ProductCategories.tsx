
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChatInterface from '@/components/ChatInterface';
import { productCategories } from '@/data/productCategories';

const ProductCategories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter categories based on search query
  const filteredCategories = productCategories.filter(category => 
    category.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.categoryDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.products.some(product => 
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white-800">Assessment Categories</h1>
            <p className="text-white-600 mt-1">Browse SHL's comprehensive assessment solutions by category</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/products">
              <Button variant="outline" size="sm">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-blue-400" size={18} />
            <input
              type="text"
              placeholder="Search categories, products, or descriptions..."
              className="pl-10 pr-4 py-2 w-full border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-shl-light-blue focus:border-transparent text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Categories list */}
        {filteredCategories.length > 0 ? (
          <div className="space-y-8">
            {filteredCategories.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white-800">{category.categoryName}</h2>
                  <Link to={`/categories/${category.categoryName.toLowerCase().replace(/\s+/g, '-')}`} className="text-shl-blue hover:underline flex items-center">
                    <span>View all</span>
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
                
                <p className="text-white-600 mb-6">{category.categoryDescription}</p>
                
                {category.primaryUseCases && category.primaryUseCases.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white-700 mb-3">Primary Use Cases</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.primaryUseCases.map((useCase, idx) => (
                        <span key={idx} className="px-3 py-1 bg-shl-gray rounded-full text-sm text-green-600">
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {category.products.slice(0, 3).map((product, idx) => (
                    <Card key={idx} className="card-hover h-full">
                      <CardHeader>
                        <CardTitle className="text-lg">{product.productName}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-white-600 mb-4">{product.description}</p>
                        
                        {product.specificUseCases && product.specificUseCases.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs font-medium text-green-500 mb-2">Specific Use Cases:</p>
                            <ul className="text-xs text-grey-700 list-disc pl-5 space-y-1">
                              {product.specificUseCases.slice(0, 2).map((useCase, i) => (
                                <li key={i}>{useCase}</li>
                              ))}
                              {product.specificUseCases.length > 2 && (
                                <li className="text-shl-blue">+ {product.specificUseCases.length - 2} more</li>
                              )}
                            </ul>
                          </div>
                        )}
                        
                        {product.targetAudience && product.targetAudience.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-white-700 mb-1">Target Audience:</p>
                            <div className="flex flex-wrap gap-1">
                              {product.targetAudience.map((audience, i) => (
                                <span key={i} className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                                  {audience}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="border-t border-gray-100 pt-4">
                        <Button asChild variant="ghost" size="sm" className="text-shl-blue hover:text-shl-blue hover:bg-blue-50">
                          <Link to={`/products/${product.productName.toLowerCase().replace(/\s+/g, '-')}`}>
                            View Details
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                {category.products.length > 3 && (
                  <div className="flex justify-center mb-8">
                    <Button asChild variant="outline" className="text-shl-blue border-shl-blue hover:bg-blue-50">
                      <Link to={`/categories/${category.categoryName.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center">
                        View all {category.products.length} products in {category.categoryName}
                        <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                )}
                
                {index < filteredCategories.length - 1 && (
                  <hr className="border-gray-200 my-8" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-white-800 mb-2">No categories found</h3>
            <p className="text-white-600 mb-4">Try adjusting your search</p>
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

export default ProductCategories;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Info, CheckCircle, ArrowRight, Star } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
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
import ChatInterface from '@/components/ChatInterface';

// Dummy product data
const products = [
  {
    id: 'p1',
    name: 'Occupational Personality Questionnaire (OPQ)',
    description: 'Provides an in-depth view of preferences and behaviors at work, giving a clear prediction of performance in specific roles.',
    category: 'Personality',
    suitableFor: ['Selection', 'Development', 'Team Building'],
    completionTime: '25-35 minutes',
    languages: 30,
    featured: true,
  },
  {
    id: 'p2',
    name: 'Verify Numerical Reasoning',
    description: 'Tests the ability to analyze numerical data, interpret information from tables and apply numerical concepts.',
    category: 'Cognitive',
    suitableFor: ['Selection', 'Graduate Recruitment'],
    completionTime: '18 minutes',
    languages: 40,
    featured: true,
  },
  {
    id: 'p3',
    name: 'Verify Verbal Reasoning',
    description: 'Measures the ability to understand written information and evaluate arguments and statements.',
    category: 'Cognitive',
    suitableFor: ['Selection', 'Graduate Recruitment'],
    completionTime: '17 minutes',
    languages: 40,
    featured: false,
  },
  {
    id: 'p4',
    name: 'Situational Judgement Test',
    description: 'Presents realistic workplace scenarios to assess decision-making and judgment in role-specific situations.',
    category: 'Behavioral',
    suitableFor: ['Selection', 'Development', 'Leadership'],
    completionTime: '25 minutes',
    languages: 20,
    featured: true,
  },
  {
    id: 'p5',
    name: 'Motivation Questionnaire',
    description: 'Measures what motivates and drives an individual in their work and what is likely to retain them in a role.',
    category: 'Personality',
    suitableFor: ['Development', 'Retention', 'Engagement'],
    completionTime: '20 minutes',
    languages: 25,
    featured: false,
  },
  {
    id: 'p6',
    name: 'Remote Worker Assessment',
    description: 'Evaluates aptitude and preferences for working in a remote environment with minimal supervision.',
    category: 'Behavioral',
    suitableFor: ['Selection', 'Development', 'Team Building'],
    completionTime: '15 minutes',
    languages: 15,
    featured: true,
  },
  {
    id: 'p7',
    name: 'Leadership Impact',
    description: 'Assesses leadership style and potential impact on team dynamics, organizational culture, and business outcomes.',
    category: 'Leadership',
    suitableFor: ['Selection', 'Development', 'Succession Planning'],
    completionTime: '25 minutes',
    languages: 20,
    featured: false,
  },
  {
    id: 'p8',
    name: 'Emotional Intelligence Assessment',
    description: 'Measures emotional self-awareness, empathy, relationship management, and social effectiveness.',
    category: 'Personality',
    suitableFor: ['Development', 'Leadership', 'Team Building'],
    completionTime: '20 minutes',
    languages: 18,
    featured: false,
  },
];

// Filter categories
const categories = ['All', 'Personality', 'Cognitive', 'Behavioral', 'Leadership', 'Skills'];
const useCases = ['All', 'Selection', 'Development', 'Team Building', 'Graduate Recruitment', 'Leadership', 'Succession Planning', 'Retention', 'Engagement'];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedUseCase, setSelectedUseCase] = useState('All');
  
  // Filter products based on search query and selected filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesUseCase = selectedUseCase === 'All' || product.suitableFor.includes(selectedUseCase);
    
    return matchesSearch && matchesCategory && matchesUseCase;
  });
  
  return (
    <Layout>
      <div className="products-light-theme bg-background text-foreground container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Product Catalog</h1>
            <p className="text-foreground/70 mt-1">Explore SHL's assessment solutions</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link to="/categories">
              <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                View Categories
              </Button>
            </Link>
            <Link to="/products/compare">
              <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                Compare Products
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-4 mb-8">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search products by name or description..."
                className="pl-10 pr-4 py-2 w-full border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-background text-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Filters:</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="text-sm bg-background border-border">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedUseCase} onValueChange={setSelectedUseCase}>
                  <SelectTrigger className="text-sm bg-background border-border">
                    <SelectValue placeholder="Use Case" />
                  </SelectTrigger>
                  <SelectContent>
                    {useCases.map(useCase => (
                      <SelectItem key={useCase} value={useCase}>{useCase}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedUseCase('All');
                }}
                className="text-primary hover:text-primary hover:bg-primary/10"
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>
        
        {/* Product display tabs */}
        <Tabs defaultValue="grid" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </span>
            
            <TabsList className="bg-muted">
              <TabsTrigger value="grid" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
                Grid
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <line x1="8" y1="6" x2="21" y2="6"/>
                  <line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/>
                  <line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
                List
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="grid" className="mt-0">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="card-hover h-full bg-card border-border">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="px-2 py-1 bg-muted rounded text-xs font-medium text-primary">
                              {product.category}
                            </div>
                            {product.featured && (
                              <div className="ml-2 px-2 py-1 bg-accent/20 rounded text-xs font-medium text-accent-foreground flex items-center">
                                <Star size={12} className="mr-1" />
                                Featured
                              </div>
                            )}
                          </div>
                          <CardTitle className="text-lg text-foreground">{product.name}</CardTitle>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="text-muted-foreground hover:text-foreground cursor-pointer">
                                <Info size={16} />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs max-w-[200px]">
                                Completion time: {product.completionTime}<br />
                                Available in {product.languages} languages
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-sm text-foreground/70 mb-4">{product.description}</p>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Suitable for:</p>
                        <div className="flex flex-wrap gap-2">
                          {product.suitableFor.map(useCase => (
                            <span key={useCase} className="px-2 py-1 bg-muted rounded-full text-xs text-foreground/70">
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-4 border-t border-border/30">
                      <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                        <Link to={`/products/${product.id}`}>
                          View Details
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green hover:text-foreground">
                        <CheckCircle size={16} className="mr-1" />
                        Compare
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <div className="bg-card rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Search size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
                <p className="text-foreground/70 mb-4">Try adjusting your search or filters</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedUseCase('All');
                  }}
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            {filteredProducts.length > 0 ? (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <div key={product.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow bg-card">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="px-2 py-1 bg-muted rounded text-xs font-medium text-primary">
                            {product.category}
                          </div>
                          {product.featured && (
                            <div className="ml-2 px-2 py-1 bg-accent/20 rounded text-xs font-medium text-accent-foreground flex items-center">
                              <Star size={12} className="mr-1" />
                              Featured
                            </div>
                          )}
                          <span className="ml-auto text-xs text-muted-foreground hidden md:inline-flex items-center">
                            <span className="mr-4">{product.completionTime}</span>
                            <span>{product.languages} languages</span>
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">{product.name}</h3>
                        <p className="text-sm text-foreground/70 mb-2">{product.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {product.suitableFor.map(useCase => (
                            <span key={useCase} className="px-2 py-1 bg-muted rounded-full text-xs text-foreground/70">
                              {useCase}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-2 md:hidden">
                          <span className="mr-4">{product.completionTime}</span>
                          <span>{product.languages} languages</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-4 flex justify-end">
                        <div className="flex space-x-2">
                          <Button asChild size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                            <Link to={`/products/${product.id}`} className="flex items-center">
                              Details
                              <ArrowRight size={14} className="ml-1" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-foreground">
                            <CheckCircle size={16} className="mr-1" />
                            Compare
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <div className="bg-card rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Search size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
                <p className="text-foreground/70 mb-4">Try adjusting your search or filters</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedUseCase('All');
                  }}
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 bg-card rounded-lg shadow-sm border border-border p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Browse by Assessment Category</h2>
            <p className="text-foreground/70">Explore our assessment solutions organized by category</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/categories" className="block p-4 border border-border rounded-lg hover:border-primary hover:shadow-md transition-all bg-card">
              <h3 className="font-medium text-primary mb-1">View All Categories</h3>
              <p className="text-sm text-foreground/70">Browse our complete range of assessment categories</p>
            </Link>
            
            <Link to="/categories/cognitive-ability-tests" className="block p-4 border border-border rounded-lg hover:border-primary hover:shadow-md transition-all bg-card">
              <h3 className="font-medium text-primary mb-1">Cognitive Ability Tests</h3>
              <p className="text-sm text-foreground/70">Assessments of mental aptitude and reasoning capabilities</p>
            </Link>
            
            <Link to="/categories/personality-and-behavioral-assessments" className="block p-4 border border-border rounded-lg hover:border-primary hover:shadow-md transition-all bg-card">
              <h3 className="font-medium text-primary mb-1">Personality & Behavioral</h3>
              <p className="text-sm text-foreground/70">Questionnaires to understand typical behaviors and preferences</p>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Chat Interface */}
      <ChatInterface />
    </Layout>
  );
};

export default Products;

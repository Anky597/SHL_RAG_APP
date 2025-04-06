import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Star, Filter, Download, ArrowUpDown, ChevronRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChatInterface from '@/components/ChatInterface';

const recentSearches = [
  {
    id: 's1',
    query: 'Personality assessments for sales teams',
    date: '2 hours ago',
    products: [
      { id: 'p1', name: 'Occupational Personality Questionnaire (OPQ)' },
      { id: 'p2', name: 'Motivation Questionnaire' },
    ],
  },
  {
    id: 's2',
    query: 'Cognitive tests for software developers',
    date: '1 day ago',
    products: [
      { id: 'p3', name: 'Verify Cognitive Ability Tests' },
      { id: 'p4', name: 'Coding Skills Assessment' },
    ],
  },
  {
    id: 's3',
    query: 'Leadership potential assessment',
    date: '3 days ago',
    products: [
      { id: 'p5', name: 'Leadership Impact Assessment' },
      { id: 'p6', name: 'Situational Judgement Tests' },
    ],
  },
];

const savedRecommendations = [
  {
    id: 'r1',
    title: 'Graduate Recruitment Battery',
    date: 'April 2, 2025',
    description: 'A combination of cognitive ability, personality, and situational judgement tests for entry-level positions.',
    products: [
      { id: 'p1', name: 'Verify Numerical Reasoning' },
      { id: 'p2', name: 'Verify Verbal Reasoning' },
      { id: 'p3', name: 'OPQ32 Personality Assessment' },
      { id: 'p4', name: 'Graduate Situational Judgement Test' },
    ],
  },
  {
    id: 'r2',
    title: 'IT Team Development',
    date: 'March 28, 2025',
    description: 'Tools for improving collaboration and communication within technical teams.',
    products: [
      { id: 'p5', name: 'Team Alignment Assessment' },
      { id: 'p6', name: 'Communication Styles Inventory' },
      { id: 'p7', name: 'Technical Skills Gap Analysis' },
    ],
  },
];

const trendingProducts = [
  {
    id: 'tp1',
    name: 'Remote Worker Assessment',
    description: 'Evaluate candidates\' suitability for remote work environments',
    category: 'Personality',
    changeIndicator: '+12%',
    positive: true,
  },
  {
    id: 'tp2',
    name: 'Digital Readiness Assessment',
    description: 'Measure adaptability to digital transformation',
    category: 'Skills',
    changeIndicator: '+8%',
    positive: true,
  },
  {
    id: 'tp3',
    name: 'Agile Mindset Inventory',
    description: 'Assess agile thinking and behavior patterns',
    category: 'Behavioral',
    changeIndicator: '+5%',
    positive: true,
  },
  {
    id: 'tp4',
    name: 'Emotional Intelligence Profile',
    description: 'Comprehensive evaluation of emotional awareness',
    category: 'Personality',
    changeIndicator: '+3%',
    positive: true,
  },
];

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('recent');
  const navigate = useNavigate();

  const handleNewChat = () => {
    navigate('/');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white-800">Your Dashboard</h1>
            <p className="text-white-600 mt-1">Track your product searches and recommendations</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link to="/products">
                <Filter size={16} />
                <span>Browse Products</span>
              </Link>
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="gap-2 btn-primary"
              onClick={handleNewChat}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>New Chat</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="recent" className="w-full" onValueChange={setSelectedTab}>
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="recent" className="data-[state=active]:bg-shl-blue data-[state=active]:text-white">
                    <Clock size={16} className="mr-2" />
                    Recent Searches
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="data-[state=active]:bg-shl-blue data-[state=active]:text-white">
                    <Star size={16} className="mr-2" />
                    Saved Recommendations
                  </TabsTrigger>
                </TabsList>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ArrowUpDown size={16} />
                      <span>Sort</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Most Recent</DropdownMenuItem>
                    <DropdownMenuItem>Oldest First</DropdownMenuItem>
                    <DropdownMenuItem>Alphabetical</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <TabsContent value="recent" className="mt-0">
                {recentSearches.length > 0 ? (
                  <div className="space-y-4">
                    {recentSearches.map((search) => (
                      <Card key={search.id} className="card-hover">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">{search.query}</CardTitle>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Clock size={14} className="mr-1" />
                              {search.date}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500 font-medium">Recommended products:</p>
                            <ul className="space-y-1">
                              {search.products.map((product) => (
                                <li key={product.id} className="text-sm">
                                  <Link to={`/products/${product.id}`} className="text-shl-blue hover:underline">
                                    {product.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2 flex justify-between">
                          <Button asChild variant="ghost" size="sm" className="text-shl-blue hover:text-shl-blue hover:bg-blue-50">
                            <Link to={`/search/${search.id}`}>
                              View Details
                            </Link>
                          </Button>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Star size={16} className="mr-1" />
                              Save
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download size={16} className="mr-1" />
                              Export
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Clock size={24} className="text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">No recent searches</h3>
                    <p className="text-gray-600 mb-4">Start exploring SHL products to see your search history here.</p>
                    <Button asChild variant="default" className="btn-primary">
                      <Link to="/products">
                        Browse Products
                      </Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="saved" className="mt-0">
                {savedRecommendations.length > 0 ? (
                  <div className="space-y-4">
                    {savedRecommendations.map((recommendation) => (
                      <Card key={recommendation.id} className="card-hover">
                        <CardHeader>
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                            <span className="text-sm text-gray-500">{recommendation.date}</span>
                          </div>
                          <CardDescription>{recommendation.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500 font-medium">Included products:</p>
                            <ul className="space-y-1">
                              {recommendation.products.map((product) => (
                                <li key={product.id} className="text-sm">
                                  <Link to={`/products/${product.id}`} className="text-shl-blue hover:underline">
                                    {product.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button asChild variant="ghost" size="sm" className="text-shl-blue hover:text-shl-blue hover:bg-blue-50">
                            <Link to={`/recommendations/${recommendation.id}`}>
                              View Details
                            </Link>
                          </Button>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Download size={16} className="mr-1" />
                              Export
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Star size={24} className="text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">No saved recommendations</h3>
                    <p className="text-gray-600 mb-4">Save your product recommendations here for easy access later.</p>
                    <Button asChild variant="default" className="btn-primary">
                      <Link to="/products">
                        Find Products
                      </Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trending Products</CardTitle>
                <CardDescription>Popular assessment solutions this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingProducts.map((product) => (
                    <div key={product.id} className="flex items-start space-x-3">
                      <div className="bg-shl-gray rounded p-2">
                        <span className="text-xs font-medium text-shl-blue">{product.category}</span>
                      </div>
                      <div className="flex-1">
                        <Link to={`/products/${product.id}`} className="text-sm font-medium hover:text-shl-blue">
                          {product.name}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">{product.description}</p>
                      </div>
                      <div className={`text-xs font-semibold ${product.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {product.changeIndicator}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" size="sm" className="w-full justify-center">
                  <Link to="/products/trending" className="flex items-center">
                    <span>View All Trending Products</span>
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button asChild variant="outline" className="justify-start">
                  <Link to="/products/compare">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <line x1="9" y1="3" x2="9" y2="21"/>
                    </svg>
                    Compare Products
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link to="/roi-calculator">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M3 3v18h18"/>
                      <path d="m19 9-5 5-4-4-3 3"/>
                    </svg>
                    ROI Calculator
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link to="/integrations">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                      <line x1="6" y1="6" x2="6.01" y2="6"/>
                      <line x1="6" y1="18" x2="6.01" y2="18"/>
                    </svg>
                    HRIS Integrations
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link to="/export-history">
                    <Download size={16} className="mr-2" />
                    Export History
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <ChatInterface />
    </Layout>
  );
};

export default Dashboard;

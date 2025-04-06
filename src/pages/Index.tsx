import { useState } from 'react';
import { Search, FileText, Info, BookOpen, Loader, Sparkles, Brain, Users, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchResult(null);
    setError(null);
    
    try {
      const response = await fetch('https://backend-rag-tq97.onrender.com/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_question: searchQuery }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setSearchResult(data.result);
        // Scroll to results when they arrive
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        throw new Error('Failed to get a valid response');
      }
    } catch (err) {
      setError('Failed to connect to the assessment recommendation system. Please try again later.');
      toast({
        title: 'Error',
        description: 'There was a problem retrieving assessment recommendations',
        variant: 'destructive',
      });
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const exampleQueries = [
    "What are the best assessments for leadership roles?",
    "What's the best cognitive test for technical roles?",
    "Recommend personality assessments for sales teams",
    "Which assessments measure teamwork abilities?"
  ];
  
  return (
    <Layout>
      {/* Hero Section - Enhanced with animations */}
      <section className="bg-gradient-to-r from-shl-black via-shl-dark-gray to-shl-gray py-24 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-shl-blue/30 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-shl-purple/20 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-gradient-to-r from-shl-blue to-shl-purple p-[3px] rounded-full shadow-lg shadow-shl-blue/20">
              <div className="bg-shl-black rounded-full p-4">
                <Sparkles className="text-shl-gold h-9 w-9" />
              </div>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-shl-blue via-shl-purple to-shl-teal">SHL</span> Assessment Finder
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Discover the perfect assessment solution tailored to your organization's needs
          </motion.p>
          
          <motion.form 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSearch} 
            className="max-w-3xl mx-auto mb-8"
          >
            <div className="relative search-glow group">
              <input
                type="text"
                placeholder="Describe your needs or ask a question about SHL assessments..."
                className="w-full py-5 px-7 rounded-full border border-shl-blue/30 bg-shl-black/80 shadow-lg focus:ring-2 focus:ring-shl-blue focus:outline-none text-white transition-all text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-shl-blue to-shl-purple text-white p-4 rounded-full hover:opacity-90 transition-all group-hover:shadow-md group-hover:shadow-shl-blue/30"
                disabled={isSearching || !searchQuery.trim()}
              >
                {isSearching ? 
                  <Loader className="animate-spin" size={22} /> : 
                  <Search size={22} />
                }
              </button>
            </div>
          </motion.form>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            <p className="text-silver mb-3">Try asking about:</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {exampleQueries.map((query, index) => (
                <button 
                  key={index}
                  onClick={() => setSearchQuery(query)}
                  className="px-4 py-2 bg-shl-gray/50 rounded-full hover:bg-shl-blue/20 transition-colors text-white border border-shl-blue/20 hover:border-shl-blue/50"
                >
                  "{query.length > 30 ? query.substring(0, 30) + '...' : query}"
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Results Section - Enhanced */}
      <section id="results-section" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="results-container max-w-4xl mx-auto">
            {isSearching ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="results-loading"
              >
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 rounded-full border-t-2 border-shl-blue animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-t-2 border-shl-purple animate-spin" style={{ animationDuration: '1.5s' }}></div>
                    <div className="absolute inset-4 rounded-full border-t-2 border-shl-teal animate-spin" style={{ animationDuration: '2s' }}></div>
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                      <Sparkles className="text-shl-gold h-6 w-6" />
                    </div>
                  </div>
                  <p className="text-xl text-white font-medium">Finding your perfect match...</p>
                  <p className="text-silver mt-2">Analyzing SHL's assessment database</p>
                </div>
              </motion.div>
            ) : error ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="results-error"
              >
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-red-500/10 p-6 rounded-full mb-6">
                    <Info size={32} className="text-red-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">Connection Error</h3>
                  <p className="text-silver mb-6 max-w-md">{error}</p>
                  <Button 
                    variant="outline" 
                    className="mt-2 border-shl-blue/50 text-white hover:bg-shl-blue/10 px-6"
                    onClick={() => handleSearch({ preventDefault: () => {} } as React.FormEvent)}
                  >
                    Try Again
                  </Button>
                </div>
              </motion.div>
            ) : searchResult ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="results-content"
              >
                <div className="bg-card border border-shl-blue/20 rounded-xl p-6 shadow-lg shadow-shl-blue/5">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-shl-blue/10">
                    <div className="bg-gradient-to-r from-shl-blue to-shl-purple p-[2px] rounded-full">
                      <div className="bg-shl-black rounded-full p-2">
                        <Star className="text-shl-gold h-5 w-5" />
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold text-gradient inline-block">Recommended Assessment Solution</h2>
                  </div>
                  <div className="prose prose-invert max-w-none text-white">
                    <ReactMarkdown>
                      {searchResult}
                    </ReactMarkdown>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <Button className="bg-gradient-to-r from-shl-blue to-shl-purple hover:opacity-90 text-white border-0 flex items-center gap-2">
                      Request More Details
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="results-empty text-center"
              >
                <div className="bg-gradient-to-r from-shl-blue to-shl-purple p-[2px] rounded-full mx-auto mb-6 w-20 h-20">
                  <div className="bg-shl-black rounded-full p-4 w-full h-full flex items-center justify-center">
                    <Search size={36} className="text-shl-gold" />
                  </div>
                </div>
                <h3 className="text-xl mb-2 text-white font-medium">Ready to find your ideal assessment</h3>
                <p className="text-silver max-w-md mx-auto">Use the search bar above to describe your needs or explore our assessment categories below</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      
      {/* Key Assessment Types - Redesigned and Enhanced */}
      <section className="py-20 bg-gradient-to-b from-background to-shl-black/90">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-shl-blue via-shl-purple to-shl-teal">
                Assessment Categories
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-silver max-w-2xl mx-auto"
            >
              Explore our comprehensive range of assessment solutions designed to identify and develop talent
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Cognitive Assessments",
                description: "Measure critical thinking, problem-solving, and analytical reasoning abilities to identify top talent.",
                icon: <Brain className="text-shl-gold" size={28} />,
                gradient: "from-shl-blue to-shl-purple",
                border: "border-shl-blue/20"
              },
              {
                title: "Personality Assessments",
                description: "Understand workplace behaviors, motivations, and cultural fit to build effective teams.",
                icon: <Users className="text-shl-gold" size={28} />,
                gradient: "from-shl-purple to-shl-teal",
                border: "border-shl-purple/20"
              },
              {
                title: "Situational Judgement",
                description: "Evaluate decision-making skills in realistic workplace scenarios to predict on-the-job performance.",
                icon: <Info className="text-shl-gold" size={28} />,
                gradient: "from-shl-teal to-shl-blue",
                border: "border-shl-teal/20"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <Card className="card-hover bg-card/50 backdrop-blur border group hover:shadow-lg hover:shadow-shl-blue/10 transition-all duration-300 h-full">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className={`bg-gradient-to-r ${category.gradient} p-[2px] rounded-full w-16 h-16 mb-6 group-hover:shadow-md transition-all duration-300`}>
                      <div className="bg-shl-black rounded-full w-full h-full flex items-center justify-center">
                        {category.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{category.title}</h3>
                    <p className="text-silver mb-6 flex-grow">{category.description}</p>
                    <Button variant="ghost" className="text-shl-blue hover:text-shl-purple hover:bg-shl-blue/5 mt-auto w-fit justify-start pl-0 group">
                      <span>Learn more</span>
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button className="bg-gradient-to-r from-shl-blue to-shl-purple hover:opacity-90 text-white border-0 px-8 py-6 text-lg shadow-lg shadow-shl-blue/20 hover:shadow-shl-blue/30 transition-all">
              View All Assessment Types
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* New Section: Testimonials */}
      <section className="py-20 bg-shl-black">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-shl-blue via-shl-teal to-shl-purple">
                Trusted by Leading Organizations
              </span>
            </h2>
            <p className="text-silver max-w-2xl mx-auto">
              See how SHL assessments help organizations worldwide make better talent decisions
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                quote: "SHL's cognitive assessments helped us identify high-potential candidates, reducing our hiring time by 35%.",
                company: "Global Tech Leader",
                position: "Head of Talent Acquisition"
              },
              {
                quote: "The personality assessments provided deep insights that transformed our leadership development program.",
                company: "Fortune 500 Retail Company",
                position: "Chief HR Officer"
              },
              {
                quote: "Using SHL's situational judgment tests improved our sales team performance by helping us select candidates with the right decision-making skills.",
                company: "International Financial Services",
                position: "VP of Sales"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <Card className="bg-card/30 backdrop-blur border border-shl-blue/10 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4 text-shl-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="inline-block mr-1 fill-current" />
                      ))}
                    </div>
                    <p className="text-silver italic mb-6 flex-grow">{testimonial.quote}</p>
                    <div>
                      <p className="font-medium text-white">{testimonial.company}</p>
                      <p className="text-silver text-sm">{testimonial.position}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-shl-blue/20 via-shl-purple/20 to-shl-teal/20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-shl-blue/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center shadow-lg shadow-shl-blue/10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to transform your talent decisions?</h2>
            <p className="text-silver mb-8 max-w-xl mx-auto">
              Discover how SHL's assessment solutions can help you identify, develop, and retain top talent
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-shl-blue to-shl-purple hover:opacity-90 text-white border-0 px-6 py-6">
                Request a Demo
              </Button>
              <Button variant="outline" className="border-shl-blue/50 text-white hover:bg-shl-blue/10 px-6 py-6">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
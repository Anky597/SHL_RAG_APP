import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming Shadcn UI
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; // Assuming Shadcn UI
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"; // Assuming Shadcn UI Button
import { AlertCircle, CheckCircle, Users, TrendingUp, Shuffle, Library, Box } from 'lucide-react'; // Added more relevant icons

interface ProductDetailTabsProps {
  // Use more specific types if possible
  product: {
    detailedDescription?: string;
    shortDescription?: string; // Fallback if detailed is missing
    useCases?: Array<{ // Example structure for use cases if available in product data
      id: string;
      title: string;
      icon?: React.ReactNode; // Allow custom icons
      description: string;
      benefits: string[];
    }>;
    faqs?: Array<{ question: string; answer: string }>;
    caseStudies?: Array<{
      id: string;
      company: string;
      title: string;
      snippet: string;
    }>;
  };
}

// Placeholder icons if not provided in data
const defaultUseCaseIcons: { [key: string]: React.ReactNode } = {
  "Recruitment & Selection": <Users size={20} />,
  "Team Development": <Users size={20} />, // Or maybe a different icon
  "Leadership Development": <TrendingUp size={20} />,
  "Succession Planning": <Shuffle size={20} />,
};

export const ProductDetailTabs = ({ product }: ProductDetailTabsProps) => {
  // --- Reusable Style Classes (Dark Theme) ---
  const primaryTextColor = "text-slate-100";        // White-ish
  const secondaryTextColor = "text-slate-300";      // Light silver/gray
  const tertiaryTextColor = "text-slate-400";       // Medium gray
  const accentColor = "text-blue-400";
  const accentHoverColor = "hover:text-blue-300";
  const contentBgColor = "bg-slate-800";            // Main dark background for content areas
  const contentBorderColor = "border-slate-700";    // Border for content areas
  const cardClasses = `${contentBgColor} border ${contentBorderColor} rounded-lg shadow-md overflow-hidden`; // Base style for cards/boxes
  const iconWrapperClasses = "bg-slate-700 rounded-full p-2 mr-3 flex-shrink-0"; // Consistent icon background
  const outlineButtonClasses = `border ${contentBorderColor} ${secondaryTextColor} hover:bg-slate-700 hover:${primaryTextColor} focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors duration-200`;
  // --- End Reusable Style Classes ---

  // Determine which use cases to show (replace with actual data if available)
  const displayedUseCases = product.useCases || [
    { id: 'recruitment', title: 'Recruitment & Selection', icon: defaultUseCaseIcons["Recruitment & Selection"], description: 'Identify candidates whose personality aligns with job requirements, leading to better hiring decisions and reduced turnover.', benefits: ['Predict job performance', 'Create structured interviews', 'Improve diversity focus'] },
    { id: 'team', title: 'Team Development', icon: defaultUseCaseIcons["Team Development"], description: 'Build stronger teams by understanding work styles, communication preferences, and potential blind spots.', benefits: ['Identify complementary styles', 'Improve communication', 'Enhance problem-solving'] },
    { id: 'leadership', title: 'Leadership Development', icon: defaultUseCaseIcons["Leadership Development"], description: 'Develop effective leaders by providing insights into their leadership style, strengths, and development areas.', benefits: ['Identify leadership potential', 'Create targeted development', 'Enhance self-awareness'] },
    { id: 'succession', title: 'Succession Planning', icon: defaultUseCaseIcons["Succession Planning"], description: 'Identify and develop future leaders to ensure organizational continuity and talent readiness.', benefits: ['Match profiles to roles', 'Create development pathways', 'Reduce leadership gaps'] },
  ];

  return (
    // Apply dark background and border to the main tabs container
    <div className={`${cardClasses} mb-10 md:mb-12 p-0`}> {/* Remove padding from outer wrapper */}
      <Tabs defaultValue="overview" className="w-full">
        {/* Styled Tabs List */}
        <TabsList className={`border-b ${contentBorderColor} w-full p-0 h-auto rounded-none bg-transparent`}>
          {/* Container for horizontal scrolling */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto no-scrollbar">
            {/* Dark theme Tabs Triggers */}
            <TabsTrigger
              value="overview"
              className={`py-3 px-5 text-sm font-medium border-b-2 border-transparent whitespace-nowrap rounded-none transition-colors duration-200 data-[state=active]:border-blue-500 data-[state=active]:${primaryTextColor} ${tertiaryTextColor} hover:${primaryTextColor}`}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="use-cases"
              className={`py-3 px-5 text-sm font-medium border-b-2 border-transparent whitespace-nowrap rounded-none transition-colors duration-200 data-[state=active]:border-blue-500 data-[state=active]:${primaryTextColor} ${tertiaryTextColor} hover:${primaryTextColor}`}
            >
              Use Cases
            </TabsTrigger>
            {/* Conditionally render FAQ tab */}
            {product.faqs && product.faqs.length > 0 && (
                <TabsTrigger
                value="faq"
                className={`py-3 px-5 text-sm font-medium border-b-2 border-transparent whitespace-nowrap rounded-none transition-colors duration-200 data-[state=active]:border-blue-500 data-[state=active]:${primaryTextColor} ${tertiaryTextColor} hover:${primaryTextColor}`}
                >
                FAQ ({product.faqs.length})
                </TabsTrigger>
            )}
            {/* Conditionally render Case Studies tab */}
             {product.caseStudies && product.caseStudies.length > 0 && (
                <TabsTrigger
                value="case-studies"
                className={`py-3 px-5 text-sm font-medium border-b-2 border-transparent whitespace-nowrap rounded-none transition-colors duration-200 data-[state=active]:border-blue-500 data-[state=active]:${primaryTextColor} ${tertiaryTextColor} hover:${primaryTextColor}`}
                >
                Case Studies
                </TabsTrigger>
             )}
          </div>
        </TabsList>

        {/* Content Area with consistent padding */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {/* Overview Tab Content */}
          <TabsContent value="overview" className="mt-0">
             {/* Apply dark mode prose styles */}
             <div className={`prose prose-sm sm:prose-base max-w-none prose-invert
                             prose-p:${secondaryTextColor} prose-headings:${primaryTextColor}
                             prose-strong:${primaryTextColor} prose-a:${accentColor} hover:prose-a:${accentHoverColor}
                             prose-ul:${secondaryTextColor} prose-ol:${secondaryTextColor} prose-li:marker:text-slate-600`}>
                <div className="whitespace-pre-line">
                   {product.detailedDescription || product.shortDescription || <span className={tertiaryTextColor}>No detailed overview available.</span>}
                </div>
             </div>
          </TabsContent>

          {/* Use Cases Tab Content */}
          <TabsContent value="use-cases" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedUseCases.map((useCase) => (
                // Apply dark card style to each use case box
                <div key={useCase.id} className={`${cardClasses} p-5 bg-slate-800/80`}> {/* Use card background */}
                  <div className="flex items-center mb-4">
                    <div className={iconWrapperClasses}>
                      {/* Use provided icon or default */}
                      <span className={accentColor}>{useCase.icon || <Box size={20} />}</span>
                    </div>
                     {/* White heading */}
                    <h3 className={`text-lg font-semibold ${primaryTextColor}`}>{useCase.title}</h3>
                  </div>
                   {/* Silver description */}
                  <p className={`${secondaryTextColor} text-sm mb-4`}>{useCase.description}</p>
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        {/* Use accent color or green for checkmarks */}
                        <CheckCircle size={16} className={`${accentColor} mr-2 mt-0.5 flex-shrink-0`} />
                        {/* Silver list item text */}
                        <span className={`text-sm ${secondaryTextColor}`}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* FAQ Tab Content */}
          <TabsContent value="faq" className="mt-0">
            {product.faqs && product.faqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                {product.faqs.map((faq: any, index: number) => (
                  // Dark theme Accordion Items
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className={`border-b ${contentBorderColor} last:border-b-0`}
                  >
                    <AccordionTrigger className={`py-4 text-left hover:no-underline text-base ${primaryTextColor} hover:${accentColor} transition-colors duration-200`}>
                       {/* FAQ icon and white question text */}
                      <div className="flex items-start text-left w-full">
                        <AlertCircle size={18} className={`${accentColor} mr-3 mt-0.5 flex-shrink-0`} />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                     {/* Silver content text */}
                    <AccordionContent className={`pt-1 pb-4 pl-9 text-sm ${secondaryTextColor}`}>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
                <p className={tertiaryTextColor}>No frequently asked questions available for this product yet.</p>
            )}
          </TabsContent>

          {/* Case Studies Tab Content */}
          <TabsContent value="case-studies" className="mt-0">
            {product.caseStudies && product.caseStudies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.caseStudies.map((study: any) => (
                  // Dark theme case study card
                  <div key={study.id} className={`${cardClasses} flex flex-col transition-all duration-300 hover:border-slate-600 hover:shadow-xl`}>
                    {/* Header with gradient/color */}
                    <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center p-4">
                      <span className="text-white font-bold text-xl text-center">{study.company}</span>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                       {/* White heading */}
                      <h3 className={`text-lg font-semibold mb-2 ${primaryTextColor}`}>{study.title}</h3>
                       {/* Silver snippet */}
                      <p className={`${secondaryTextColor} text-sm mb-4 flex-grow line-clamp-3`}>{study.snippet}</p>
                       {/* Button at the bottom */}
                      <div className="mt-auto pt-4">
                         <Button asChild variant="outline" size="sm" className={`${outlineButtonClasses} ${accentColor} border-${accentColor}/50 hover:bg-blue-900/20 w-full sm:w-auto`}>
                           {/* Link remains unchanged */}
                           <Link to={`/case-studies/${study.id}`}>
                             Read Full Case Study
                           </Link>
                         </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
               // Dark theme empty state
              <div className={`text-center py-12 px-6 rounded-lg border border-dashed ${contentBorderColor} ${contentBgColor} ${secondaryTextColor}`}>
                  <Library size={32} className="mx-auto mb-4 text-slate-500"/>
                  <h3 className={`text-xl font-semibold mb-2 ${primaryTextColor}`}>No Case Studies Available</h3>
                  <p>Check back later for real-world examples.</p>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
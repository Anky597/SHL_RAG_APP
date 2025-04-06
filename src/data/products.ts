
// Dummy product data (in a real app, would be fetched from API)
export const productsData = [
  {
    id: 'p1',
    name: 'Occupational Personality Questionnaire (OPQ)',
    fullName: 'Occupational Personality Questionnaire 32r (OPQ32r)',
    shortDescription: 'Provides an in-depth view of preferences and behaviors at work, giving a clear prediction of performance in specific roles.',
    detailedDescription: `The Occupational Personality Questionnaire (OPQ) is SHL's industry-leading personality assessment designed for talent management and recruitment. It provides an in-depth view of a person's preferred style of behavior at work, predicting how they're likely to perform in a specific role.

The OPQ helps organizations:
- Identify best-fit candidates during selection
- Support employee development initiatives
- Build effective teams by understanding individual styles
- Develop leadership capabilities through insights on management style
- Predict job performance by matching personality to role requirements

The assessment measures 32 different personality characteristics grouped into three domains: Relationships with People, Thinking Style, and Feelings and Emotions.`,
    category: 'Personality',
    suitableFor: ['Selection', 'Development', 'Team Building', 'Leadership'],
    completionTime: '25-35 minutes',
    languages: 30,
    featuredBenefits: [
      'Predicts job performance by matching personality to role requirements',
      'Supports objective, fair, and inclusive hiring decisions',
      'Backed by over 35 years of research and validation',
      'Adaptable across many industries and job roles'
    ],
    faqs: [
      { 
        question: 'Is the OPQ available in an untimed format?', 
        answer: 'Yes, the OPQ is untimed, allowing respondents to work through the questionnaire at their own pace. Most people complete it in 25-35 minutes.' 
      },
      { 
        question: 'How is the OPQ administered?', 
        answer: 'The OPQ is administered online through our secure assessment platform. Candidates receive a link via email to complete the assessment.' 
      },
      { 
        question: 'What reports are available for the OPQ?', 
        answer: 'Several reports are available including the Profile Report, Development Report, Leadership Report, and Sales Report. The specific reports available depend on your subscription level.' 
      },
      { 
        question: 'Is the OPQ available in multiple languages?', 
        answer: 'Yes, the OPQ is available in over 30 languages, making it suitable for international assessment programs.' 
      },
    ],
    caseStudies: [
      {
        id: 'cs1',
        company: 'Global Financial Services Firm',
        title: 'Reducing turnover and improving performance in sales roles',
        snippet: 'Reduced turnover by 24% and increased sales performance by implementing OPQ-based selection process.'
      },
      {
        id: 'cs2',
        company: 'International Retail Chain',
        title: 'Identifying high-potential store managers',
        snippet: 'Developed a success profile using the OPQ that led to 35% improvement in store manager performance metrics.'
      }
    ],
    relatedProducts: ['p2', 'p5', 'p8'],
    featured: true,
  },
  // Add other products here to match the IDs we've referenced elsewhere
  {
    id: 'p2',
    name: 'Verify Numerical Reasoning',
    category: 'Cognitive',
    shortDescription: 'Tests the ability to analyze numerical data, interpret information from tables and apply numerical concepts.',
  },
  {
    id: 'p5',
    name: 'Motivation Questionnaire',
    category: 'Personality',
    shortDescription: 'Measures what motivates and drives an individual in their work and what is likely to retain them in a role.',
  },
  {
    id: 'p8',
    name: 'Emotional Intelligence Assessment',
    category: 'Personality',
    shortDescription: 'Measures emotional self-awareness, empathy, relationship management, and social effectiveness.',
  },
];

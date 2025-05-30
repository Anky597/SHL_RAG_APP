
// This file contains the SHL product categories and their details

export interface Product {
  productName: string;
  description: string;
  specificUseCases?: string[];
  targetAudience?: string[];
  measures?: string[];
}

export interface ProductCategory {
  categoryName: string;
  categoryDescription: string;
  primaryUseCases?: string[];
  products: Product[];
}

export const productCategories: ProductCategory[] = [
  {
    categoryName: "Cognitive Ability Tests",
    categoryDescription: "Assessments designed to measure an individual's mental aptitude and reasoning capabilities relevant to workplace tasks. These often predict job performance, particularly learning speed and problem-solving.",
    primaryUseCases: [
      "High-Volume Recruitment Screening",
      "Graduate and Entry-Level Hiring",
      "Identifying Learning Agility",
      "Predicting Job Performance Potential",
      "Assessing Problem-Solving Skills"
    ],
    products: [
      {
        productName: "Verify Interactive",
        description: "Engaging, mobile-first cognitive assessments measuring various abilities (deductive, inductive, numerical reasoning, calculation, checking). Shorter completion times and enhanced candidate experience.",
        specificUseCases: [
          "Screening candidates for roles requiring various reasoning skills",
          "Improving candidate experience with interactive format",
          "Assessing cognitive ability across different job levels"
        ],
        targetAudience: [
          "Graduates",
          "Professionals",
          "Managers"
        ],
        measures: [
          "Deductive Reasoning",
          "Inductive Reasoning",
          "Numerical Reasoning",
          "Calculation",
          "Checking"
        ]
      },
      {
        productName: "Verify+",
        description: "A widely used suite of adaptive cognitive ability tests (Numerical, Verbal, Inductive, Deductive Reasoning, Calculation, Checking), often administered online and unsupervised, potentially followed by supervised verification.",
        specificUseCases: [
          "Screening large volumes of applicants efficiently",
          "Assessing core reasoning skills needed for many roles",
          "Benchmarking candidate abilities against relevant norm groups"
        ],
        targetAudience: [
          "Graduates",
          "Professionals",
          "Managers",
          "Executives (depending on test)"
        ],
        measures: [
          "Numerical Reasoning",
          "Verbal Reasoning",
          "Inductive Reasoning (Logical)",
          "Deductive Reasoning",
          "Calculation",
          "Checking"
        ]
      },
      {
        productName: "General Ability Test (G+)",
        description: "A test measuring general cognitive ability ('g'), often considered a strong predictor of overall job performance and trainability. Combines elements of different reasoning types.",
        specificUseCases: [
          "Assessing overall intellectual horsepower",
          "Predicting success in complex roles",
          "Identifying high-potential individuals for development"
        ],
        targetAudience: [
          "Professionals",
          "Managers",
          "Graduates"
        ],
        measures: [
          "General Cognitive Ability (composite of numerical, verbal, inductive)"
        ]
      },
      {
        productName: "General Ability Test (Verify G+)",
        description: "A composite assessment measuring numerical, inductive, and deductive reasoning skills; available in both interactive and standard multiple‐choice formats.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "Numerical Reasoning Test",
        description: "Evaluates the ability to interpret numerical data, perform calculations, and analyze charts, tables, and graphs under time pressure.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "Verbal Reasoning Test",
        description: "Assesses comprehension, logical evaluation of written passages, and the ability to draw conclusions based on text.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "Inductive Reasoning Test",
        description: "Measures abstract and pattern recognition skills by asking candidates to identify underlying rules in a series of figures or symbols.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "Deductive Reasoning Test",
        description: "Tests logical deduction and analytical thinking by requiring candidates to draw conclusions from provided premises or conditions.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "Calculation Test",
        description: "Assesses mental arithmetic and speed in performing basic mathematical operations without relying solely on a calculator.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "Checking Test",
        description: "Evaluates attention to detail by having candidates identify errors or inconsistencies in presented data.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "Mechanical Comprehension Test",
        description: "Assesses understanding of mechanical principles, such as gears, levers, and fluid mechanics, relevant for technical and engineering roles.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "Reading Comprehension Test",
        description: "Measures the ability to extract, understand, and interpret key information from written texts.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      }
    ]
  },
  {
    categoryName: "Personality and Behavioral Assessments",
    categoryDescription: "Questionnaires and tools designed to understand an individual's typical way of behaving, motivations, preferences, interaction styles, and judgment in a work context.",
    primaryUseCases: [
      "Improving Job Fit",
      "Team Building and Composition",
      "Leadership Selection and Development",
      "Identifying High Potentials",
      "Personal Development and Coaching",
      "Enhancing Interview Effectiveness",
      "Screening based on practical judgment"
    ],
    products: [
      {
        productName: "Occupational Personality Questionnaire (OPQ / OPQ32)",
        description: "SHL's flagship personality questionnaire, measuring 32 specific personality traits relevant to workplace behavior and performance.",
        specificUseCases: [
          "Selection: Matching personality profiles to job requirements",
          "Development: Identifying strengths and development areas",
          "Leadership: Assessing leadership styles and potential",
          "Team Dynamics: Understanding team member interaction styles"
        ],
        targetAudience: [
          "Professionals",
          "Managers",
          "Leaders",
          "Graduates"
        ],
        measures: [
          "32 specific personality traits grouped into domains like Relationships with People, Thinking Style, Feelings and Emotions"
        ]
      },
      {
        productName: "Motivation Questionnaire (MQ)",
        description: "Assesses 18 dimensions of motivation, helping understand factors that drive an individual's energy, engagement and performance at work.",
        specificUseCases: [
          "Improving job satisfaction and retention",
          "Matching individuals to roles/cultures that align with their motivators",
          "Informing reward and recognition strategies",
          "Coaching and Development"
        ],
        targetAudience: [
          "Professionals",
          "Managers",
          "Graduates"
        ],
        measures: [
          "18 dimensions of motivation (e.g., Achievement, Power, Affiliation, Commercial Outlook, Flexibility)"
        ]
      },
      {
        productName: "Situational Judgment Tests (SJTs)",
        description: "Presents candidates with realistic work-related scenarios and asks them to choose the most effective course of action. Assesses practical judgment and behavioral tendencies in context.",
        specificUseCases: [
          "Assessing job-specific competencies and behaviors",
          "Screening candidates based on practical problem-solving and decision-making",
          "Providing a realistic job preview",
          "Often customized for specific roles or organizational values"
        ],
        targetAudience: [
          "Graduates",
          "Professionals",
          "Managers (depending on SJT focus)"
        ],
        measures: [
          "Competencies like Decision Making, Problem Solving, Interpersonal Skills, Resilience, Customer Focus (depends on SJT design)"
        ]
      },
      {
        productName: "Universal Competency Framework (UCF) based assessments",
        description: "Assessments (often behavioral or SJT format) designed around SHL's Universal Competency Framework, mapping traits and behaviors to key workplace competencies.",
        specificUseCases: [
          "Structured assessment against a defined competency model",
          "Selection and development based on required competencies",
          "Talent management processes"
        ],
        targetAudience: [
          "Varies depending on application"
        ],
        measures: [
          "Competencies defined within the UCF (e.g., Leading and Deciding, Supporting and Cooperating, Analyzing and Interpreting, etc.)"
        ]
      },
      {
        productName: "Occupational Personality Questionnaire (OPQ)",
        description: "Evaluates work-related personality traits, behaviors, and communication styles to gauge job fit and potential.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "Motivational Questionnaire (MQ)",
        description: "Assesses what motivates a candidate in the workplace and identifies key drivers of their behavior.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "RemoteWorkQ",
        description: "Determines a candidate's suitability for remote work by evaluating work habits, self-motivation, and adaptability.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "Situational Judgment Test (SJT)",
        description: "Presents realistic workplace scenarios to assess decision-making, prioritization, and interpersonal skills.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "Behavior-Based Assessment",
        description: "Measures behavioral competencies by asking how candidates would act in specific job-related situations.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "Realistic Job Previews",
        description: "Simulated exercises that provide insight into job tasks and assess candidates' responses to realistic work challenges.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      }
    ]
  },
  {
    categoryName: "Skills Assessments",
    categoryDescription: "Tests designed to measure specific learned skills, technical abilities, or knowledge required for particular job roles.",
    primaryUseCases: [
      "Verifying Technical Proficiency",
      "Screening for Specific Job Requirements",
      "Assessing Language Skills",
      "Evaluating Coding Abilities",
      "Confirming Software Proficiency"
    ],
    products: [
      {
        productName: "Coding Interview",
        description: "An AI-powered coding assessment platform evaluating coding skills in various languages through real-world problem-solving.",
        specificUseCases: [
          "Screening software developers and engineers",
          "Assessing practical coding ability, not just theoretical knowledge",
          "Evaluating code quality and efficiency"
        ],
        targetAudience: [
          "Software Developers",
          "Engineers",
          "Technical Roles"
        ],
        measures: [
          "Coding proficiency (various languages)",
          "Problem-solving",
          "Code correctness",
          "Code quality"
        ]
      },
      {
        productName: "Language Proficiency",
        description: "Assessments evaluating proficiency in specific languages, particularly in a business context (reading, writing, listening, speaking).",
        specificUseCases: [
          "Screening for roles requiring specific language skills",
          "Ensuring communication standards",
          "Assessing readiness for international assignments"
        ],
        targetAudience: [
          "Any role requiring specific language proficiency"
        ],
        measures: [
          "Language skills (e.g., English, Spanish, etc.) across different modalities"
        ]
      },
      {
        productName: "Microsoft Office Skills",
        description: "Test proficiency levels in essential Microsoft Office applications like Word, Excel, and PowerPoint.",
        specificUseCases: [
          "Verifying foundational skills for administrative or technical support roles",
          "Ensuring minimum required software proficiency"
        ],
        targetAudience: [
          "Administrative roles",
          "Support staff",
          "Roles requiring MS Office use"
        ],
        measures: [
          "Proficiency in specific applications (Word, Excel, PowerPoint, etc.)"
        ]
      },
      {
        productName: "Typing Skills",
        description: "Measure typing speed and accuracy, crucial for many administrative and data entry roles.",
        specificUseCases: [
          "Screening for data entry, transcription, or administrative roles",
          "Establishing baseline typing proficiency"
        ],
        targetAudience: [
          "Administrative roles",
          "Data Entry Clerks",
          "Secretarial roles"
        ],
        measures: [
          "Typing speed (WPM)",
          "Accuracy (%)"
        ]
      },
      {
        productName: "Specific Knowledge/Skills Tests",
        description: "(Implied Category) Tests covering specific domains like financial accounting knowledge, etc. Often drawn from legacy SHL or acquired company catalogues.",
        specificUseCases: [
          "Verifying specialized knowledge for technical or professional roles",
          "Ensuring minimum proficiency levels in niche areas"
        ],
        targetAudience: [
          "Roles requiring specific technical or domain knowledge"
        ],
        measures: [
          "Defined knowledge or skill areas"
        ]
      }
    ]
  },
  {
    categoryName: "Interviewing Solutions",
    categoryDescription: "Technology and tools designed to streamline, standardize, structure, and enhance the job interview process.",
    primaryUseCases: [
      "Improving Interview Efficiency and Consistency",
      "Screening Candidates Remotely",
      "Assessing Communication and Technical Skills via Video",
      "Collaborative Hiring Decisions",
      "Reducing Scheduling Conflicts"
    ],
    products: [
      {
        productName: "Smart Interview On Demand",
        description: "An asynchronous video interviewing platform where candidates record responses to pre-set questions at their own convenience.",
        specificUseCases: [
          "Early-stage screening for communication and presentation skills",
          "Handling high volumes of applicants efficiently",
          "Allowing multiple reviewers to assess candidates consistently",
          "Overcoming scheduling challenges"
        ],
        targetAudience: [
          "Various roles, particularly high-volume"
        ],
        measures: [
          "Communication Skills",
          "Presentation",
          "Job-specific competency responses (qualitative assessment by reviewers)"
        ]
      },
      {
        productName: "Smart Interview Live",
        description: "A platform for conducting structured live video interviews with features like shared rating guides and collaborative review.",
        specificUseCases: [
          "Conducting remote interviews consistently",
          "Facilitating structured, competency-based interviews",
          "Improving collaboration among interviewers"
        ],
        targetAudience: [
          "Various roles"
        ],
        measures: [
          "Competencies assessed via structured interview questions (qualitative assessment)"
        ]
      },
      {
        productName: "Coding Interview (Live)",
        description: "Live coding interview environment allowing interviewers to observe and interact with candidates as they solve coding problems in real-time.",
        specificUseCases: [
          "Deep-dive assessment of technical problem-solving and coding skills",
          "Evaluating candidate thought processes and collaboration",
          "Technical screening for software roles"
        ],
        targetAudience: [
          "Software Developers",
          "Engineers",
          "Technical Roles"
        ],
        measures: [
          "Live coding ability",
          "Problem-solving approach",
          "Technical communication"
        ]
      }
    ]
  },
  {
    categoryName: "Assessment Centres and Simulations",
    categoryDescription: "More complex assessment methods involving multiple exercises (e.g., group discussions, role-plays, in-tray/analysis exercises, simulations) designed to observe behavior in simulated work situations.",
    primaryUseCases: [
      "In-depth Assessment for Key Roles (e.g., Leadership, Management)",
      "Development Centers for Identifying Potential",
      "Succession Planning",
      "Observing Behavior and Competencies in Realistic Contexts"
    ],
    products: [
      {
        productName: "Assessment Centre Exercises",
        description: "A library of standardized exercises (e.g., analysis exercises, group discussions, role-plays) that can be combined to create assessment or development centers.",
        specificUseCases: [
          "Building custom assessment centers tailored to specific roles/levels",
          "Observing a range of competencies in action"
        ],
        targetAudience: [
          "Managers",
          "Leaders",
          "High Potentials",
          "Graduates (specific exercises)"
        ],
        measures: [
          "Various competencies depending on exercises used (e.g., Leadership, Communication, Analysis, Teamwork, Influence)"
        ]
      },
      {
        productName: "Business Simulations",
        description: "Immersive simulations assessing decision-making, strategic thinking, financial acumen, and other complex competencies in a dynamic environment.",
        specificUseCases: [
          "Assessing readiness for senior roles",
          "Developing strategic capabilities",
          "Evaluating complex problem-solving skills"
        ],
        targetAudience: [
          "Managers",
          "Leaders",
          "High Potentials"
        ],
        measures: [
          "Strategic Thinking",
          "Decision Making",
          "Financial Acumen",
          "Leadership Competencies (depending on simulation)"
        ]
      },
      {
        productName: "Virtual Assessment Centers",
        description: "Delivering assessment center exercises remotely using technology platforms, potentially incorporating online simulations and video.",
        specificUseCases: [
          "Running assessment centers cost-effectively and without geographical constraints",
          "Assessing candidates for remote or global roles"
        ],
        targetAudience: [
          "Managers",
          "Leaders",
          "High Potentials",
          "Graduates"
        ],
        measures: [
          "Similar competencies to traditional ACs, assessed via virtual means"
        ]
      },
      {
        productName: "Contact Center Simulation",
        description: "Simulates customer interaction scenarios to evaluate communication, problem-solving, and customer service skills.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "Virtual Assessment Center Exercises",
        description: "A suite of interactive exercises (group or individual) that mimic real assessment center tasks and provide a practical evaluation of skills.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "Technical/Skill-Based Simulations",
        description: "Customized simulations that test job-specific technical skills, such as coding or machinery operation, tailored to the role.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "WriteX",
        description: "An assessment of written communication skills where candidates draft emails or other texts to simulate workplace correspondence.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      }
    ]
  },
  {
    categoryName: "Ready-to-use Solutions",
    categoryDescription: "Pre-configured assessment packages combining multiple tools, tailored for specific common hiring needs and role types.",
    primaryUseCases: [],
    products: [
      {
        productName: "Graduate Solution",
        description: "Assessments optimized for identifying high-potential graduate candidates."
      },
      {
        productName: "Volume Recruitment Solution",
        description: "Efficient and effective screening tools designed for high-volume hiring campaigns."
      },
      {
        productName: "Leadership Solution",
        description: "Suite of assessments focused on identifying and developing leadership potential and effectiveness."
      },
      {
        productName: "Professional Hires Solution",
        description: "Assessments tailored for evaluating experienced professionals and specialists."
      },
      {
        productName: "Technology Hiring Solution",
        description: "Specialized tools, including coding assessments, for recruiting tech talent."
      }
    ]
  },
  {
    categoryName: "Talent Management Technology & Platform",
    categoryDescription: "The underlying technology platforms and analytical tools used to administer assessments, manage candidates/employees, generate reports, facilitate internal mobility and derive insights from talent data.",
    primaryUseCases: [
      "Centralized Assessment Administration",
      "Candidate Management and Tracking",
      "Generating Individual and Group Reports",
      "Talent Analytics and Benchmarking",
      "Ensuring Assessment Security and Proctoring",
      "Internal Talent Mobility and Succession Planning"
    ],
    products: [
      {
        productName: "TalentCentral",
        description: "SHL's core platform for hosting, administering, and managing assessments and assessment data. Provides reporting and analytics capabilities.",
        specificUseCases: [
          "Single point of access for deploying various SHL assessments",
          "Managing candidate workflows and communication",
          "Viewing and interpreting assessment results",
          "Generating reports for selection and development"
        ],
        targetAudience: [
          "HR Professionals",
          "Recruiters",
          "Hiring Managers"
        ],
        measures: [
          "N/A - Platform Tool"
        ]
      },
      {
        productName: "Talent Acquisition Solutions",
        description: "Integrated technology (likely leveraging TalentCentral and other tools) to enhance the efficiency and effectiveness of the hiring process.",
        specificUseCases: [
          "Streamlining recruitment workflows",
          "Improving candidate experience",
          "Integrating assessment data into hiring decisions"
        ],
        targetAudience: [
          "HR/TA Professionals"
        ],
        measures: [
          "N/A - Solution Set"
        ]
      },
      {
        productName: "Talent Mobility (Mobilize)",
        description: "A solution/technology focused on internal talent mobility, helping organizations identify employee skills, potential, and development needs to fill roles internally.",
        specificUseCases: [
          "Internal recruitment and succession planning",
          "Identifying skill gaps within the workforce",
          "Facilitating employee career development",
          "Improving employee retention"
        ],
        targetAudience: [
          "HR Professionals",
          "Talent Managers",
          "Employees"
        ],
        measures: [
          "Skills",
          "Potential",
          "Aspirations (based on employee input and potentially assessment data)"
        ]
      },
      {
        productName: "Analytics & Reporting Tools",
        description: "Various reporting options available through TalentCentral or as separate services, including candidate feedback reports, manager reports, benchmarking reports, and talent analytics dashboards.",
        specificUseCases: [
          "Making data-driven hiring decisions",
          "Providing feedback for candidate development",
          "Understanding team profiles",
          "Tracking ROI of assessment programs"
        ],
        targetAudience: [
          "HR Professionals",
          "Recruiters",
          "Hiring Managers",
          "Leaders"
        ],
        measures: [
          "Insights derived from assessment data"
        ]
      },
      {
        productName: "SHL Talent Central",
        description: "An online platform for employers that provides candidate profiles, assessment reports, and tools for data-driven hiring decisions.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "Online Practice Tests",
        description: "A range of free and paid practice tests that mimic the SHL assessment formats, helping candidates prepare and benchmark their performance.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "Customizable Assessments",
        description: "Solutions that allow employers to tailor assessments to specific job roles, competencies, and organizational needs.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      },
      {
        productName: "Detailed Performance Reports",
        description: "Feedback and scoring reports that compare candidate performance against norm groups, aiding both selection and development.",
        specificUseCases: [],
        targetAudience: [],
        measures: []
      }
    ]
  },
  {
    categoryName: "Professional Services",
    categoryDescription: "Expert support, consulting, and services to help organizations design, implement, and optimize their talent assessment and management strategies.",
    primaryUseCases: [],
    products: [
      {
        productName: "Consulting Services",
        description: "Expert guidance on assessment strategy, implementation, validation, competency modeling, and talent management practices."
      },
      {
        productName: "Job Analysis",
        description: "Services to systematically identify the key competencies, skills, knowledge, and behaviors required for successful job performance."
      },
      {
        productName: "Benchmarking",
        description: "Creating relevant comparison groups (norms) based on specific populations to interpret assessment scores effectively within context."
      }
    ]
  }
];

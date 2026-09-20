// ─────────────────────────────────────────────────────
// BBH Portfolio — Unified Structured Data Layer
// P M K Blessing Bryson Hong | Software Developer
// Single Source of Truth for Public Site & Admin Panel
// STRICTLY FACTUAL — Verified real information only.
// ─────────────────────────────────────────────────────

export const PORTFOLIO_DATA = {
  // ── Identity & Site Info ──────────────────────────
  profile: {
    name: 'Blessing Bryson Hong',
    fullName: 'P M K BLESSING BRYSON HONG',
    brand: 'BBH',
    role: 'Software Developer',
    heroRole: 'AI & DATA SCIENCE + FULL STACK DEVELOPER',
    education: 'III YEAR — B.TECH ARTIFICIAL INTELLIGENCE & DATA SCIENCE',
    institution: "St. Xavier's Catholic College of Engineering (SXCCE)",
    location: 'Kanyakumari, Tamil Nadu, India',
    avatar: '/profile.jpeg',
    heroStatement:
      'Building practical software with AI, data, and full-stack development.',
    shortBio:
      "Intern at Nex-X Spark and III-year B.Tech AI & Data Science student at St. Xavier's Catholic College of Engineering (SXCCE).",
    fullBio:
      "Third-year B.Tech Artificial Intelligence & Data Science student at St. Xavier's Catholic College of Engineering (SXCCE). Currently working as an intern at Nex-X Spark, where I get to work on real-world software projects and strengthen my development skills. Interested in building useful software and exploring AI, data, and full-stack development.",
    currentDirection:
      'Working as an intern on company projects at Nex-X Spark while strengthening software and development skills.',
    email: 'blessingbrysonhongpmk@gmail.com',
    availability: 'Open to Opportunities',
  },

  // ── Social Channels ───────────────────────────────
  socials: [
    { platform: 'GitHub', url: 'https://github.com/blessingbrysonhongpmk', icon: 'github', label: 'github.com/blessingbrysonhongpmk' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/blessing-bryson-hong-p-m-k-2b908b386', icon: 'linkedin', label: 'linkedin.com/in/blessing-bryson-hong' },
    { platform: 'Instagram', url: 'https://www.instagram.com/itz_bless_00x', icon: 'instagram', label: '@itz_bless_00x' },
    { platform: 'Facebook', url: 'https://www.facebook.com/share/199ps3WZw3/', icon: 'facebook', label: 'Facebook Profile' },
    { platform: 'Discord', url: 'https://discord.gg/twV4jA2f', icon: 'message-circle', label: 'Discord Community' },
  ],

  // ── Navigation ────────────────────────────────────
  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ],

  // ── About Section Content (Concise & Minimal) ─────
  aboutPreview: {
    heading: 'P M K BLESSING BRYSON HONG',
    degree: 'III Year B.Tech Artificial Intelligence & Data Science',
    institution: "St. Xavier's Catholic College of Engineering (SXCCE)",
    statement: 'Focused on building practical software and intelligent systems.',
    paragraphs: [
      "III Year B.Tech Artificial Intelligence & Data Science student at St. Xavier's Catholic College of Engineering (SXCCE). Focused on building practical software and intelligent systems.",
    ],
    tags: [
      'B.Tech AI & Data Science (III Year)',
      "St. Xavier's Catholic College of Engineering (SXCCE)",
      'Intern at Nex-X Spark',
      'Python & Full-Stack Development',
    ],
    developmentFocus: [
      {
        title: 'Machine Learning Pipelines',
        desc: 'Developing predictive regression models and data analysis pipelines using Python and Scikit-learn.',
      },
      {
        title: 'Full-Stack Web Development',
        desc: 'Building responsive React web applications paired with Python and Django backends.',
      },
      {
        title: 'Data Science & Visualizations',
        desc: 'Conducting exploratory data analysis with Pandas, NumPy, Matplotlib, and Streamlit dashboards.',
      },
    ],
  },

  // ── Categorized Skills Matrix (Verified Only) ─────
  skillCategories: [
    {
      category: 'PROGRAMMING',
      skills: [
        { name: 'Python', status: 'Primary Language', description: 'Core programming language for scripting, data analysis, ML models, and backend logic' },
      ],
    },
    {
      category: 'WEB DEVELOPMENT',
      skills: [
        { name: 'HTML & CSS', status: 'Comfortable', description: 'Semantic web structure, responsive layouts, modern styling' },
        { name: 'JavaScript', status: 'Working Knowledge', description: 'Modern ES6+, DOM manipulation, asynchronous programming' },
        { name: 'React', status: 'Working Knowledge', description: 'Component-based UI architecture, state management, Vite' },
        { name: 'Django', status: 'Working Knowledge', description: 'Python backend web framework, ORM models, views, and templates' },
      ],
    },
    {
      category: 'DATA & AI',
      skills: [
        { name: 'Data Science', status: 'Working Knowledge', description: 'Exploratory data analysis, statistical insights, data workflows' },
        { name: 'Pandas & NumPy', status: 'Working Knowledge', description: 'Data wrangling, aggregation, array manipulation, tabular processing' },
        { name: 'Scikit-learn', status: 'Working Knowledge', description: 'Supervised machine learning algorithms, model training, evaluation' },
        { name: 'Matplotlib', status: 'Working Knowledge', description: 'Data visualization, distribution plots, analytical charts' },
        { name: 'Machine Learning', status: 'Working Knowledge', description: 'Predictive modeling, regression analysis, evaluation metrics' },
        { name: 'Streamlit', status: 'Working Knowledge', description: 'Interactive Python dashboards for machine learning and data tools' },
      ],
    },
    {
      category: 'TOOLS',
      skills: [
        { name: 'Git & GitHub', status: 'Comfortable', description: 'Version control, repository management, collaborative branching' },
        { name: 'VS Code', status: 'Comfortable', description: 'Primary development environment and tooling' },
        { name: 'Vite', status: 'Comfortable', description: 'Frontend build tooling and local development server' },
        { name: 'Antigravity', status: 'Working Knowledge', description: 'Advanced agentic AI development and programming workflows' },
      ],
    },
    {
      category: 'LANGUAGES',
      skills: [
        { name: 'Tamil', status: 'Native / Fluent', description: 'Native language' },
        { name: 'English', status: 'Professional Working', description: 'Professional working proficiency' },
        { name: 'Malayalam', status: 'Conversational', description: 'Working conversational proficiency' },
        { name: 'German', status: 'Basic', description: 'Basic foundational proficiency' },
      ],
    },
  ],

  // ── Projects (Verified Real Projects) ──
  projects: [
    {
      id: 'smart-canteen-ai',
      name: 'SMART CANTEEN AI',
      tagline: 'ML-based food demand prediction & waste reduction system',
      oneLiner: 'Machine learning demand forecasting to help reduce institutional food waste.',
      year: '2026',
      category: 'Data Science / ML',
      status: 'Complete',
      statusLabel: 'Data Science Project',
      role: 'ML Pipeline & Developer',
      technologies: ['Python', 'Machine Learning', 'Data Analysis', 'Streamlit', 'Pandas', 'Scikit-learn'],
      description:
        'An ML-based food demand prediction system designed to estimate daily food preparation quantities and help minimize waste in institutional dining facilities.',
      problem:
        'Institutional dining preparation often relies on manual estimation, which can result in significant food waste on low-turnout days or meal shortages during unexpected surges.',
      goal:
        'Provide canteen operations with daily meal quantity forecasts based on historical attendance patterns to optimize food preparation.',
      solution:
        'Engineered a machine learning pipeline in Python that analyzes historical transaction logs, academic schedules, and day-of-week variables to train regression forecasting models.',
      contribution:
        'Built the Python data preprocessing scripts, feature engineering, regression model evaluation, and an interactive Streamlit operations dashboard.',
      architecture:
        'Data Ingestion (CSV) → Preprocessing (Pandas/NumPy) → Feature Engineering → Regression Modeling (Scikit-learn) → Interactive Dashboard (Streamlit).',
      keyFeatures: [
        'Daily meal quantity demand forecasting',
        '7-day trend rolling average calculation',
        'Interactive quantity estimation table for kitchen prep',
        'Streamlit-based operator dashboard',
      ],
      challenges:
        'Accounting for fluctuations during exam schedules and campus holidays required engineering calendar-based features.',
      implementation:
        'Implemented using Scikit-learn regression models, Pandas for data processing, and Streamlit for the user interface.',
      result:
        'Delivered a working forecasting model and dashboard that provides canteen operators with actionable daily prep estimates.',
      learnings:
        'Gained practical experience with tabular data preprocessing, model evaluation, and building straightforward data tools for non-technical users.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0',
      videoTitle: 'Smart Canteen AI — Demo Walkthrough',
      videoDescription: 'Demonstration of daily meal consumption forecasting and the interactive Streamlit dashboard.',
      liveUrl: '',
      githubUrl: 'https://github.com/blessingbrysonhongpmk',
      isFlagship: true,
      color: '#10B981',
      image: '/projects/smart-canteen-ai-v2.jpg',
    },
    {
      id: 'devi-devan-industries',
      name: 'DEVI DEVAN INDUSTRIES',
      tagline: 'Production commercial website for pure coconut & edible oil manufacturer',
      oneLiner: 'Commercial responsive website designed, developed, and deployed for Devi Devan coconut oil enterprise.',
      year: '2026',
      category: 'Client Production',
      status: 'Live',
      statusLabel: 'Production Client Website',
      role: 'Developer & UI Designer',
      technologies: ['React', 'Vite', 'CSS Modules', 'JavaScript', 'HTML & CSS'],
      description:
        'A comprehensive professional digital presence designed, developed, and deployed for Devi Devan Industries, a pure coconut oil and edible oils manufacturing enterprise.',
      problem:
        'The enterprise lacked an online product catalog and digital presence to present their pure coconut oil products, quality standards, and bulk order options to commercial buyers and retail customers.',
      goal:
        'Create a responsive, clean web platform showcasing pure coconut oil products and enabling direct quotation inquiries and customer orders.',
      solution:
        'Designed a fresh, clean organic aesthetic and developed a responsive React application built with Vite, featuring pure coconut oil product showcases and customer inquiry workflows.',
      contribution:
        'Completed UI/UX design, React component architecture, responsive styling across screen sizes, and production deployment.',
      architecture:
        'Component Architecture (React) → Build & Asset Bundling (Vite) → Styling (CSS Modules & Custom Properties) → Production Hosting.',
      keyFeatures: [
        'Pure coconut oil products showcase (cold-pressed virgin coconut oil, edible oils)',
        'Built-in commercial bulk inquiry and customer contact form',
        'Responsive layout optimized for both desktop and mobile shoppers',
        'Fast page load times with optimized product media',
      ],
      challenges:
        'Presenting organic product attributes, quality packaging options, and order flows in a clean, modern layout.',
      implementation:
        'Built using modular CSS and React hooks with minimal runtime overhead.',
      result:
        'Deployed to production at devidevanindustries.com, serving as the client’s official commercial web presence for coconut oil products.',
      learnings:
        'Gained hands-on experience in client communication, product showcase requirements, and shipping a real-world commercial website.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0',
      videoTitle: 'Devi Devan Industries — Client Showcase',
      videoDescription: 'Visual walkthrough of client website sections, responsive mobile layout, and coconut oil inquiry forms.',
      liveUrl: 'https://devidevanindustries.com',
      githubUrl: '',
      isFlagship: true,
      color: '#FF3B5C',
      image: '/projects/devi-devan-industries-v2.jpg',
    },
    {
      id: 'aluminium-fabrication',
      name: 'ALUMINIUM FABRICATION PORTAL',
      tagline: 'Architectural window & facade configurator catalog',
      oneLiner: 'Commercial web configurator with Django backend catalog integration.',
      year: '2026',
      category: 'Web Development',
      status: 'Live',
      statusLabel: 'Commercial Web Project',
      role: 'Frontend & Backend Developer',
      technologies: ['React', 'Vite', 'Django', 'Python', 'CSS Grid'],
      description:
        'A commercial web application for an architectural aluminium fabrication firm, pairing an interactive React product configurator with a Django backend.',
      problem:
        'Customers needed a clear way to explore custom window profiles, glazing configurations, and frame sizing online.',
      goal:
        'Allow clients and contractors to view aluminium profile styles, options, and sizing with real-time specification readouts.',
      solution:
        'Constructed a dynamic product catalog and configurator interface connected with a Django backend to deliver specification options.',
      contribution:
        'Developed the responsive React user interface, dynamic schematic view components, and Django backend models and views.',
      architecture:
        'Django Backend (Models & Views) ↔ Fetch Layer ↔ State Management (React) ↔ Dynamic Schematic Renderer.',
      keyFeatures: [
        'Architectural window and facade configurator',
        'Real-time dimension calculation readout',
        'Product category browsing and search filtering',
        'Mobile-friendly quotation submission form',
      ],
      challenges:
        'Managing state synchronization across multiple product configuration options on the client side.',
      implementation:
        'Built using React components for the interactive configurator and Django for backend data modeling.',
      result:
        'Successfully deployed to production, providing prospective clients with an interactive showroom for architectural window products.',
      learnings:
        'Strengthened skills in full-stack Python and Django development paired with interactive React user interfaces.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0',
      videoTitle: 'Aluminium Fabrication Portal — Demo',
      videoDescription: 'Live architectural window configurator demo showcasing product options and catalog browsing.',
      liveUrl: 'https://alumunium-fabrication-company.vercel.app/',
      githubUrl: '',
      isFlagship: false,
      color: '#0284C7',
      image: '/projects/aluminium-fabrication-v2.jpg',
    },
  ],

  // ── Company Experiences & Internships (Verified) ──
  companyExperiences: [
    {
      id: 'nexx-spark',
      company: 'Nex-X Spark',
      websiteUrl: 'https://nexxspark.com/',
      displayUrl: 'nexxspark.com',
      logo: '/companies/nexxspark-logo.svg',
      previewImage: '/companies/nexxspark-preview.png',
      mobilePreviewImage: '/companies/nexxspark-mobile.png',
      role: 'Intern',
      period: 'CURRENT',
      status: 'Current Internship',
      description: 'Working on real-world company projects.',
      technologies: [],
      accentColor: '#6366F1',
      accentGlow: 'rgba(99, 102, 241, 0.28)',
      themeClass: 'company-card--nexxspark',
      browserTitle: "Nex-X Spark — Business Tech Ecosystem",
    },
    {
      id: 'agileinfotech',
      company: 'AGILEINFOTECH',
      websiteUrl: 'https://agileinfoz.com/',
      displayUrl: 'agileinfoz.com',
      logo: '/companies/agileinfotech-logo.webp',
      previewImage: '/companies/agileinfotech-preview.png',
      mobilePreviewImage: '/companies/agileinfotech-mobile.png',
      role: 'Internship',
      period: '2026',
      status: 'Full Stack Development',
      description: 'Full Stack Development using Python and Django.',
      technologies: ['Python', 'Django'],
      accentColor: '#2563EB',
      accentGlow: 'rgba(37, 99, 235, 0.28)',
      themeClass: 'company-card--agileinfotech',
      browserTitle: 'AGILEINFOTECH — Web & App Solutions',
    },
    {
      id: 'ak-infopark',
      company: 'AK INFOPARK',
      websiteUrl: 'https://akinfopark.com/',
      displayUrl: 'akinfopark.com',
      logo: '/companies/akinfopark-logo.png',
      previewImage: '/companies/akinfopark-preview.png',
      mobilePreviewImage: '/companies/akinfopark-mobile.png',
      role: 'Internship',
      period: '2025',
      status: 'Data Science',
      description: 'Data Science using Python.',
      technologies: ['Python'],
      accentColor: '#8054E7',
      accentGlow: 'rgba(128, 84, 231, 0.28)',
      themeClass: 'company-card--akinfopark',
      browserTitle: 'AK INFOPARK — Be Digital! Go Digital!',
    },
  ],

  // ── Trajectory & Summary Streams ──────────────────
  journeyMilestonesSummary: [
    {
      year: 'CURRENT',
      title: 'Nex-X Spark',
      role: 'Intern',
      desc: 'Working on real-world company projects.',
    },
    {
      year: '2026',
      title: 'AGILEINFOTECH',
      role: 'Internship — Full Stack Development',
      desc: 'Full Stack Development using Python and Django.',
    },
    {
      year: '2025',
      title: 'AK INFOPARK',
      role: 'Internship — Data Science',
      desc: 'Data Science using Python.',
    },
    {
      year: '2024',
      title: "St. Xavier's Catholic College of Engineering (SXCCE)",
      role: 'B.Tech AI & Data Science',
      desc: 'Foundations in computer science, Python, and mathematics.',
    },
  ],

  achievementsSummary: [
    { label: 'Technical Competitions', detail: 'Collegiate and state-level engineering challenges' },
    { label: 'Paper Presentations', detail: 'Technical paper presentations on ML and data systems' },
    { label: 'Hackathons', detail: 'Participation in competitive technical hackathons' },
    { label: 'Client Delivery', detail: 'Production website delivery for Devi Devan Industries' },
  ],

  // ── Chronological Journey (Full Narrative) ─────────
  journey: [
    {
      year: 'CURRENT',
      milestone: 'Nex-X Spark — Intern',
      tag: 'Professional Experience',
      summary: 'Intern at Nex-X Spark, working on real-world company projects.',
      details:
        'Currently working as an intern at Nex-X Spark, collaborating on real-world company projects and strengthening development skills.',
      keyHighlights: ['Working on real-world company projects', 'Strengthening software development skills'],
      isCurrent: true,
      websiteUrl: 'https://nexxspark.com/',
      logo: '/companies/nexxspark-logo.svg',
    },
    {
      year: '2026',
      milestone: 'AGILEINFOTECH — Full Stack Internship',
      tag: 'Industry Internship',
      summary: 'Internship in Full Stack Development using Python and Django.',
      details:
        'Completed full-stack development internship utilizing Python and Django to build web application components, backend views, and database interactions.',
      keyHighlights: ['Python and Django full-stack development', 'Backend views and database model implementation'],
      websiteUrl: 'https://agileinfoz.com/',
      logo: '/companies/agileinfotech-logo.webp',
    },
    {
      year: '2025',
      milestone: 'AK INFOPARK — Data Science Internship',
      tag: 'Industry Internship',
      summary: 'Internship in Data Science using Python.',
      details:
        'Completed data science internship utilizing Python to process datasets, conduct exploratory data analysis, and implement analytical workflows.',
      keyHighlights: ['Data Science with Python', 'Exploratory data analysis and dataset preprocessing'],
      websiteUrl: 'https://akinfopark.com/',
      logo: '/companies/akinfopark-logo.png',
    },
    {
      year: '2024',
      milestone: "St. Xavier's Catholic College of Engineering (SXCCE)",
      tag: 'Academic Foundation',
      summary: 'B.Tech in Artificial Intelligence & Data Science.',
      details:
        'Commenced undergraduate studies in Artificial Intelligence and Data Science, establishing foundations in Python programming, mathematics, algorithms, and data structures.',
      keyHighlights: ['Core computer science fundamentals', 'Python programming foundations'],
    },
  ],

  // ── Formal Experience (Strictly Verified Facts Only) ──
  experience: [
    {
      id: 'nexx-spark-current',
      company: 'Nex-X Spark',
      websiteUrl: 'https://nexxspark.com/',
      logo: '/companies/nexxspark-logo.svg',
      role: 'Intern',
      period: 'CURRENT',
      location: 'India',
      description: 'Working on real-world company projects.',
      highlights: [
        'Intern working on real-world company projects',
        'Strengthening software development skills and practical experience',
      ],
    },
    {
      id: 'agileinfotech-2026',
      company: 'AGILEINFOTECH',
      websiteUrl: 'https://agileinfoz.com/',
      logo: '/companies/agileinfotech-logo.webp',
      role: 'Internship — Full Stack Development',
      period: '2026',
      location: 'India',
      description: 'Full Stack Development using Python and Django.',
      highlights: [
        'Full Stack Development using Python and Django',
        'Built backend logic, database models, and web components',
      ],
    },
    {
      id: 'ak-infopark-2025',
      company: 'AK INFOPARK',
      websiteUrl: 'https://akinfopark.com/',
      logo: '/companies/akinfopark-logo.png',
      role: 'Internship — Data Science',
      period: '2025',
      location: 'India',
      description: 'Data Science using Python.',
      highlights: [
        'Data Science using Python',
        'Data analysis, preprocessing, and exploratory data workflows',
      ],
    },
  ],

  // ── Academic Credentials ──────────────────────────
  education: [
    {
      degree: 'B.Tech — Artificial Intelligence & Data Science',
      institution: "St. Xavier's Catholic College of Engineering (SXCCE)",
      period: '2023 — 2027',
      status: 'Currently in III Year',
      focus: 'Artificial Intelligence, Data Science, Machine Learning, Data Structures, Algorithms, Full Stack Web Development.',
    },
  ],

  // ── Key Achievements ──────────────────────────────
  achievements: [
    {
      id: 'ach-client-production',
      title: 'Commercial Client Website Delivery',
      category: 'Client Production',
      event: 'Devi Devan Industries (devidevanindustries.com)',
      year: '2026',
      result: 'Deployed to Production',
      role: 'Developer & UI Designer',
      description:
        'Designed, built, and deployed the official commercial website for Devi Devan Industries, establishing their digital catalog and client inquiry touchpoint.',
      keyHighlights: [
        'Deployed live production website at devidevanindustries.com',
        'Built responsive commercial catalog and client inquiry touchpoint for coconut oil products',
      ],
      link: 'https://devidevanindustries.com',
    },
    {
      id: 'ach-paper-presentation',
      title: 'Technical Symposium & Paper Presentations',
      category: 'Paper Presentations',
      event: 'Inter-Collegiate Technical Symposiums',
      year: '2025',
      result: 'Technical Presenter',
      role: 'Presenter',
      description:
        'Presented technical papers and methodology on machine learning applications and data systems at collegiate engineering symposiums.',
      keyHighlights: [
        'Presented technical papers on machine learning',
        'Discussed model evaluation and data analysis workflows',
      ],
      link: '',
    },
    {
      id: 'ach-ml-prototypes',
      title: 'Machine Learning Demand Forecasting System',
      category: 'Engineering Projects',
      event: 'Smart Canteen AI Project',
      year: '2026',
      result: 'Working Application & Model',
      role: 'Lead Developer',
      description:
        'Engineered Smart Canteen AI, a Python and Streamlit machine learning demand prediction system designed to help dining operations forecast daily meal preparation.',
      keyHighlights: [
        'Machine learning forecasting model in Python',
        'Interactive Streamlit operator dashboard',
      ],
      link: '',
    },
    {
      id: 'ach-internships',
      title: 'Industry Internships',
      category: 'Experience',
      event: 'AGILEINFOTECH & AK INFOPARK',
      year: '2025 — 2026',
      result: 'Internships Completed',
      role: 'Intern',
      description:
        'Completed internships in Full Stack Development using Python and Django (AGILEINFOTECH, 2026) and Data Science using Python (AK INFOPARK, 2025).',
      keyHighlights: [
        'AGILEINFOTECH: Full Stack Development using Python and Django',
        'AK INFOPARK: Data Science using Python',
      ],
      link: '',
    },
  ],
};

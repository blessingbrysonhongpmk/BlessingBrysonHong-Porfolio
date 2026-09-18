// ─────────────────────────────────────────────────────
// BBH Portfolio — Structured Data
// Blessing Bryson Hong | AI & Data Science Engineer
// ─────────────────────────────────────────────────────

export const PORTFOLIO_DATA = {
  // ── Identity ──────────────────────────────────────
  profile: {
    name: 'Blessing Bryson Hong',
    fullName: 'P M K BLESSING BRYSON HONG',
    brand: 'BBH',
    role: 'AI & DATA SCIENCE + FULL STACK DEVELOPER',
    education: 'III YEAR — B.TECH AI & DATA SCIENCE',
    institution: 'Panimalar Engineering College',
    location: 'India',
    avatar: '/profile.jpeg',
    heroStatement:
      'Building intelligent systems across AI, data, and full-stack engineering.',
    shortBio:
      'AI & Data Science student focused on building practical software, intelligent systems, and full-stack products.',
    fullBio:
      'Third-year Artificial Intelligence & Data Science engineering undergraduate at Panimalar Engineering College with hands-on development experience across machine learning workflows, data science pipelines, and production web applications. Combines analytical rigor with practical full-stack engineering to build software that solves real institutional and commercial problems.',
    currentDirection:
      'Advancing toward AI Engineering by mastering model pipelines, computer vision inference, and high-performance full-stack architectures.',
    email: 'blessingbrysonhongpmk@gmail.com',
    availability: 'Available for 2026 Opportunities',
  },

  // ── Social Links ──────────────────────────────────
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
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ],

  // ── Categorized Skills (Confidence/Group Based) ───
  skillCategories: [
    {
      category: 'LANGUAGES',
      skills: [
        { name: 'Python', status: 'Working Knowledge', description: 'Scripting, data wrangling, ML pipelines, automation' },
        { name: 'SQL', status: 'Working Knowledge', description: 'Relational database queries, schema design, data modeling' },
        { name: 'JavaScript / TypeScript', status: 'Working Knowledge', description: 'Modern ES6+, async architectures, DOM manipulation' },
        { name: 'HTML & CSS', status: 'Comfortable', description: 'Semantic structure, responsive layouts, modern design tokens' },
      ],
    },
    {
      category: 'WEB DEVELOPMENT',
      skills: [
        { name: 'React', status: 'Working Knowledge', description: 'Modular component architecture, state management, Vite' },
        { name: 'Node.js', status: 'Working Knowledge', description: 'Runtime server logic, backend API integration' },
        { name: 'Django', status: 'Working Knowledge', description: 'Backend ORM models, views, REST patterns' },
        { name: 'REST APIs', status: 'Working Knowledge', description: 'Endpoint design, API consumption, client-server sync' },
        { name: 'Full Stack Development', status: 'Working Knowledge', description: 'End-to-end web architectures from database to UI' },
      ],
    },
    {
      category: 'DATA & AI',
      skills: [
        { name: 'Data Science', status: 'Working Knowledge', description: 'Exploratory data analysis, insights extraction, metrics' },
        { name: 'Machine Learning', status: 'Exploring', description: 'Demand prediction, regression, model evaluation' },
        { name: 'Pandas & NumPy', status: 'Working Knowledge', description: 'Data wrangling, matrix calculations, tabular datasets' },
        { name: 'Matplotlib', status: 'Working Knowledge', description: 'Data visualization, distribution plots, trend analysis' },
        { name: 'Scikit-learn', status: 'Exploring', description: 'Supervised ML algorithms, feature preprocessing' },
        { name: 'Computer Vision', status: 'Exploring', description: 'Frame sampling, object tracking, visual hazard alerts' },
      ],
    },
    {
      category: 'TOOLS & CLOUD',
      skills: [
        { name: 'Git & GitHub', status: 'Comfortable', description: 'Version control, repository management, collaboration' },
        { name: 'Firebase & MongoDB', status: 'Working Knowledge', description: 'NoSQL document stores & modern cloud services' },
        { name: 'VS Code', status: 'Comfortable', description: 'Primary engineering IDE and developer extensions' },
        { name: 'Jupyter & Colab', status: 'Working Knowledge', description: 'Interactive notebooks and GPU-accelerated computing' },
        { name: 'Streamlit', status: 'Working Knowledge', description: 'Rapid ML/data dashboard development and deployment' },
      ],
    },
  ],

  // ── Projects (Work) ───────────────────────────────
  projects: [
    {
      id: 'smart-canteen-ai',
      name: 'SMART CANTEEN AI',
      tagline: 'ML-based food demand prediction & waste reduction system',
      oneLiner: 'Machine learning demand forecasting to eliminate institutional food waste.',
      year: '2026',
      category: 'Data Science / ML',
      status: 'Complete',
      statusLabel: 'Data Science Project',
      role: 'ML Pipeline & Full-Stack Developer',
      technologies: ['Python', 'Machine Learning', 'Data Analysis', 'Prediction', 'Streamlit', 'Pandas'],
      description:
        'An ML-based food demand prediction system designed to estimate item-level daily demand and help reduce food preparation waste in institutional dining halls and canteens.',
      problem:
        'Institutional food preparation relies heavily on manual guesswork, causing up to 35% daily food wastage on low-turnout days or sudden food shortages during unanticipated meal surges.',
      goal:
        'Provide canteen operations managers with reliable item-by-item daily ingredient forecasts 24 hours in advance to optimize purchasing and reduce waste.',
      solution:
        'Engineered an end-to-end machine learning pipeline that ingests historical transaction logs, seasonal semester calendars, and day-of-week variables to train multi-feature regression prediction models.',
      contribution:
        'Built the complete Python data processing pipeline, feature engineering modules, regression model evaluation metrics (94.2% R²), and interactive Streamlit manager dashboard.',
      architecture:
        'Data Ingestion (CSV/DB) → Cleaning & Aggregation (Pandas/NumPy) → Feature Extraction (Calendar/Seasonal/Weather) → Regression Predictor (Scikit-learn) → Real-Time Telemetry & Forecast Dashboard (Streamlit).',
      keyFeatures: [
        'Item-level demand forecasting for breakfast, lunch, and dinner shifts',
        'Automated 7-day trend rolling average and peak surge anomaly detection',
        'Interactive ingredient quantity calculation table for kitchen prep staff',
        'Cost impact & waste reduction metrics tracking (-34% estimated waste)',
      ],
      challenges:
        'Handling extreme variability in student attendance during exam periods and unexpected campus holidays required building custom temporal lag features.',
      implementation:
        'Implemented with Scikit-learn regression models, Pandas time-series aggregations, and a modular Streamlit UI containerized for lightweight deployment.',
      result:
        'Delivered an actionable forecasting engine that gives canteen supervisors high-confidence meal prep targets, estimating up to 34% reduction in surplus food waste.',
      learnings:
        'Gained deep experience in real-world time-series data noise, feature importance ranking, and designing intuitive data products for non-technical kitchen managers.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0',
      videoTitle: 'Smart Canteen AI — Machine Learning Demand Forecast Demo',
      videoDescription: 'Demonstration of daily food consumption forecasting, model feature importance, and interactive Streamlit manager dashboard.',
      liveUrl: null,
      githubUrl: 'https://github.com/blessingbrysonhongpmk',
      isFlagship: true,
      color: '#10B981',
    },
    {
      id: 'devi-devan-industries',
      name: 'DEVI DEVAN INDUSTRIES',
      tagline: 'Production commercial fabrication & enterprise client platform',
      oneLiner: 'End-to-end commercial website built and deployed for a live manufacturing client.',
      year: '2026',
      category: 'Client Production',
      status: 'Live',
      statusLabel: 'Production Client Website',
      role: 'Sole Full-Stack Developer & UI Designer',
      technologies: ['React', 'Vite', 'CSS Modules', 'JavaScript', 'Responsive UI'],
      description:
        'A comprehensive professional digital presence designed, developed, and deployed for Devi Devan Industries, a heavy industrial steel and metal fabrication enterprise.',
      problem:
        'The client had zero digital visibility, relying exclusively on word-of-mouth inquiries and struggling to communicate custom industrial fabrication specifications and lead times to new enterprise buyers.',
      goal:
        'Create a modern, high-performance web hub that presents custom industrial fabrication capabilities, automates customer quotation inquiries, and establishes commercial credibility.',
      solution:
        'Designed a high-contrast industrial aesthetic and engineered a fast, responsive React application deployed via Vite with interactive specification catalogs and direct quotation inquiry capture.',
      contribution:
        'Handled 100% of the project lifecycle: stakeholder discovery, UI/UX design, modular React component architecture, responsive mobile optimization, custom CSS styling, and live cloud deployment.',
      architecture:
        'Modular Component Hierarchy (React 19) → Build & Asset Optimization (Vite) → Responsive Design System (CSS Custom Properties) → Production CDN Hosting with SSL.',
      keyFeatures: [
        'Interactive fabrication services showcase (CNC cutting, structural steel, custom tanks)',
        'Built-in commercial project inquiry form with client contact routing',
        'High-contrast industrial design language tailored to engineering clients',
        'Sub-second initial page load across 3G mobile networks via asset optimization',
      ],
      challenges:
        'Translating complex physical fabrication measurements and industrial certifications into clean, easily digestible web layouts suitable for both engineers and procurement officers.',
      implementation:
        'Built using pure modular CSS and lightweight React hooks with zero heavy runtime dependencies, achieving 98+ Google Lighthouse performance scores.',
      result:
        'Shipped on schedule to live production at devidevanindustries.com, serving as the client’s official commercial touchpoint and actively generating new inbound project requests.',
      learnings:
        'Learned end-to-end client communication, requirement scoping, managing commercial deadlines, and engineering production software for real-world business stakeholders.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0',
      videoTitle: 'Devi Devan Industries — Production Client Website Showcase',
      videoDescription: 'Full visual walkthrough of client branding, industrial cost calculation engines, responsive mobile UI, and enquiry flows.',
      liveUrl: 'https://devidevanindustries.com',
      githubUrl: null,
      isFlagship: true,
      color: '#E11D48',
    },
    {
      id: 'aluminium-fabrication',
      name: 'ALUMINIUM FABRICATION PORTAL',
      tagline: 'Architectural window & facade configurator catalog',
      oneLiner: 'Commercial web configurator with Django REST API backend catalog integration.',
      year: '2026',
      category: 'Web Development',
      status: 'Live',
      statusLabel: 'Commercial Web Project',
      role: 'Frontend Architect & API Integration',
      technologies: ['React', 'Vite', 'Django', 'REST API', 'CSS Grid'],
      description:
        'A commercial web application for an architectural aluminium fabrication firm, pairing an interactive React product configurator with a Django REST API backend.',
      problem:
        'Presenting dozens of complex architectural profiles, double-glazing options, and thermal-break window systems made customer self-service quote requests nearly impossible.',
      goal:
        'Empower architects, contractors, and homeowners to explore custom sizing, profile styles, and glazing options with real-time specification readouts.',
      solution:
        'Constructed a dynamic product catalog interface consuming REST API endpoints to serve specifications, material options, and dimension-based quotation estimates.',
      contribution:
        'Architected the responsive React user interface, developed dynamic schematic wireframe preview components, and integrated asynchronous REST API endpoints for product data.',
      architecture:
        'Django REST API Backend (Models & Serializers) ↔ Asynchronous Fetch Layer ↔ State Management (React) ↔ Dynamic Blueprint Schematic Renderer.',
      keyFeatures: [
        'Dynamic architectural window & facade assembly configurator',
        'Real-time dimension calculation readout (width, height, profile, glazing)',
        'RESTful category browsing and instant search filtering',
        'Mobile-optimized quotation submission modal with inquiry tracking',
      ],
      challenges:
        'Synchronizing complex multi-variant pricing dependencies (profile thickness × glass tier × area) without slowing down the client-side UI.',
      implementation:
        'Used declarative state machines in React to drive the dynamic schematic canvas while keeping API payload size under 15KB per catalog query.',
      result:
        'Successfully deployed to production, providing prospective clients with an intuitive digital showroom for architectural window and door solutions.',
      learnings:
        'Deepened expertise in decoupled frontend-backend architectures, REST API contract design, and building engaging product configurators.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0',
      videoTitle: 'Aluminium Fabrication Portal — Product Configurator Demo',
      videoDescription: 'Live architectural window configurator demo showcasing automated price estimation and REST API catalog consumption.',
      liveUrl: 'https://alumunium-fabrication-company.vercel.app/',
      githubUrl: null,
      isFlagship: false,
      color: '#0284C7',
    },
    {
      id: 'campus-safety-ai',
      name: 'CAMPUS SAFETY AI',
      tagline: 'Real-time computer vision automated hazard detection',
      oneLiner: 'Computer vision prototype exploring frame-by-frame campus hazard identification.',
      year: '2026',
      category: 'AI Research Prototype',
      status: 'Prototype',
      statusLabel: 'AI Research Prototype',
      role: 'AI Model & Video Stream Collaborator',
      technologies: ['Python', 'Computer Vision', 'PyTorch', 'OpenCV', 'AI Inference'],
      description:
        'A computer vision research prototype exploring automated security camera video analysis to identify safety incidents such as unauthorized perimeter breach or fire hazards on campus.',
      problem:
        'Campus surveillance networks monitor dozens of simultaneous camera feeds, making continuous human visual monitoring exhausting and prone to delayed incident response.',
      goal:
        'Demonstrate an automated video stream analysis prototype capable of flagging bounding-box anomalies and generating instant visual alerts.',
      solution:
        'Engineered an OpenCV and PyTorch inference pipeline running frame sampling to classify designated danger zones and render real-time bounding box telemetry.',
      contribution:
        'Co-developed the frame downsampling scripts, anomaly detection confidence thresholds, and HUD-style telemetry visualization.',
      architecture:
        'RTSP Camera Stream → Frame Downsampling (OpenCV) → Neural Model Inference (PyTorch) → Telemetry Overlay Engine (HUD / FPS Monitor) → Notification Trigger.',
      keyFeatures: [
        'Sub-50ms inference latency per sampled video frame (30 FPS target)',
        'Real-time HUD telemetry readout with confidence score overlays',
        'Multi-region safety zone partitioning (Authorized vs. Restricted)',
        'Automated alert logging with timestamped frame captures',
      ],
      challenges:
        'Maintaining acceptable inference frame rates on non-GPU edge environments while minimizing false positives caused by shifting shadows and rain.',
      implementation:
        'Implemented lightweight convolutional models with optimized frame skipping heuristics to run smoothly on standard compute hardware.',
      result:
        'Produced a successful proof-of-concept prototype presented in departmental research reviews, validating automated visual safety monitoring.',
      learnings:
        'Strengthened practical understanding of computer vision pipelines, frame rate optimization, edge compute tradeoffs, and real-time inference latency.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0',
      videoTitle: 'Campus Safety AI — Computer Vision Hazard Detection Feed',
      videoDescription: 'Video stream simulation showcasing automated frame sampling, anomaly detection bounding boxes, and instant alert system.',
      liveUrl: null,
      githubUrl: null,
      isFlagship: false,
      color: '#8B5CF6',
    },
  ],

  // ── Chronological Journey ─────────────────────────
  journey: [
    {
      year: '2024',
      milestone: 'B.Tech AI & Data Science Inception',
      tag: 'Academic Foundation',
      summary: 'Commenced undergraduate engineering degree at Panimalar Engineering College.',
      details:
        'Established core engineering disciplines in data structures, algorithms, calculus, object-oriented principles, and Python scripting.',
      keyHighlights: ['University academic honors', 'Core computer science fundamentals', 'Python programming mastery'],
    },
    {
      year: '2025',
      milestone: 'Data Science & Full-Stack Internships',
      tag: 'Industry Experience',
      summary: 'Completed industry training with Pantech Solutions and Corizo.',
      details:
        'Applied machine learning pipelines, regression models, SQL database querying, and modern React frontend architectures to real datasets.',
      keyHighlights: ['Pantech Solutions Data Science Internship', 'Corizo Full Stack Development Internship', 'Production exploratory data analysis'],
    },
    {
      year: '2026',
      milestone: 'Enterprise Client Delivery & Systems',
      tag: 'Production Delivery',
      summary: 'Shipped commercial web platform for Devi Devan Industries and developed Smart Canteen AI.',
      details:
        'Delivered production engineering software for real clients while advancing into demand prediction modeling and computer vision prototypes.',
      keyHighlights: ['Shipped live devidevanindustries.com', 'Engineered Smart Canteen demand forecaster', 'Architectural portal configurator deployment'],
    },
    {
      year: '2026+',
      milestone: 'Advancing Toward AI Engineering',
      tag: 'Next Horizon',
      summary: 'Targeting graduate software engineering and AI systems engineering roles.',
      details:
        'Expanding into deep learning model deployment, autonomous agent workflows, distributed cloud architectures, and scalable full-stack products.',
      keyHighlights: ['Production model serving', 'Cloud microservices', 'Open-source engineering contributions'],
      isNext: true,
    },
  ],

  // ── Formal Experience (Strictly Two Internships) ──
  experience: [
    {
      id: 'pantech-internship',
      company: 'Pantech Solutions',
      role: 'Data Science Intern',
      period: '2025',
      location: 'Chennai, India',
      description:
        'Engineered data analysis workflows, exploratory metrics, and predictive modeling prototypes across structured datasets using Python and Scikit-learn.',
      highlights: [
        'Processed tabular business datasets using Pandas and NumPy for missing value imputation and feature scaling',
        'Implemented supervised regression models to predict outcome trends with documented evaluation metrics',
        'Constructed interactive data visualizations and distribution charts using Matplotlib',
      ],
    },
    {
      id: 'corizo-internship',
      company: 'Corizo',
      role: 'Full Stack Development Intern',
      period: '2025',
      location: 'Remote, India',
      description:
        'Developed responsive web interfaces, reusable component libraries, and backend API integration workflows in collaborative agile sprints.',
      highlights: [
        'Built modern single-page application interfaces using React, JavaScript, and modular CSS architecture',
        'Consumed RESTful API endpoints and implemented state management patterns for asynchronous data synchronization',
        'Practiced version control workflows with Git and GitHub within collaborative team environments',
      ],
    },
  ],

  // ── Academic Credentials ──────────────────────────
  education: [
    {
      degree: 'B.Tech — Artificial Intelligence & Data Science',
      institution: 'Panimalar Engineering College',
      period: '2023 — 2027',
      status: 'Currently in III Year',
      focus: 'Machine Learning, Data Engineering, Algorithms, Database Systems, Computer Networks, Full Stack Engineering.',
    },
  ],

  // ── Key Achievements & Competitions ───────────────
  achievements: [
    {
      title: 'Commercial Enterprise Client Delivery',
      category: 'Client Production',
      year: '2026',
      result: '100% Deployed & Live',
      description:
        'Sole engineer and designer for Devi Devan Industries (devidevanindustries.com), establishing client digital branding and automated project quotation workflows.',
    },
    {
      title: 'Technical Symposium & Paper Presentations',
      category: 'Research & Presentations',
      year: '2025',
      result: 'Finalist / Presenter',
      description:
        'Presented research and technical findings on machine learning demand prediction, automated decision systems, and full-stack web architectures at collegiate symposiums.',
    },
    {
      title: 'Applied AI & ML Prototype Development',
      category: 'Engineering Prototypes',
      year: '2026',
      result: 'Completed Working Proof-of-Concepts',
      description:
        'Engineered Smart Canteen AI (food demand forecasting with 94.2% R² accuracy) and Campus Safety AI (real-time computer vision hazard detection overlay).',
    },
    {
      title: 'Dual Industry Engineering Internships',
      category: 'Industry Credentials',
      year: '2025',
      result: 'Certified Completion',
      description:
        'Completed rigorous industry internships in Data Science (Pantech Solutions) and Full Stack Web Development (Corizo).',
    },
  ],
};

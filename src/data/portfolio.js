// ─────────────────────────────────────────────────────
// BBH Portfolio — Structured Data
// Official Full Name: P M K BLESSING BRYSON HONG
// ─────────────────────────────────────────────────────

export const PORTFOLIO_DATA = {
  // ── Identity ──────────────────────────────────────
  profile: {
    name: 'P M K BLESSING BRYSON HONG',
    brand: 'BBH',
    role: 'AI & Data Science Engineering Student',
    avatar: '/profile.jpeg',
    heroStatement:
      'I learn by building — moving from data and software into intelligent systems.',
    shortBio:
      'Second-year Artificial Intelligence & Data Science engineering student building practical experience across data science, full-stack development, and emerging AI systems.',
    currentDirection:
      'Building toward AI Engineering while strengthening the foundations in machine learning, software engineering, and intelligent systems.',
    email: 'blessingbrysonhongpmk@gmail.com',
    availability: 'Open to internships, freelance opportunities, and technical collaborations.',
  },

  // ── Social Links ──────────────────────────────────
  socials: [
    { platform: 'GitHub', url: 'https://github.com/blessingbrysonhongpmk', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/blessing-bryson-hong-p-m-k-2b908b386', icon: 'linkedin' },
    { platform: 'Instagram', url: 'https://www.instagram.com/itz_bless_00x', icon: 'instagram' },
    { platform: 'Facebook', url: 'https://www.facebook.com/share/199ps3WZw3/', icon: 'facebook' },
    { platform: 'Discord', url: 'https://discord.gg/twV4jA2f', icon: 'message-circle' },
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
      category: 'PROGRAMMING',
      skills: [
        { name: 'Python', status: 'Working Knowledge', description: 'Scripting, data wrangling, ML concepts' },
        { name: 'Java', status: 'Working Knowledge', description: 'Core OOP, data structures' },
        { name: 'C#', status: 'Exploring', description: 'Syntax fundamentals' },
        { name: 'JavaScript', status: 'Working Knowledge', description: 'ES6+, async/await, DOM' },
        { name: 'HTML & CSS', status: 'Comfortable', description: 'Semantic markup, responsive layouts' },
      ],
    },
    {
      category: 'WEB DEVELOPMENT',
      skills: [
        { name: 'React', status: 'Working Knowledge', description: 'Component architecture, state, Vite' },
        { name: 'Vite', status: 'Comfortable', description: 'Fast build tooling & ESM development' },
        { name: 'Django', status: 'Working Knowledge', description: 'Backend models, views, REST patterns' },
        { name: 'REST Concepts', status: 'Working Knowledge', description: 'API consumption & design' },
      ],
    },
    {
      category: 'DATA & AI',
      skills: [
        { name: 'Pandas & NumPy', status: 'Working Knowledge', description: 'Data cleaning, tabular manipulation' },
        { name: 'Matplotlib', status: 'Working Knowledge', description: 'Data visualization & plotting' },
        { name: 'Scikit-learn', status: 'Exploring', description: 'Supervised ML algorithms' },
        { name: 'Machine Learning', status: 'Exploring', description: 'Demand prediction & model evaluation' },
        { name: 'Data Analysis', status: 'Working Knowledge', description: 'Exploratory data analysis & insights' },
      ],
    },
    {
      category: 'TOOLS & ENVIRONMENTS',
      skills: [
        { name: 'Git & GitHub', status: 'Comfortable', description: 'Version control & repository management' },
        { name: 'VS Code', status: 'Comfortable', description: 'Primary IDE & extensions' },
        { name: 'Jupyter & Colab', status: 'Working Knowledge', description: 'Interactive notebooks & GPU acceleration' },
        { name: 'Streamlit', status: 'Working Knowledge', description: 'Data app prototyping' },
      ],
    },
  ],

  // ── Projects (Work) ───────────────────────────────
  projects: [
    {
      id: 'smart-canteen-ai',
      name: 'SMART CANTEEN AI',
      category: 'Data Science / Machine Learning',
      status: 'Complete',
      statusLabel: 'Data Science Project',
      role: 'Data Science / ML Project',
      technologies: ['Python', 'Machine Learning', 'Data Analysis', 'Prediction', 'Streamlit'],
      description:
        'An ML-based food demand prediction system designed to estimate item-level daily demand and help reduce food preparation waste in canteens.',
      problem: 'Food preparation in institutional canteens relies heavily on guesswork, causing substantial daily food wastage or sudden shortages.',
      approach: 'Analyzed historical transaction data, seasonal demand spikes, and day-of-week patterns to train regression prediction models.',
      contribution: 'Built the complete Python data processing pipeline and interactive Streamlit decision dashboard.',
      result: 'Provides canteen managers with actionable daily ingredient quantity forecasts to minimize food waste.',
      liveUrl: null,
      githubUrl: 'https://github.com/blessingbrysonhongpmk',
      isFlagship: true,
      color: '#22C55E',
    },
    {
      id: 'devi-devan-industries',
      name: 'DEVI DEVAN INDUSTRIES',
      category: 'Client Web Project',
      status: 'Live',
      statusLabel: 'Client Website',
      role: 'Full-Stack Web Development / Client Project',
      technologies: ['React', 'Vite', 'CSS', 'JavaScript'],
      description:
        'A complete professional website designed and built for a real client, featuring custom branding, responsive service sections, and performant web architecture.',
      problem: 'The client needed a modern online presence to showcase custom industrial fabrication capabilities and acquire customer leads.',
      approach: 'Designed a dark, industrial visual language and built a fast modular React application deployed via Vite.',
      contribution: 'Handled 100% of the visual design, frontend component development, responsive optimization, and deployment.',
      result: 'Delivered an online business hub driving client visibility and customer inquiries.',
      liveUrl: 'https://devidevanindustries.com',
      githubUrl: null,
      isFlagship: true,
      color: '#DC143C',
    },
    {
      id: 'aluminium-fabrication',
      name: 'ALUMINIUM FABRICATION PORTAL',
      category: 'Web Development Project',
      status: 'Live',
      statusLabel: 'Commercial Web Project',
      role: 'Frontend Developer',
      technologies: ['React', 'Vite', 'Django', 'REST API'],
      description:
        'Commercial web application for an aluminium fabrication business built with React on the frontend and Django REST framework on the backend.',
      problem: 'Displaying complex product lines and custom sizing quotes in a intuitive web interface.',
      approach: 'Built a responsive React catalog UI consuming Django REST API endpoints for product categories.',
      contribution: 'Developed frontend product components, inquiry forms, and API integration.',
      result: 'Delivered a web catalog showcasing fabrication offerings with responsive navigation.',
      liveUrl: 'https://alumunium-fabrication-company.vercel.app/',
      githubUrl: null,
      isFlagship: false,
      color: '#3B82F6',
    },
    {
      id: 'campus-safety-ai',
      name: 'CAMPUS SAFETY AI',
      category: 'AI Prototype',
      status: 'Prototype',
      statusLabel: 'AI Research Prototype',
      role: 'Collaborator',
      technologies: ['Python', 'Computer Vision', 'AI'],
      description:
        'A computer vision prototype exploring camera-based video analysis to detect hazard events like fire or unauthorized entry on campus grounds.',
      problem: 'Manual security monitoring across vast campus areas can miss rapid hazard developments.',
      approach: 'Explored frame-by-frame anomaly detection scripts using computer vision model architectures.',
      contribution: 'Co-developed frame sampling algorithms and alert visual overlays.',
      result: 'Functional proof-of-concept demonstrating real-time visual alert flags.',
      liveUrl: null,
      githubUrl: null,
      isFlagship: false,
      color: '#A855F7',
    },
  ],

  projectCategories: ['All', 'Data Science / Machine Learning', 'Client Web Project', 'Web Development Project', 'AI Prototype'],

  // ── Experience (STRICTLY TWO INTERNSHIPS ONLY) ────
  experience: [
    {
      id: 'ak-info-park',
      company: 'AK INFO PARK',
      role: 'Data Science Intern',
      period: '2025',
      location: 'India',
      description:
        'Worked on a Data Science internship and developed the Smart Canteen food demand prediction project using Python and machine learning concepts.',
      highlights: [
        'Analyzed item-level daily consumption datasets using Pandas and Python.',
        'Built predictive demand models to help reduce canteen food preparation waste.',
        'Gained practical experience with data analysis and machine learning workflows.',
      ],
    },
    {
      id: 'agile-infotechytern',
      company: 'AGILE INFOTECHYTERN SOLUTIONS LLP',
      role: 'Python Full Stack Development Intern',
      period: '2026',
      location: 'India',
      description:
        'Worked on Python full-stack development, gaining practical experience with frontend development, backend integration, and real-world web application development.',
      highlights: [
        'Developed dynamic frontend interfaces using React and Vite.',
        'Learned backend integration and API connectivity using Python and Django.',
        'Participated in real-world application building and code reviews.',
      ],
    },
  ],

  // ── Principles (Compact 6 Core Rules) ────────────
  principles: [
    { number: '01', title: 'Curiosity', description: 'Question before assuming.' },
    { number: '02', title: 'Building', description: 'Learn through implementation.' },
    { number: '03', title: 'Discipline', description: 'Consistency beats intensity.' },
    { number: '04', title: 'Adaptability', description: 'Technology changes. Learning continues.' },
    { number: '05', title: 'Ownership', description: 'Take responsibility for the result.' },
    { number: '06', title: 'Improvement', description: 'Every project exposes something new to learn.' },
  ],

  // ── Interests (Outside the Code) ─────────────────
  interests: [
    {
      id: 'chess',
      name: 'Chess',
      icon: 'crown',
      description: 'Thinking several moves ahead, solving patterns, and enjoying strategic focus.',
    },
    {
      id: 'dance',
      name: 'Dance',
      icon: 'music',
      description: 'A creative way of expressing energy, rhythm, and focus away from the screen.',
    },
    {
      id: 'singing',
      name: 'Singing',
      icon: 'mic',
      description: 'Music keeps me connected to expression, emotion, and discipline.',
    },
    {
      id: 'books',
      name: 'Books',
      icon: 'book-open',
      description: 'Exploring ideas, technical literature, and perspectives that challenge my thinking.',
    },
    {
      id: 'bible-reading',
      name: 'Reflection',
      icon: 'book',
      description: 'A source of discipline, wisdom, and core personal perspective.',
    },
    {
      id: 'web-series',
      name: 'Stories & Media',
      icon: 'tv',
      description: 'Engaging narratives and cinematography that spark fresh creative ideas.',
    },
    {
      id: 'hackathons',
      name: 'Hackathons',
      icon: 'trophy',
      description: 'Building under pressure, rapid prototyping, and solving problems with teams.',
    },
    {
      id: 'hobby-projects',
      name: 'Hobby Experiments',
      icon: 'code',
      description: 'Small technical builds created simply because an idea was fun to explore.',
    },
    {
      id: 'learning',
      name: 'Continuous Learning',
      icon: 'lightbulb',
      description: 'The core habit behind everything — constantly picking up new technical skills.',
    },
  ],

  // ── Education ─────────────────────────────────────
  education: [
    {
      degree: 'B.Tech in Artificial Intelligence & Data Science',
      institution: 'Higher Education Institution',
      period: '2024 – 2028',
      status: 'Current — 2nd Year',
    },
    {
      degree: 'Higher Secondary Schooling',
      institution: 'John Paul II Matric Higher Secondary School, Kulashekaram',
      period: 'Completed 2024',
      status: 'Completed',
    },
  ],

  // ── Journey Timeline ──────────────────────────────
  journey: [
    {
      year: '2024',
      milestone: 'Engineering Begins',
      tag: 'EDUCATION',
      summary: 'Started B.Tech in Artificial Intelligence & Data Science.',
      details: 'Laid the core academic foundations in mathematics, programming, and computer science principles.',
    },
    {
      year: '2025',
      milestone: 'First Data Science Internship',
      tag: 'INTERNSHIP',
      summary: 'Completed data science internship at AK Info Park.',
      details: 'Built the Smart Canteen demand prediction project using Python, Pandas, and machine learning models.',
    },
    {
      year: '2025',
      milestone: 'Hackathon Exploration',
      tag: 'HACKATHONS',
      summary: 'Participated in multiple hackathons from first year onward.',
      details: 'Focused on rapid prototyping, presenting ideas, team collaboration, and real-time problem solving.',
    },
    {
      year: '2026',
      milestone: 'Full Stack Development',
      tag: 'INTERNSHIP',
      summary: 'Joined Agile Infotechytern Solutions LLP.',
      details: 'Gained practical Python full-stack development experience with frontend components, backend logic, and REST APIs.',
    },
    {
      year: '2026',
      milestone: 'Client Project',
      tag: 'CLIENT WORK',
      summary: 'Engineered and shipped Devidevan Industries.',
      details: 'Designed and deployed a production client website from scratch using React, Vite, and modern CSS.',
    },
    {
      year: '2026',
      milestone: 'AI Exploration',
      tag: 'LEARNING',
      summary: 'Deepening machine learning and AI system knowledge.',
      details: 'Exploring model architectures, computer vision prototypes, and intelligent web integrations.',
    },
    {
      year: 'NEXT',
      isNext: true,
      milestone: 'AI ENGINEERING',
      tag: 'FUTURE DIRECTION',
      summary: 'Building toward full AI Engineering capability.',
      details: 'Strengthening foundations in Machine Learning, AI systems, Software Engineering, Generative AI, and Computer Vision.',
    },
  ],

  // ── SEO / Meta ────────────────────────────────────
  meta: {
    title: 'P M K BLESSING BRYSON HONG | AI & Data Science',
    description:
      'Portfolio of P M K Blessing Bryson Hong, an Artificial Intelligence and Data Science engineering student building projects across data science, full-stack development, and AI.',
    url: 'https://blessingbrysonhong.vercel.app',
    image: '/profile.jpeg',
  },
};

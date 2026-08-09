// ─────────────────────────────────────────────────────
// BBH Portfolio — Structured Data
// All personal content lives here for easy updates.
// Placeholders are marked with TODO comments.
// ─────────────────────────────────────────────────────

export const PORTFOLIO_DATA = {
  // ── Identity ──────────────────────────────────────
  profile: {
    name: 'P M K Blessing Bryson Hong',
    brand: 'BBH',
    role: 'Engineering Student · Building towards AI',
    avatar: '/profile.jpeg',
    heroStatement:
      'I explore how machines learn and turn ideas into meaningful real-world projects.\nNot there yet — but every build takes me closer.',
    shortBio:
      'Second-year AI & Data Science student who would rather ship a rough prototype than theorise about a perfect one. Currently somewhere between understanding backpropagation and deploying real-world client websites.',
    email: 'blessingbrysonhongpmk@gmail.com',
    availability: 'Open to internships, freelance opportunities and collaborations.',
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

  // ── Skills (proof-based) ──────────────────────────
  skills: [
    {
      name: 'Python',
      status: 'practical',
      usedIn: ['Smart Canteen AI'],
      description: 'Data processing, scripting, ML pipelines',
    },
    {
      name: 'React',
      status: 'practical',
      usedIn: ['DEVI DEVAN Industries', 'Aluminium Fabrication', 'PLANIX'],
      description: 'Component architecture, state management, SPA development',
    },
    {
      name: 'Vite',
      status: 'practical',
      usedIn: ['DEVI DEVAN Industries', 'Aluminium Fabrication', 'This Portfolio'],
      description: 'Build tooling, development server, production bundling',
    },
    {
      name: 'JavaScript',
      status: 'practical',
      usedIn: ['DEVI DEVAN Industries', 'Aluminium Fabrication'],
      description: 'DOM manipulation, ES6+, async patterns',
    },
    {
      name: 'HTML & CSS',
      status: 'practical',
      usedIn: ['DEVI DEVAN Industries', 'Aluminium Fabrication', 'This Portfolio'],
      description: 'Semantic markup, responsive layouts, CSS custom properties',
    },
    {
      name: 'Git & GitHub',
      status: 'practical',
      usedIn: ['All projects'],
      description: 'Version control, collaboration, open-source workflows',
    },
    {
      name: 'Django',
      status: 'practical',
      usedIn: ['Aluminium Fabrication'],
      description: 'Backend basics, models, views, REST patterns',
    },
    {
      name: 'Data Science',
      status: 'practical',
      usedIn: ['Smart Canteen AI'],
      description: 'Pandas, data wrangling, statistical analysis',
    },
    {
      name: 'Machine Learning',
      status: 'learning',
      usedIn: ['Smart Canteen AI'],
      description: 'Currently exploring supervised learning, demand prediction',
    },
    {
      name: 'Streamlit',
      status: 'practical',
      usedIn: ['Smart Canteen AI'],
      description: 'Rapid prototyping of data applications',
    },
  ],

  // ── Projects ──────────────────────────────────────
  projects: [
    {
      id: 'devi-devan-industries',
      name: 'DEVI DEVAN INDUSTRIES',
      category: 'Client',
      status: 'Live',
      statusLabel: 'Real-world Client Website',
      role: 'Full website — design, frontend, development',
      technologies: ['React', 'Vite', 'CSS'],
      description:
        'Designed and built a complete professional website for a real client from the ground up. Handled the entire process — visual design, component architecture, responsive implementation, and deployment.',
      liveUrl: 'https://devidevanindustries.com',
      githubUrl: null,
      isFlagship: true,
      color: '#DC143C',
    },
    {
      id: 'aluminium-fabrication',
      name: 'ALUMINIUM FABRICATION',
      category: 'Internship',
      status: 'Live',
      statusLabel: 'Internship / Real-world project',
      role: 'Frontend Developer',
      technologies: ['React', 'Vite', 'Django'],
      description:
        'Built a commercial website for an aluminium fabrication company during an internship. Gained practical experience with full-stack patterns using Django on the backend.',
      liveUrl: 'https://alumunium-fabrication-company.vercel.app/',
      githubUrl: null,
      isFlagship: false,
      color: '#3B82F6',
    },
    {
      id: 'smart-canteen-ai',
      name: 'SMART CANTEEN AI',
      category: 'Data Science',
      status: 'Complete',
      statusLabel: 'Data Science / ML project',
      role: 'Developer',
      technologies: ['Python', 'Streamlit', 'Pandas', 'Machine Learning'],
      description:
        'Predicts item-level daily demand for a canteen and determines preparation quantities to reduce food waste. An intelligent decision system built with real data processing.',
      liveUrl: null,
      githubUrl: null, // TODO: Add GitHub repository URL
      isFlagship: false,
      color: '#22C55E',
    },
    {
      id: 'planix',
      name: 'PLANIX',
      category: 'Hobby',
      status: 'Building',
      statusLabel: 'Under Development',
      role: 'Developer',
      technologies: ['React', 'AI Integration (Planned)'],
      description:
        'An AI-powered planning tool being actively developed. AI model integration is planned — the project is a work in progress, not a finished product.',
      liveUrl: null,
      githubUrl: null, // TODO: Add GitHub repository URL
      isFlagship: false,
      color: '#DC143C',
    },
    {
      id: 'campus-safety-ai',
      name: 'CAMPUS SAFETY AI',
      category: 'Prototype',
      status: 'Prototype',
      statusLabel: 'Under Development / Prototype',
      role: 'Student Collaborator',
      technologies: ['AI', 'Computer Vision', 'Python'],
      description:
        'A prototype exploring camera-based AI analysis for campus safety — detecting incidents like fire or dangerous situations. Built with a collaborator. Not a production system.',
      liveUrl: null,
      githubUrl: null, // TODO: Add GitHub repository URL
      isFlagship: false,
      color: '#3B82F6',
    },
  ],

  // ── Project categories for filtering ──────────────
  projectCategories: ['All', 'Client', 'Internship', 'Data Science', 'AI', 'Hobby', 'Prototype'],

  // ── Experience ────────────────────────────────────
  experience: [
    {
      company: 'Data Science Internship',
      location: null,
      role: 'Python + Data Science',
      type: 'Internship',
      period: '2025',
      description: 'Applied Data Science learning to food-demand prediction and waste reduction (Smart Canteen AI).',
    },
    {
      company: 'Agile Info Techytern Solutions',
      location: null,
      role: 'Full Stack Development',
      type: 'Learning / Internship Experience',
      period: '2026',
      description: 'Expanded from Data Science into practical web/full-stack development (React, Vite, Python, Django).',
    },
    {
      company: 'Devi Devan Industries',
      location: null,
      role: 'Real-World Client Project',
      type: 'Client Work',
      period: '2026',
      description: 'Design, frontend, and development for a real client using React + Vite.',
    },
  ],

  // ── Education ─────────────────────────────────────
  education: [
    {
      degree: 'B.Tech — Artificial Intelligence & Data Science',
      institution: 'TODO: College Name', // TODO: Add college name
      period: '2024–2028',
      status: 'current',
    },
    {
      degree: 'Higher Secondary',
      institution: 'John Paul II Matric Higher Secondary School, Kulashekaram',
      period: 'Completed 2024',
      status: 'completed',
    },
  ],

  // ── Hackathons ────────────────────────────────────
  hackathons: {
    philosophy: 'Participated in multiple hackathons from first year onward.',
    note: 'Build → Present → Learn → Return',
    entries: [],
  },

  // ── Certificates ──────────────────────────────────
  certificates: [],

  // ── Career Direction ──────────────────────────────
  careerDirection: {
    longTerm: 'AI Engineer',
    currentPhase: 'Exploring',
    statement:
      'Building towards AI engineering whilst researching where I fit best — whether that is generative AI, computer vision, or something I haven\'t discovered yet.',
  },

  // ── Currently Exploring ───────────────────────────
  exploring: [
    { name: 'Machine Learning', status: 'active' },
    { name: 'React Ecosystem', status: 'active' },
  ],

  // ── Next Build ────────────────────────────────────
  nextBuild: [
    { name: 'Advanced AI', status: 'researching' },
    { name: 'GenAI', status: 'researching' },
    { name: 'Computer Vision', status: 'researching' },
    { name: 'Advanced React Patterns', status: 'planned' },
  ],

  // ── Values ────────────────────────────────────────
  values: [
    {
      name: 'Wisdom',
      source: 'Inspired by the Bible and Thirukkural',
      description: 'Seeking understanding before action.',
    },
    {
      name: 'Discipline',
      source: null,
      description: 'Consistency over intensity.',
    },
    {
      name: 'Integrity',
      source: null,
      description: 'Building honestly — no inflated claims.',
    },
    {
      name: 'Learning',
      source: null,
      description: 'Every project is an education.',
    },
    {
      name: 'Purposeful Creation',
      source: null,
      description: 'Technology should solve real problems.',
    },
    {
      name: 'Responsibility',
      source: null,
      description: 'Own the outcome, not just the code.',
    },
  ],

  // ── Interests (Outside the Code) ─────────────────
  interests: [
    {
      id: 'chess',
      name: 'Chess',
      icon: 'crown',
      description: 'Thinking several moves ahead, solving patterns and enjoying the quiet pressure of the board.',
    },
    {
      id: 'dance',
      name: 'Dance',
      icon: 'music',
      description: 'A different way of expressing energy, rhythm and creativity away from the screen.',
    },
    {
      id: 'singing',
      name: 'Singing',
      icon: 'mic',
      description: 'Music keeps me connected to expression, emotion and a different kind of focus.',
    },
    {
      id: 'books',
      name: 'Books',
      icon: 'book-open',
      description: 'Exploring ideas, stories and perspectives that challenge how I think.',
    },
    {
      id: 'bible-reading',
      name: 'Bible Reading',
      icon: 'book',
      description: 'A source of reflection, discipline, wisdom and perspective.',
    },
    {
      id: 'web-series',
      name: 'Web Series',
      icon: 'tv',
      description: 'Stories, characters and ideas that give me a break from building — and sometimes spark new ones.',
    },
    {
      id: 'hackathons',
      name: 'Hackathons',
      icon: 'trophy',
      description: 'Building under pressure, learning quickly, presenting ideas and returning with something better.',
    },
    {
      id: 'hobby-projects',
      name: 'Hobby Projects',
      icon: 'code',
      description: 'Small experiments built because an idea was interesting enough to try.',
    },
    {
      id: 'learning',
      name: 'Learning',
      icon: 'lightbulb',
      description: 'The habit behind everything else — continuously picking up something new.',
    },
  ],

  // ── Journey Timeline ──────────────────────────────
  // Interactive Milestones
  journey: [
    {
      year: '2024',
      subLabel: 'BEGINNING',
      title: 'Engineering Begins',
      description: 'Started B.Tech in Artificial Intelligence & Data Science. Building the foundation.',
      icon: 'graduationCap',
      tag: 'Education',
    },
    {
      year: '2024 – 2025',
      subLabel: 'FIRST YEAR',
      title: 'Hackathons & Exploration',
      description: 'Participated in multiple hackathons and technical events from the first year itself.',
      tech: 'Explore → Participate → Build → Present → Learn',
      icon: 'trophy',
      tag: 'Experience',
    },
    {
      year: '2025',
      subLabel: '3RD SEM COMPLETED',
      title: 'Data Science Internship',
      description: 'Joined as a Data Science intern. Worked with Python, data analysis and machine learning concepts.',
      icon: 'barChart',
      tag: 'Internship',
    },
    {
      year: '2025',
      subLabel: 'PROJECT',
      title: 'Smart Canteen AI',
      description: 'Applied data science to predict daily food demand and reduce waste using ML.',
      icon: 'database',
      tag: 'Project',
    },
    {
      year: '2026',
      subLabel: '4TH SEM COMPLETED',
      title: 'Full Stack Development',
      description: 'Joined Agile Info Techytern Solutions to learn Python Full Stack Development.',
      icon: 'code',
      tag: 'Internship',
    },
    {
      year: '2026',
      subLabel: 'REAL-WORLD WORK',
      title: 'Devi Devan Industries',
      description: 'Got the opportunity to work on a real-world client project. Designed and developed the website using React & Vite.',
      icon: 'globe',
      tag: 'Client Project',
    },
    {
      year: '2026',
      subLabel: 'CURRENTLY',
      title: 'AI / ML Learning',
      description: 'Diving deeper into Artificial Intelligence, Machine Learning, and building intelligent systems.',
      icon: 'brain',
      tag: 'Learning',
    },
    {
      year: '2026',
      subLabel: 'IN PROGRESS',
      title: 'Campus Safety AI',
      description: 'Building a prototype for camera-based AI analysis to detect safety incidents on campus.',
      icon: 'shield',
      tag: 'Prototype',
    },
    {
      year: '2026', // To keep alignment, but the icon is arrow-up. Wait, the prompt says "NEXT" instead of year
      isNext: true,
      title: 'NEXT STOP: AI ENGINEER',
      description: 'Building towards AI Engineering.',
      icon: 'arrowUp',
    },
  ],

  // ── GitHub ────────────────────────────────────────
  github: {
    username: 'blessingbrysonhongpmk',
    profileUrl: 'https://github.com/blessingbrysonhongpmk',
  },

  // ── SEO / Meta ────────────────────────────────────
  meta: {
    title: 'BBH — Blessing Bryson Hong P M K',
    description:
      'Engineering student building real projects in AI, data science, and web development. View live client work, prototypes, and experiments.',
    url: 'https://blessingbrysonhong.vercel.app',
    image: '/og-image.png',
  },
};

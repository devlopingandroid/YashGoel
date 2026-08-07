export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  greeting: string;
  tagline: string;
  avatarUrl: string;
  resumeUrl: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
}

export interface StatItem {
  id: string;
  number: string;
  label: string;
  iconName: string;
}

export interface NavLink {
  label: string;
  href: string;
  sectionId: string;
}

export interface SkillItem {
  name: string;
  iconKey: string;
  color?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  logoUrl?: string;
  period: string;
  location: string;
  current?: boolean;
  bullets: string[];
  technologies: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-infosys",
    role: "Software Engineering Intern",
    company: "Infosys Springboard",
    logoUrl: "/logos/infosys.png",
    period: "2024 - Present",
    location: "Remote / Virtual",
    current: true,
    bullets: [
      "Completed intensive hands-on internship in full-stack software development, cloud computing, and enterprise application architecture.",
      "Engineered scalable web applications using Java, React, and RESTful web microservices following clean code design patterns.",
      "Collaborated on team capstone projects implementing automated testing pipelines, Git workflows, and CI/CD deployment."
    ],
    technologies: ["Java", "React", "Node.js", "REST APIs", "SQL", "Git"],
  },
  {
    id: "exp-drdo",
    role: "Research Intern",
    company: "DRDO SSPL",
    logoUrl: "/logos/drdo.png",
    period: "2023 - 2024",
    location: "Delhi, India",
    current: false,
    bullets: [
      "Conducted advanced research on image signal processing and computer vision algorithms for solid-state applications.",
      "Developed high-throughput data processing modules using Python, OpenCV, and NumPy.",
      "Optimized computational performance for real-time sensor data analysis alongside senior research scientists."
    ],
    technologies: ["Python", "OpenCV", "NumPy", "C++", "Signal Processing"],
  },
  {
    id: "exp-iiitd",
    role: "Research Intern",
    company: "IIIT Delhi",
    logoUrl: "/logos/iiitd.png",
    period: "2023",
    location: "New Delhi, India",
    current: false,
    bullets: [
      "Researched deep learning architectures and graph neural networks for complex dataset analysis.",
      "Engineered automated model training and validation pipelines using PyTorch and Scikit-Learn.",
      "Presented benchmarking analysis and experimental results at departmental technical seminars."
    ],
    technologies: ["PyTorch", "Deep Learning", "Python", "Data Analysis", "Scikit-Learn"],
  },
];

export interface CaseStudyStat {
  label: string;
  value: string;
}

export interface ProjectCaseStudy {
  tags: string[];
  overview: {
    description: string;
    techIcons: string[];
    stats: CaseStudyStat[];
    mockupImage: string;
    floatingCards: { title: string; value: string; icon: string }[];
  };
  problem: {
    statement: string;
    targetAudience: string;
    points: string[];
  };
  techStack: {
    category: string;
    technologies: string[];
    details: string;
  }[];
  architecture: {
    summary: string;
    highlights: string[];
  };
  features: {
    title: string;
    description: string;
  }[];
  screenshots: {
    title: string;
    caption: string;
    image: string;
  }[];
  challenges: {
    challenge: string;
    solution: string;
  }[];
  futureScope: string[];
}

export interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  fullDescription?: string;
  techBadges: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  caseStudy?: ProjectCaseStudy;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  logo?: string;
  year: string;
  category: "Internships" | "Hackathons" | "Courses" | "Workshops" | "Others";
  image: string;
  credentialUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  iconName: string;
  isHero?: boolean;
  description?: string;
}

export interface HackathonItem {
  id: string;
  name: string;
  photo: string;
  result: string;
  year: string;
  projectTitle?: string;
  description?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Certificates" | "Internship" | "Hackathons" | "Travel" | "Campus" | "Events" | "Others" | "Work";
  image: string;
  caption: string;
  spanClass?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  date: string;
  readTime: string;
  slug: string;
  url: string;
  tags?: string[];
}

export interface TraitItem {
  id: string;
  label: string;
  iconName: string;
}

export interface AboutStat {
  id: string;
  number: string;
  label: string;
  isHighlight?: boolean;
  iconName?: string;
}

export interface JourneyMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

export const aboutData = {
  heading: "Who am I?",
  paragraphs: [
    "I am a passionate Software Engineer dedicated to crafting modern web applications, scalable cloud backend systems, and solving complex algorithmic challenges. With a deep curiosity for emerging technologies, I thrive at the intersection of design, code, and user experience.",
    "My journey spans across software internships, high-impact hackathons, and technical projects. I enjoy turning complex problem statements into clean, maintainable, and visually captivating digital products."
  ],
  traits: [
    { id: "trait-1", label: "Problem Solver", iconName: "Brain" },
    { id: "trait-2", label: "Quick Learner", iconName: "Zap" },
    { id: "trait-3", label: "Team Player", iconName: "Users" },
    { id: "trait-4", label: "Tech Enthusiast", iconName: "Compass" }
  ] as TraitItem[],
  stats: [
    { id: "astat-1", number: "2+", label: "Years Experience" },
    { id: "astat-2", number: "10+", label: "Technologies" },
    { id: "astat-3", number: "20+", label: "Hackathons" },
    { id: "astat-4", number: "∞", label: "Curiosity", isHighlight: true, iconName: "Infinity" }
  ] as AboutStat[],
  journey: [
    { id: "j1", year: "2021", title: "First Line of Code", description: "Started learning C++ and DSA." },
    { id: "j2", year: "2022", title: "Full-Stack Web Dev", description: "Mastered React, Node.js & databases." },
    { id: "j3", year: "2023", title: "Hackathons & Internships", description: "Won competitions & software internships." },
    { id: "j4", year: "2024", title: "Advanced Systems", description: "Building AI apps & scalable architecture." }
  ] as JourneyMilestone[]
};

export const footerData = {
  taglines: [
    "Building products.",
    "Solving problems.",
    "Growing every day."
  ],
  columns: [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Experience", href: "#experience" },
        { label: "Projects", href: "#projects" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Achievements", href: "#achievements" },
        { label: "Gallery", href: "#gallery" },
        { label: "Blogs", href: "#blogs" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Contact", href: "#contact" },
        { label: "GitHub", href: "https://github.com" },
        { label: "LinkedIn", href: "https://linkedin.com" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Use", href: "#" },
      ],
    },
  ],
  copyright: "© 2026 Yash Goel. All rights reserved.",
  builtWith: "Designed & Built with ❤️ using Next.js & Tailwind CSS",
};

export const resumeData = {
  atsScore: 96,
  statusLabel: "Excellent",
  checklist: [
    { label: "Format & Structure", passed: true, score: "100%" },
    { label: "Content Quality & Impact", passed: true, score: "95%" },
    { label: "Technical Skills Match", passed: true, score: "98%" },
    { label: "Readability & Parsing", passed: true, score: "96%" },
    { label: "Industry Keywords Optimization", passed: true, score: "92%" },
  ],
  downloadUrl: "/resume.pdf",
};

export const personalInfo: PersonalInfo = {
  name: "Yash Goel",
  firstName: "Yash",
  lastName: "Goel",
  role: "Software Engineer",
  greeting: "Hi, I'm",
  tagline: "Passionate about building scalable web applications, sleek user experiences, and high-performance algorithms.",
  avatarUrl: "/profile.png",
  resumeUrl: "#resume",
  email: "yashgoel.dev@gmail.com",
  phone: "+91 98765 43210",
  location: "Delhi, India",
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
};

export const heroStats: StatItem[] = [
  { id: "stat-1", number: "3", label: "Internships", iconName: "Briefcase" },
  { id: "stat-2", number: "150+", label: "DSA Problems", iconName: "Cpu" },
  { id: "stat-3", number: "3", label: "Patents", iconName: "Award" },
];

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home", sectionId: "home" },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Skills", href: "#skills", sectionId: "skills" },
  { label: "Experience", href: "#experience", sectionId: "experience" },
  { label: "Projects", href: "#projects", sectionId: "projects" },
  { label: "Achievements", href: "#achievements", sectionId: "achievements" },
  { label: "Gallery", href: "#gallery", sectionId: "gallery" },
  { label: "Blogs", href: "#blogs", sectionId: "blogs" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

export interface SkillItem {
  name: string;
  iconKey: string;
  color?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: SkillItem[];
}

export const skillCategoriesData: SkillCategory[] = [
  {
    id: "frontend",
    category: "Frontend",
    skills: [
      { name: "React", iconKey: "SiReact", color: "#61DAFB" },
      { name: "Next.js", iconKey: "SiNextdotjs", color: "#FFFFFF" },
      { name: "Tailwind", iconKey: "SiTailwindcss", color: "#06B6D4" },
      { name: "Redux", iconKey: "SiRedux", color: "#764ABC" },
      { name: "JavaScript", iconKey: "SiJavascript", color: "#F7DF1E" },
      { name: "HTML", iconKey: "SiHtml5", color: "#E34F26" },
      { name: "CSS", iconKey: "SiCss3", color: "#1572B6" },
    ],
  },
  {
    id: "backend",
    category: "Backend",
    skills: [
      { name: "Node.js", iconKey: "SiNodedotjs", color: "#5FA04E" },
      { name: "Express.js", iconKey: "SiExpress", color: "#E0E0E0" },
      { name: "MongoDB", iconKey: "SiMongodb", color: "#47A248" },
      { name: "Java", iconKey: "FaJava", color: "#5382A1" },
      { name: "Python", iconKey: "SiPython", color: "#3776AB" },
      { name: "REST APIs", iconKey: "TbApi", color: "#14E8C4" },
    ],
  },
  {
    id: "tools",
    category: "Tools & Others",
    skills: [
      { name: "Git", iconKey: "SiGit", color: "#F05032" },
      { name: "Docker", iconKey: "SiDocker", color: "#2496ED" },
      { name: "Linux", iconKey: "SiLinux", color: "#FCC624" },
      { name: "Postman", iconKey: "SiPostman", color: "#FF6C37" },
      { name: "VS Code", iconKey: "SiVisualstudiocode", color: "#007ACC" },
      { name: "Figma", iconKey: "SiFigma", color: "#F24E1E" },
    ],
  },
  {
    id: "aiml",
    category: "AI / ML",
    skills: [
      { name: "Python", iconKey: "SiPython", color: "#3776AB" },
      { name: "TensorFlow", iconKey: "SiTensorflow", color: "#FF6F00" },
      { name: "OpenCV", iconKey: "SiOpencv", color: "#5C3EE8" },
      { name: "YOLO", iconKey: "SiPyTorch", color: "#EE4C2C" },
      { name: "Pandas", iconKey: "SiPandas", color: "#150458" },
      { name: "NumPy", iconKey: "SiNumpy", color: "#013243" },
    ],
  },
  {
    id: "cloud",
    category: "Cloud / DevOps",
    skills: [
      { name: "AWS", iconKey: "SiAmazonaws", color: "#FF9900" },
      { name: "Firebase", iconKey: "SiFirebase", color: "#DD2C00" },
      { name: "Vercel", iconKey: "SiVercel", color: "#FFFFFF" },
      { name: "Render", iconKey: "SiRender", color: "#46E3B7" },
      { name: "CI/CD", iconKey: "SiGithubactions", color: "#2088FF" },
      { name: "Nginx", iconKey: "SiNginx", color: "#009639" },
    ],
  },
];

export const currentlyExploringData: string[] = [
  "System Design & Distributed Systems",
  "Kubernetes & Container Orchestration",
  "LangChain & AI Agent Frameworks",
  "Generative AI & LLM Fine-Tuning",
  "WebAssembly & High-Performance Web",
];

export const techILoveData = {
  quote: "Crafting clean abstractions, intuitive interfaces, and scalable infrastructure.",
  description: "I am passionate about building sleek user experiences, high-performance web systems, and elegant developer tools. Blending algorithmic efficiency with pixel-perfect design is what drives my daily workflow.",
};



export const projectsData: Project[] = [
  {
    id: "proj-budget-eagle",
    title: "Budget Eagle",
    tag: "Full Stack",
    description: "An AI-powered financial management and budget tracking application with automated expense categorization.",
    techBadges: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    image: "/projects/budget-eagle.jpg",
    githubUrl: "https://github.com/budgeteagle/budget_eagle_web",
    liveUrl: "https://budgeteagle.in/",
    featured: true,
    caseStudy: {
      tags: ["Finance", "Full Stack", "AI"],
      overview: {
        description: "Budget Eagle is an intelligent financial management platform designed to eliminate manual expense logging. It uses machine learning models to automatically parse receipt data, categorize daily spending, track monthly budgets in real time, and deliver actionable financial health recommendations.",
        techIcons: ["SiReact", "SiNodedotjs", "SiMongodb", "SiExpress", "SiTailwindcss"],
        stats: [
          { label: "Active Users", value: "100+" },
          { label: "Transactions Processed", value: "10K+" },
          { label: "System Uptime", value: "99.9%" },
          { label: "Core Features", value: "15+" },
        ],
        mockupImage: "/projects/budget-eagle-dashboard.jpg",
        floatingCards: [
          { title: "Monthly Savings", value: "+$1,240", icon: "TrendingUp" },
          { title: "Budget Health", value: "84%", icon: "ShieldCheck" },
        ],
      },
      problem: {
        statement: "Manual expense tracking is tedious, error-prone, and lacks real-time actionable insights for individuals attempting to achieve financial discipline.",
        targetAudience: "Students, freelancers, and professionals seeking effortless personal finance tracking.",
        points: [
          "Time-consuming manual entry of monthly receipts and credit card statements.",
          "Absence of proactive overspending alerts before category limits are breached.",
          "Fragmented visualization across multiple financial accounts."
        ],
      },
      techStack: [
        {
          category: "Frontend Layer",
          technologies: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
          details: "Single page app built with dark mode UI tokens, interactive cash flow charts, and instant filter controls.",
        },
        {
          category: "Backend Microservices",
          technologies: ["Node.js", "Express", "JWT", "REST APIs"],
          details: "Stateless REST API handling transaction ingestion, token encryption, and session auth.",
        },
        {
          category: "Database & Caching",
          technologies: ["MongoDB", "Mongoose", "Redis"],
          details: "Document schema indexing with Redis caching layer reducing database queries by 60%.",
        },
        {
          category: "AI & Categorization",
          technologies: ["Python", "TensorFlow", "Scikit-Learn"],
          details: "Machine learning classifier for automated merchant tagging and receipt text parsing.",
        },
      ],
      architecture: {
        summary: "Event-driven architecture separating authentication, transaction ingestion, and machine learning categorization microservices.",
        highlights: [
          "Stateless Express gateway routing encrypted API payloads.",
          "Asynchronous worker queues for ML model inference.",
          "Redis caching layer providing sub-50ms API response times."
        ],
      },
      features: [
        {
          title: "Automated Expense Categorization",
          description: "Smart ML models parse raw merchant strings and auto-assign spending categories.",
        },
        {
          title: "Real-Time Financial Dashboard",
          description: "Interactive visual breakdown of monthly spending limits, cash flow trends, and budget health.",
        },
        {
          title: "Proactive Overspend Alerts",
          description: "Automated warning triggers when approaching 80% and 100% of custom budget thresholds.",
        },
        {
          title: "PDF & CSV Summary Exports",
          description: "One-click export of monthly financial reports for tax preparation and auditing.",
        },
      ],
      screenshots: [
        {
          title: "Interactive Analytics Dashboard",
          caption: "Main overview showing monthly cash flow and expense distribution.",
          image: "/projects/budget-eagle-screen1.jpg",
        },
        {
          title: "AI Receipt Scanner",
          caption: "Receipt upload interface with automated key-value extraction.",
          image: "/projects/budget-eagle-screen2.jpg",
        },
      ],
      challenges: [
        {
          challenge: "Handling noisy and non-standardized merchant names from bank CSV exports.",
          solution: "Trained a Fuzzy String Matching & Naive Bayes classification model in Python achieving 94% categorization precision.",
        },
        {
          challenge: "Maintaining smooth 60fps chart rendering during fast date range filtering.",
          solution: "Implemented React memoization, memoized selectors, and debounced window event listeners.",
        },
      ],
      futureScope: [
        "Native Mobile application built with React Native.",
        "Multi-currency auto-conversion using live exchange rate APIs.",
        "AI Conversational Financial Coach powered by LLM agents."
      ],
    },
  },
  {
    id: "proj-streamify",
    title: "Streamify",
    tag: "Web Application",
    description: "High-performance video streaming platform featuring real-time chat, adaptive bitrate, and custom video analytics.",
    techBadges: ["Next.js", "TypeScript", "Tailwind", "WebSockets", "AWS S3"],
    image: "/projects/streamify.jpg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "proj-pulsedrive",
    title: "PulseDrive",
    tag: "IoT + AI",
    description: "Smart vehicle telemetry and diagnostic monitoring system providing real-time sensor analytics and collision detection.",
    techBadges: ["Python", "TensorFlow", "FastAPI", "React", "Docker"],
    image: "/projects/pulsedrive.jpg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
];

export const certificatesData: Certificate[] = [
  {
    id: "cert-google-cloud",
    title: "Google Cloud Computing Foundations",
    issuer: "Google Cloud",
    logo: "/logos/google.png",
    year: "2024",
    category: "Courses",
    image: "/certificates/google-cloud.jpg",
    credentialUrl: "https://credential.example.com",
  },
  {
    id: "cert-drdo",
    title: "Research Internship Excellence",
    issuer: "DRDO SSPL",
    logo: "/logos/drdo.png",
    year: "2024",
    category: "Internships",
    image: "/certificates/drdo-internship.jpg",
    credentialUrl: "https://credential.example.com",
  },
  {
    id: "cert-hackathon-1st",
    title: "Global AI Hackathon Winner",
    issuer: "Major League Hacking",
    logo: "/logos/mlh.png",
    year: "2023",
    category: "Hackathons",
    image: "/certificates/hackathon-winner.jpg",
    credentialUrl: "https://credential.example.com",
  },
  {
    id: "cert-meta-react",
    title: "Meta Front-End Developer Specialization",
    issuer: "Meta",
    logo: "/logos/meta.png",
    year: "2023",
    category: "Courses",
    image: "/certificates/meta-react.jpg",
    credentialUrl: "https://credential.example.com",
  },
  {
    id: "cert-ai-workshop",
    title: "Generative AI & LLM Architecture",
    issuer: "NVIDIA Deep Learning Institute",
    logo: "/logos/nvidia.png",
    year: "2024",
    category: "Workshops",
    image: "/certificates/nvidia-ai.jpg",
    credentialUrl: "https://credential.example.com",
  },
  {
    id: "cert-dsa-leetcode",
    title: "Advanced Data Structures & Algorithms",
    issuer: "LeetCode & Codeforces",
    logo: "/logos/leetcode.png",
    year: "2023",
    category: "Others",
    image: "/certificates/leetcode-dsa.jpg",
    credentialUrl: "https://credential.example.com",
  },
];

export const achievementsData: Achievement[] = [
  {
    id: "ach-gemini",
    title: "Google Gemini Student Ambassador",
    subtitle: "Google AI",
    year: "2026",
    iconName: "Sparkles",
    isHero: true,
    description: "Selected as campus AI ambassador representing Google Gemini tools, workshops, and developer events.",
  },
  {
    id: "ach-patents",
    title: "Published Technical Patents",
    subtitle: "Intellectual Property India",
    year: "2024",
    iconName: "ShieldCheck",
    description: "Authored 3 registered patents in smart systems and algorithmic optimization.",
  },
  {
    id: "ach-ideathon",
    title: "Top 100 College Youth Ideathon",
    subtitle: "IIIT Delhi 2024",
    year: "2024",
    iconName: "Trophy",
    description: "Ranked among top 100 innovative tech ideas out of thousands of national entries.",
  },
  {
    id: "ach-drdo",
    title: "DRDO Research Fellow",
    subtitle: "Solid State Physics Laboratory 2025",
    year: "2025",
    iconName: "Award",
    description: "Recognized for research contributions in computer vision & signal processing.",
  },
  {
    id: "ach-sih",
    title: "Smart India Hackathon Finalist",
    subtitle: "Ministry of Education 2023",
    year: "2023",
    iconName: "Medal",
    description: "National finalist developing automated IoT telemetry and diagnostic solutions.",
  },
];

export const hackathonsData: HackathonItem[] = [
  {
    id: "hack-qualcomm",
    name: "Qualcomm Hackathon",
    photo: "/hackathons/qualcomm.jpg",
    result: "Runner Up",
    year: "2024",
    projectTitle: "AI On-Device Diagnostic Agent",
    description: "Built an edge-AI real-time audio and video anomaly detection system running locally on Qualcomm Snapdragon NPU.",
  },
  {
    id: "hack-sih",
    name: "Smart India Hackathon",
    photo: "/hackathons/sih.jpg",
    result: "Finalist",
    year: "2023",
    projectTitle: "Smart Agriculture & Telemetry",
    description: "Developed IoT sensor gateway with cloud analytics for soil health monitoring.",
  },
  {
    id: "hack-iitd",
    name: "IIT Delhi Hackathon",
    photo: "/hackathons/iitd.jpg",
    result: "Top 100",
    year: "2024",
    projectTitle: "Autonomous Drone Pathfinding",
    description: "Created real-time spatial mapping and collision avoidance algorithms.",
  },
  {
    id: "hack-others",
    name: "Other Hackathons",
    photo: "/hackathons/others.jpg",
    result: "Multiple",
    year: "2022-24",
    projectTitle: "Various Projects",
    description: "Participated in 20+ national and open-source hackathons solving real-world challenges.",
  },
];

export const galleryData: GalleryItem[] = [
  {
    id: "gal-cert-1",
    title: "Google Cloud Foundations",
    category: "Certificates",
    image: "/certificates/google-cloud.jpg",
    caption: "Google Cloud Computing Foundations Certification.",
    spanClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: "gal-cert-2",
    title: "Meta Front-End Specialization",
    category: "Certificates",
    image: "/certificates/meta-react.jpg",
    caption: "Meta Front-End Developer Specialization Certificate.",
    spanClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: "gal-cert-3",
    title: "NVIDIA Generative AI",
    category: "Certificates",
    image: "/certificates/nvidia-ai.jpg",
    caption: "Generative AI & LLM Architecture Workshop Certificate.",
    spanClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: "gal-intern-1",
    title: "DRDO Research Internship Excellence",
    category: "Internship",
    image: "/certificates/drdo-internship.jpg",
    caption: "Research Internship Certificate at DRDO Solid State Physics Laboratory.",
    spanClass: "md:col-span-2 md:row-span-1",
  },
  {
    id: "gal-intern-2",
    title: "DRDO Research Lab Work",
    category: "Internship",
    image: "/gallery/drdo-lab.jpg",
    caption: "Working on computer vision signal analysis inside the research facility.",
    spanClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: "gal-1",
    title: "Hackathon Demo Day",
    category: "Hackathons",
    image: "/gallery/hackathon-demo.jpg",
    caption: "Presenting our final prototype on stage at the national hackathon finals.",
    spanClass: "md:col-span-2 md:row-span-2",
  },
  {
    id: "gal-hack-2",
    title: "Global AI Hackathon Winner",
    category: "Hackathons",
    image: "/certificates/hackathon-winner.jpg",
    caption: "1st Place Winner Certificate at Global AI Hackathon.",
    spanClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: "gal-2",
    title: "Google AI Ambassador Summit",
    category: "Events",
    image: "/gallery/google-summit.jpg",
    caption: "Connecting with fellow developer leads at the regional ambassador summit.",
    spanClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: "gal-3",
    title: "Campus Tech Workshop",
    category: "Campus",
    image: "/gallery/campus-workshop.jpg",
    caption: "Conducting a hands-on Next.js & AI workshop for 150+ students.",
    spanClass: "md:col-span-1 md:row-span-2",
  },
  {
    id: "gal-5",
    title: "IIIT Delhi Ideathon Pitch",
    category: "Events",
    image: "/gallery/iiitd-pitch.jpg",
    caption: "Pitching our AI platform at the IIIT Delhi youth ideathon.",
    spanClass: "md:col-span-2 md:row-span-1",
  },
  {
    id: "gal-6",
    title: "Tech Conference Travel",
    category: "Travel",
    image: "/gallery/tech-travel.jpg",
    caption: "Exploring local sights during the annual developer conference trip.",
    spanClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: "gal-7",
    title: "Open Source Hack Night",
    category: "Others",
    image: "/gallery/hack-night.jpg",
    caption: "Late night coding session building open source developer tools.",
    spanClass: "md:col-span-1 md:row-span-1",
  },
];

export const blogsData: BlogPost[] = [
  {
    id: "blog-budget-eagle",
    title: "How I Built Budget Eagle: An AI Finance Platform",
    excerpt: "Architecting a full-stack financial application with automated ML expense categorization, Express REST gateways, and Redis caching.",
    coverImage: "/blogs/budget-eagle-cover.jpg",
    date: "August 2024",
    readTime: "6 min read",
    slug: "how-i-built-budget-eagle",
    url: "https://budgeteagle.in/",
    tags: ["Full Stack", "AI", "Node.js"],
  },
  {
    id: "blog-mern-practices",
    title: "MERN Stack Best Practices for Scalable Web Apps",
    excerpt: "Proven architecture patterns for organizing Express backend routes, MongoDB Mongoose models, and React state management cleanly.",
    coverImage: "/blogs/mern-practices.jpg",
    date: "July 2024",
    readTime: "8 min read",
    slug: "mern-stack-best-practices",
    url: "https://dev.to",
    tags: ["React", "Express", "MongoDB"],
  },
  {
    id: "blog-derq-stack",
    title: "DERQ Stack: Building Next-Gen Distributed Architectures",
    excerpt: "Exploring modern full-stack web foundations blending Docker, Express, React, and GraphQL for enterprise software scalability.",
    coverImage: "/blogs/derq-stack.jpg",
    date: "June 2024",
    readTime: "7 min read",
    slug: "derq-stack-best-foundation",
    url: "https://hashnode.com",
    tags: ["Architecture", "Docker", "React"],
  },
  {
    id: "blog-dsa-roadmap",
    title: "DSA Roadmap for Cracking Top Engineering Internships",
    excerpt: "A comprehensive step-by-step preparation guide covering essential patterns in graphs, dynamic programming, and binary search trees.",
    coverImage: "/blogs/dsa-roadmap.jpg",
    date: "May 2024",
    readTime: "10 min read",
    slug: "dsa-roadmap-for-internships",
    url: "https://medium.com",
    tags: ["Algorithms", "Career", "DSA"],
  },
];

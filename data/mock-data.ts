import {
  User,
  SocialLink,
  TechStack,
  Skill,
  Project,
  Experience,
  Education,
  Certificate,
  Memory,
  PortfolioSettings,
  NavigationItem,
} from "@/types";

// Mock User Data
export const mockUser: User = {
  id: "user-1",
  name: "Vo Dinh Quan",
  email: "vodinhquan2707.it@gmail.com",
  avatar: "/GEEK.jpg",
  title: "TypeScript Developer",
  location: "Ho Chi Minh City, Vietnam",
  bio: "Final-year Information Systems student passionate about modern web development in the JavaScript and TypeScript ecosystem. Experienced in building full-stack applications with Next.js, Nest.js, and familiar with Agile project management. I strive to build applications that are high-performing, secure, well-structured, and deliver an excellent user experience",
  cvUrl: "/resume.pdf",
  isActive: true,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: new Date().toISOString(),
};

// Mock Social Links
export const mockSocialLinks: SocialLink[] = [
  {
    id: "social-1",
    platform: "linkedin",
    url: "https://www.linkedin.com/in/vodinhquan27/",
    username: "vodinhquan27",
    isVisible: true,
    order: 1,
  },
  {
    id: "social-2",
    platform: "github",
    url: "https://github.com/Quan-Vo-Dinh",
    username: "Quan-Vo-Dinh",
    isVisible: true,
    order: 2,
  },
  {
    id: "social-3",
    platform: "other",
    url: "#",
    username: "portfolio",
    isVisible: true,
    order: 3,
  },
];

// Mock Tech Stack
export const mockTechStack: TechStack[] = [
  // JavaScript/TypeScript Ecosystem - Core Languages
  {
    id: "tech-1",
    name: "TypeScript",
    category: "frontend",
    iconName: "SiTypescript",
    proficiencyLevel: 4,
    isVisible: true,
    order: 1,
  },
  {
    id: "tech-2",
    name: "HTML5/CSS3",
    category: "frontend",
    iconName: "FaHtml5",
    proficiencyLevel: 5,
    isVisible: true,
    order: 2,
  },

  // JavaScript/TypeScript Ecosystem - Frontend Frameworks
  {
    id: "tech-3",
    name: "ReactJS",
    category: "frontend",
    iconName: "FaReact",
    proficiencyLevel: 5,
    isVisible: true,
    order: 3,
  },
  {
    id: "tech-4",
    name: "NextJS",
    category: "frontend",
    iconName: "SiNextdotjs",
    proficiencyLevel: 4,
    isVisible: true,
    order: 4,
  },

  // JavaScript/TypeScript Ecosystem - UI Libraries & State Management
  {
    id: "tech-5",
    name: "Tailwind CSS",
    category: "frontend",
    iconName: "SiTailwindcss",
    proficiencyLevel: 5,
    isVisible: true,
    order: 5,
  },
  {
    id: "tech-6",
    name: "Shadcn UI",
    category: "frontend",
    iconName: "SiShadcnui",
    proficiencyLevel: 4,
    isVisible: true,
    order: 6,
  },
  {
    id: "tech-7",
    name: "Ant Design",
    category: "frontend",
    iconName: "AiOutlineAntDesign",
    proficiencyLevel: 4,
    isVisible: true,
    order: 7,
  },
  {
    id: "tech-8",
    name: "TanStack Query",
    category: "frontend",
    iconName: "SiReactquery",
    proficiencyLevel: 4,
    isVisible: true,
    order: 8,
  },
  {
    id: "tech-9",
    name: "Zustand",
    category: "frontend",
    iconName: "SiNotion",
    proficiencyLevel: 4,
    isVisible: true,
    order: 9,
  },

  // JavaScript/TypeScript Ecosystem - Backend
  {
    id: "tech-10",
    name: "NodeJS",
    category: "backend",
    iconName: "FaNode",
    proficiencyLevel: 4,
    isVisible: true,
    order: 10,
  },
  {
    id: "tech-11",
    name: "NestJS",
    category: "backend",
    iconName: "SiNestjs",
    proficiencyLevel: 4,
    isVisible: true,
    order: 11,
  },
  {
    id: "tech-12",
    name: "Socket.io",
    category: "backend",
    iconName: "SiSocketdotio",
    proficiencyLevel: 3,
    isVisible: true,
    order: 12,
  },

  // Databases
  {
    id: "tech-13",
    name: "PostgreSQL",
    category: "database",
    iconName: "SiPostgresql",
    proficiencyLevel: 4,
    isVisible: true,
    order: 13,
  },
  {
    id: "tech-14",
    name: "MongoDB",
    category: "database",
    iconName: "SiMongodb",
    proficiencyLevel: 3,
    isVisible: true,
    order: 14,
  },
  {
    id: "tech-15",
    name: "SQL Server",
    category: "database",
    iconName: "DiMsqlServer",
    proficiencyLevel: 3,
    isVisible: true,
    order: 15,
  },
  {
    id: "tech-16",
    name: "Oracle",
    category: "database",
    iconName: "SiOracle",
    proficiencyLevel: 2,
    isVisible: true,
    order: 16,
  },

  // DevOps & Tools
  {
    id: "tech-17",
    name: "Docker",
    category: "devops",
    iconName: "FaDocker",
    proficiencyLevel: 3,
    isVisible: true,
    order: 17,
  },
  {
    id: "tech-18",
    name: "Linux",
    category: "devops",
    iconName: "FaLinux",
    proficiencyLevel: 3,
    isVisible: true,
    order: 18,
  },
  {
    id: "tech-19",
    name: "Git",
    category: "devops",
    iconName: "FaGitAlt",
    proficiencyLevel: 4,
    isVisible: true,
    order: 19,
  },

  // API & Development Tools
  {
    id: "tech-22",
    name: "Swagger",
    category: "backend",
    iconName: "SiSwagger",
    proficiencyLevel: 3,
    isVisible: true,
    order: 22,
  },
  {
    id: "tech-23",
    name: "Postman",
    category: "devops",
    iconName: "SiPostman",
    proficiencyLevel: 4,
    isVisible: true,
    order: 23,
  },

  // Design Tools
  {
    id: "tech-24",
    name: "Figma",
    category: "design",
    iconName: "FaFigma",
    proficiencyLevel: 4,
    isVisible: true,
    order: 24,
  },

  // Other Languages
  {
    id: "tech-25",
    name: "Java",
    category: "other",
    iconName: "FaJava",
    proficiencyLevel: 3,
    isVisible: true,
    order: 25,
  },
  {
    id: "tech-26",
    name: "C++",
    category: "other",
    iconName: "PiFileCppFill",
    proficiencyLevel: 3,
    isVisible: true,
    order: 26,
  },
];

// Mock Skills
export const mockSkills: Skill[] = [
  {
    id: "skill-1",
    title: "Skilled in software development processes with Agile expertise",
    category: "technical",
    proficiencyLevel: 4,
    isVisible: true,
    order: 1,
  },
  {
    id: "skill-2",
    title: "Strong teamwork and collaboration in diverse environments",
    category: "soft",
    proficiencyLevel: 5,
    isVisible: true,
    order: 2,
  },
  {
    id: "skill-3",
    title: "Eager to learn and adapt with a proactive approach",
    category: "soft",
    proficiencyLevel: 5,
    isVisible: true,
    order: 3,
  },
  {
    id: "skill-4",
    title: "Effective problem-solving and logical thinking for complex issues",
    category: "technical",
    proficiencyLevel: 4,
    isVisible: true,
    order: 4,
  },
  {
    id: "skill-5",
    title:
      "English: Capable of reading technical materials and engaging in basic communication",
    category: "language",
    proficiencyLevel: 3,
    isVisible: true,
    order: 5,
  },
  {
    id: "skill-6",
    title: "Mastery of Git for seamless team version control",
    category: "technical",
    proficiencyLevel: 4,
    isVisible: true,
    order: 6,
  },
  {
    id: "skill-7",
    title: "Familiar with DevOps practices (CI/CD pipelines)",
    category: "technical",
    proficiencyLevel: 3,
    isVisible: true,
    order: 7,
  },
  {
    id: "skill-8",
    title:
      "Strong attention to code quality and best practices (e.g., clean code)",
    category: "technical",
    proficiencyLevel: 4,
    isVisible: true,
    order: 8,
  },
  {
    id: "skill-9",
    title: "Experienced with database design and optimization (SQL/NoSQL)",
    category: "technical",
    proficiencyLevel: 3,
    isVisible: true,
    order: 9,
  },
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: "project-1",
    title: "QR Food Ordering",
    description:
      "A modern web platform streamlining in-restaurant dining experiences through QR-based ordering and smart restaurant management, built with Next.js 15, and Shadcn UI as its core frontend technologies. Designed and implemented core CRUD functionalities for managing QR-based food orders. Integrated a strict authentication flow using JWT with efficient token management, enabled real-time order processing via Socket.io, and enforced role-based access control through middleware and route handlers. Integrated Google Sign-In, applied SEO optimizations, and utilized Next.js parallel and intercepting routes to implement food item modals for improved UX/UI.",
    shortDescription: "Modern QR-based food ordering system for restaurants",
    technologies: [
      "TypeScript",
      "Next.js",
      "ShadCn UI",
      "Zustand",
      "TanStack Query",
      "SQLite",
      "Fastify",
      "Prisma",
      "JWT",
      "Socket.io",
    ],
    githubUrl: "https://github.com/Quan-Vo-Dinh/qr-ordering",
    liveUrl: "https://binrestaurant.io.vn",
    images: [
      {
        id: "img-1-1",
        url: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
        alt: "QR Food Ordering Interface",
        isPrimary: true,
        order: 1,
      },
    ],
    status: "completed",
    featured: true,
    startDate: "2024-06-01",
    endDate: "2024-12-01",
    teamSize: 4,
    myRole: "Frontend Developer",
    challenges:
      "Implementing real-time order processing with Socket.io and managing complex role-based access control",
    learnings:
      "Advanced Next.js 15 features, real-time communication, and authentication flows",
    isVisible: true,
    order: 1,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "project-2",
    title: "Multi Vendor API",
    description:
      "Backend for a full-featured multi-vendor e-commerce system built with Nest.js and PostgreSQL",
    shortDescription: "Full-featured multi-vendor e-commerce backend system",
    technologies: [
      "Nest.js",
      "PostgreSQL",
      "Prisma ORM",
      "Socket.io",
      "JWT",
      "Resend",
      "AWS S3",
      "Redis",
      "BullMQ",
      "Sepay",
    ],
    githubUrl: "https://github.com/Quan-Vo-Dinh/multi-vendor-api",
    liveUrl: "https://binrestaurant.io.vn",
    images: [
      {
        id: "img-2-1",
        url: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
        alt: "Multi Vendor API Architecture",
        isPrimary: true,
        order: 1,
      },
    ],
    status: "completed",
    featured: true,
    startDate: "2024-03-01",
    endDate: "2024-08-01",
    teamSize: 1,
    myRole: "Backend Developer",
    challenges:
      "Implementing complex RBAC system, 2FA authentication, and multi-language support",
    learnings:
      "Advanced Nest.js architecture, microservices patterns, and scalable database design",
    isVisible: true,
    order: 2,
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "project-3",
    title: "Kicks Shoes",
    description:
      "👟 Kicks is a sleek and modern e-commerce website built with React and Laravel, designed for showcasing and selling shoes.",
    technologies: ["JavaScript", "React", "Laravel", "MySQL"],
    githubUrl: "https://github.com/Quan-Vo-Dinh/kicks-shoes",
    liveUrl: "#",
    images: [
      {
        id: "img-3-1",
        url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
        alt: "Kicks Shoes Homepage",
        isPrimary: true,
        order: 1,
      },
    ],
    status: "completed",
    featured: true,
    startDate: "2023-09-01",
    endDate: "2024-01-01",
    teamSize: 1,
    myRole: "Full Stack Developer",
    challenges:
      "Building a complete e-commerce solution with React frontend and Laravel backend",
    learnings:
      "Full-stack development skills, e-commerce patterns, and React-Laravel integration",
    isVisible: true,
    order: 3,
    createdAt: "2023-09-01T00:00:00Z",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "project-4",
    title: "Car Garage Management",
    description:
      "Car Garage Management is the first personal project built entirely in Java and Java Swing. A desktop application for managing car garage operations including customer management, service tracking, and inventory management.",
    shortDescription: "Desktop car garage management system",
    technologies: ["Java", "Java Swing", "MySQL"],
    githubUrl: "https://github.com/Quan-Vo-Dinh/car-garage-management",
    liveUrl: "#",
    images: [
      {
        id: "img-4-1",
        url: "https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=800",
        alt: "Car Garage Management Interface",
        isPrimary: true,
        order: 1,
      },
    ],
    status: "completed",
    featured: false,
    startDate: "2023-03-01",
    endDate: "2023-06-01",
    teamSize: 1,
    myRole: "Full Stack Developer",
    challenges:
      "Learning Java Swing and implementing desktop application patterns",
    learnings: "Java desktop development, GUI design, and database integration",
    isVisible: true,
    order: 4,
    createdAt: "2023-03-01T00:00:00Z",
    updatedAt: new Date().toISOString(),
  },
];

// Mock Experiences
export const mockExperiences: Experience[] = [
  {
    id: "exp-1",
    company: "GEEK Up",
    position: "Product Frontend Intern",
    description:
      "Developed software products with real business needs, collaborating with the Backend and Design team.",
    responsibilities: [
      "Built modern web applications using React.js, Ant Design, Tailwind CSS, TanStack Query, and TypeScript",
      "Worked in an Agile environment, actively participating in sprint planning, task management, and daily stand-ups",
      "Collaborated effectively with team members using GitLab for source control",
      "Developed software products with real business needs in collaboration with Backend and Design teams",
    ],
    achievements: [
      "Successfully delivered multiple features in an Agile environment",
      "Improved development workflow through effective collaboration",
    ],
    technologies: [
      "React.js",
      "TypeScript",
      "Ant Design",
      "Tailwind CSS",
      "TanStack Query",
      "GitLab",
    ],
    type: "internship",
    location: "Ho Chi Minh City, Vietnam",
    locationType: "onsite",
    startDate: "2025-06-01",
    endDate: "2025-09-30",
    isCurrentJob: false,
    companyWebsite: "https://geekup.vn",
    isVisible: true,
    order: 1,
    createdAt: "2025-06-01T00:00:00Z",
    updatedAt: new Date().toISOString(),
  },
];

// Mock Education
export const mockEducation: Education[] = [
  {
    id: "edu-1",
    institution:
      "University of Information Technology - Vietnam National University, Ho Chi Minh City",
    degree: "Bachelor's Degree",
    field: "Information Systems",
    description:
      "Final-year student focusing on modern web development, software engineering, and system analysis.",
    gpa: 3.5,
    maxGpa: 4.0,
    activities: [
      "React Basics Certificate - Meta/Coursera",
      "Advanced React Certificate - Meta/Coursera (part of Meta Front-End Developer Certificate)",
      "Developing Back-End Apps with Node.js and Express - IBM/Coursera",
    ],
    certificates: [
      {
        id: "cert-1",
        title: "React Basics",
        provider: "Meta via Coursera",
        credentialId: "4K6UCWPPQMNB",
        credentialUrl:
          "https://www.coursera.org/account/accomplishments/verify/4K6UCWPPQMNB?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button",
        issueDate: "2024-12-01",
        skills: ["React", "JavaScript", "Frontend Development"],
      },
      {
        id: "cert-2",
        title: "Advanced React",
        provider: "Meta via Coursera",
        credentialId: "O51GAG0I7UKK",
        credentialUrl:
          "https://www.coursera.org/account/accomplishments/verify/O51GAG0I7UKK?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button",
        issueDate: "2024-12-01",
        skills: ["Advanced React", "React Hooks", "State Management"],
      },
      {
        id: "cert-3",
        title: "Developing Back-End Apps with Node.js and Express",
        provider: "IBM via Coursera",
        credentialId: "E6IGXUSD0IZH",
        credentialUrl:
          "https://www.coursera.org/account/accomplishments/verify/E6IGXUSD0IZH?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button",
        issueDate: "2024-11-01",
        skills: [
          "Node.js",
          "Express.js",
          "Backend Development",
          "API Development",
        ],
      },
    ],
    relevantCourses: [
      "Data Structures and Algorithms",
      "Web Development",
      "Database Management Systems",
      "Software Engineering",
      "Computer Networks",
      "Object-Oriented Programming",
    ],
    startDate: "2022-09-01",
    endDate: "2026-09-01",
    isCurrentStudy: true,
    location: "Ho Chi Minh City, Vietnam",
    institutionWebsite: "https://uit.edu.vn",
    isVisible: true,
    order: 1,
    createdAt: "2022-09-01T00:00:00Z",
    updatedAt: new Date().toISOString(),
  },
];

// Mock Memories
export const mockMemories: Memory[] = [
  {
    id: "memory-1",
    title: "First Internship Experience",
    description:
      "Started my first tech internship at a startup. Amazing learning experience working with experienced developers and contributing to real projects.",
    date: "2024-06-01",
    images: [
      {
        id: "mem-img-1",
        url: "https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=800",
        alt: "First day at internship",
        isPrimary: true,
        order: 1,
      },
    ],
    tags: ["internship", "career", "growth"],
    location: "Ho Chi Minh City, Vietnam",
    mood: "excited",
    isVisible: true,
    isFeatured: true,
    order: 1,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "memory-2",
    title: "Graduation from High School",
    description:
      "Graduated from high school with excellent grades and ready to pursue my dream in computer science.",
    date: "2022-06-15",
    images: [
      {
        id: "mem-img-2",
        url: "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=800",
        alt: "Graduation ceremony",
        isPrimary: true,
        order: 1,
      },
    ],
    tags: ["graduation", "achievement", "milestone"],
    location: "Vietnam",
    mood: "proud",
    isVisible: true,
    isFeatured: false,
    order: 2,
    createdAt: "2022-06-15T00:00:00Z",
    updatedAt: new Date().toISOString(),
  },
];

// Mock Settings
export const mockSettings: PortfolioSettings = {
  id: "settings-1",
  theme: "dark",
  primaryColor: "#ffffff",
  secondaryColor: "#f0f0f0",
  accentColor: "#3b82f6",
  showNavigation: true,
  showSidebar: true,
  enableAnimations: true,
  enableParticles: false,
  socialLinksPosition: "sidebar",
  seoTitle: "Võ Đình Quân - Fullstack TypeScript Developer",
  seoDescription:
    "Portfolio of Võ Đình Quân, a passionate Fullstack TypeScript Developer specializing in React, Next.js, and modern web technologies.",
  seoKeywords: [
    "typescript",
    "react",
    "nextjs",
    "fullstack",
    "developer",
    "portfolio",
  ],
  isMaintenanceMode: false,
  updatedAt: new Date().toISOString(),
};

// Mock Navigation
export const mockNavigation: NavigationItem[] = [
  {
    id: "nav-1",
    name: "About",
    slug: "about",
    isVisible: true,
    order: 1,
    isExternal: false,
  },
  {
    id: "nav-2",
    name: "Experience",
    slug: "experience",
    isVisible: true,
    order: 2,
    isExternal: false,
  },
  {
    id: "nav-3",
    name: "Education",
    slug: "education",
    isVisible: true,
    order: 3,
    isExternal: false,
  },
  {
    id: "nav-4",
    name: "Projects",
    slug: "projects",
    isVisible: true,
    order: 4,
    isExternal: false,
  },
  {
    id: "nav-5",
    name: "My Memories",
    slug: "memories",
    isVisible: true,
    order: 5,
    isExternal: false,
  },
];

// src/app/lib/projects.js
// Central project data — reused by the home Projects section, the /projects page, and dynamic project detail pages.

export const LIVE_DEMO_URL_PLACEHOLDER = "https://your-project-live-demo.com";

export const PROJECT_DATA = [
  {
    title: "Oracles Force",
    slug: "oracles-force",
    category: "React.js Stack",
    description:
      "Oracles Force is an IT company providing professional Web Development and WordPress solutions to help businesses build a strong online presence.",
    longDescription:
      "Oracles Force is a comprehensive corporate web platform built for a dynamic IT service provider. It features high-performance React.js architecture, interactive service showcases, case studies, responsive navigation, integrated Mapbox components, and streamlined contact workflows to drive high-converting B2B leads.",
    liveDemo: "https://oraclesforce.com/",
    github: "https://github.com/kashanali-dev/oracles-force",
    image: "/oracles.webp",
    technologies: ["React.js", "Context API", "Tailwind CSS", "Mapbox", "Node.js"],
    features: [
      "Dynamic service catalog with interactive pricing and inquiry modals",
      "Integrated Mapbox location services for office headquarters",
      "Optimized performance with lazy-loaded components and assets",
      "Fully responsive layout engineered with Tailwind CSS",
    ],
    challenge:
      "The client needed a lightning-fast, highly scalable web presence that could clearly communicate diverse IT services while maintaining top-tier Core Web Vitals scores.",
    solution:
      "Built a component-driven React application with robust state management, streamlined asset delivery, and modern CSS architecture for instant page transitions.",
  },
  {
    title: "Kofi Ofori-Mensah Portfolio",
    slug: "kofi-ofori-mensah-portfolio",
    category: "Frontend Core",
    description:
      "Kofi Ofori-Mensah works at the intersection of digital marketing, neurodiversity, and platform ethics.",
    longDescription:
      "A sophisticated personal branding and thought-leadership portfolio for Kofi Ofori-Mensah. Designed with meticulous attention to typography, colour theory, and accessibility standards, the platform showcases professional milestones, philosophical essays, interactive data charts, and publication archives.",
    liveDemo: "https://kofi-portfolio-lyart.vercel.app/",
    github: "https://github.com/kashanali-dev/Kofi-Portfolio",
    image: "/kofi.webp",
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Chart.js", "Zustand"],
    features: [
      "Strict TypeScript type safety for robust component props and state",
      "Interactive data visualizations powered by Chart.js",
      "Zustand state management for smooth interactive preferences",
      "Fully accessible WCAG-compliant markup and color contrast",
    ],
    challenge:
      "Balancing rich qualitative storytelling with quantitative data dashboards while maintaining an elegant, minimalist aesthetic.",
    solution:
      "Leveraged TypeScript and modular Tailwind design tokens to construct a modular, lightning-fast portfolio with seamless dark/light adaptation.",
  },
  {
    title: "TerraMore Paginas UE",
    slug: "terramore-paginas-ue",
    category: "Web Application",
    description:
      "A modern modular health analytics system featuring state retention orchestration, responsive fluid layout mechanics, and beautifully structured atomic UI design tokens.",
    longDescription:
      "TerraMore Paginas UE is an advanced web application designed for health analytics and data management. It orchestrates complex state retention across multi-step workflows, delivers responsive fluid layouts, and employs atomic UI design principles for unmatched maintainability and user experience.",
    liveDemo: "https://terramore-update.vercel.app/",
    github: "https://github.com/kashanali-dev/terramore-update",
    image: "/terramore.webp",
    technologies: ["React.js", "Framer Motion", "Tailwind CSS", "Firebase", "REST API"],
    features: [
      "Fluid state retention orchestration across analytics modules",
      "Smooth physics-based UI animations with Framer Motion",
      "Real-time database synchronization via Firebase backend",
      "Comprehensive REST API integration for dynamic reporting",
    ],
    challenge:
      "Handling high-frequency state updates and real-time data synchronization without compromising UI responsiveness.",
    solution:
      "Implemented optimized React context hooks and efficient memoization strategies paired with Firebase real-time listeners.",
  },
  {
    title: "Recruitment Management Platform",
    slug: "recruitment-management-platform",
    category: "Full-Stack Web App",
    description:
      "A complete recruitment ecosystem with dedicated employer, admin, and company dashboards, plus job listings, applications, user management, roles, and permissions.",
    longDescription:
      "The flagship Recruitment Management Platform is an enterprise-grade talent acquisition ecosystem. It bridges the gap between hiring organizations, applicants, and system administrators with role-based access control, automated applicant tracking pipelines, comprehensive job CRUD operations, and advanced analytics.",
    liveDemo: LIVE_DEMO_URL_PLACEHOLDER,
    github: "",
    image: "/recruitment-homepage.webp",
    technologies: ["React.js", "Node.js", "REST API", "Authentication", "Database"],
    features: [
      "Multi-tenant architecture supporting admin, employer, and candidate roles",
      "End-to-end applicant tracking pipeline with status updates",
      "Granular role-based access control (RBAC) and permissions management",
      "Advanced search and filtering across job listings and user databases",
    ],
    challenge:
      "Designing a unified yet highly segregated interface for distinct user personas (Admins, Employers, Candidates) with strict security boundaries.",
    solution:
      "Developed a modular React frontend with protected routing, reusable dashboard layouts, and standardized REST API integration.",
  },
  {
    title: "Admin Dashboard",
    slug: "admin-dashboard",
    category: "Recruitment Platform",
    description:
      "The administrative control center of the recruitment platform with a live overview of key metrics, platform activity, and management tools.",
    longDescription:
      "The Admin Dashboard serves as the master control panel for the recruitment ecosystem. System administrators get real-time visibility into total platform usage, user growth curves, system health metrics, and quick access to user moderation and role configuration tools.",
    liveDemo: LIVE_DEMO_URL_PLACEHOLDER,
    github: "",
    image: "/admin-dashboard.webp",
    technologies: ["React.js", "Responsive UI", "Data Visualization", "REST API"],
    features: [
      "Real-time platform activity metrics and KPI counters",
      "Quick-action management panels for system moderation",
      "Interactive data visualization charts for user growth and job postings",
      "Secure administrative authorization middleware",
    ],
    challenge:
      "Presenting dense operational datasets and high-level platform analytics in a clean, non-cluttered interface.",
    solution:
      "Created modular card grids and visual charts with intuitive hierarchy and instant filter controls.",
  },
  {
    title: "Employer Dashboard",
    slug: "employer-dashboard",
    category: "Recruitment Platform",
    description:
      "Employer-facing workspace for managing job postings, tracking applicants, and monitoring hiring progress in one place.",
    longDescription:
      "The Employer Dashboard empowers hiring managers and recruiters to post new vacancies, review incoming applications through a kanban-style pipeline, schedule interviews, and communicate with candidates seamlessly within a centralized workspace.",
    liveDemo: LIVE_DEMO_URL_PLACEHOLDER,
    github: "",
    image: "/employer-dashboard.webp",
    technologies: ["React.js", "Recruitment UX", "Job Management", "REST API"],
    features: [
      "Centralized job vacancy management and status toggling",
      "Candidate pipeline tracker with stage progression",
      "Quick applicant profile preview and resume review",
      "Streamlined action items and notification center",
    ],
    challenge:
      "Reducing recruiter friction when managing dozens of simultaneous job openings and hundreds of applicants.",
    solution:
      "Designed an intuitive tabbed and pipeline-based UI that minimizes clicks and highlights actionable candidate milestones.",
  },
  {
    title: "Company Profile Dashboard",
    slug: "company-profile-dashboard",
    category: "Recruitment Platform",
    description:
      "A dedicated company profile dashboard presenting business information, branding, and overview metrics for organizations on the platform.",
    longDescription:
      "The Company Profile Dashboard allows corporate entities to manage their public-facing employer brand. Organizations can update their company bio, logo, industry sector, website, office locations, and view engagement metrics on their active job listings.",
    liveDemo: LIVE_DEMO_URL_PLACEHOLDER,
    github: "",
    image: "/company-profile-dashboard.webp",
    technologies: ["React.js", "Profiles", "Dashboards", "REST API"],
    features: [
      "Editable company branding and metadata management",
      "Overview analytics on company profile views and job engagement",
      "Team member association and recruiter seat management",
      "Preview mode for checking public company presentation",
    ],
    challenge:
      "Ensuring seamless image uploads and instant state synchronization for corporate branding assets.",
    solution:
      "Implemented robust form validation, optimistic UI updates, and secure asset handling through REST APIs.",
  },
  {
    title: "Company Details",
    slug: "company-details",
    category: "Recruitment Platform",
    description:
      "Detailed company information view showing open roles, company metadata, and engagement with the recruitment ecosystem.",
    longDescription:
      "The Company Details view provides an immersive profile breakdown for any registered organization on the platform. Candidates and recruiters can explore company culture statements, active open positions, employee count, industry vertical, and verified company badges.",
    liveDemo: LIVE_DEMO_URL_PLACEHOLDER,
    github: "",
    image: "/company-details.webp",
    technologies: ["React.js", "Company Pages", "Job Listings", "REST API"],
    features: [
      "Comprehensive company overview with mission and culture highlights",
      "Dynamic list of currently open job positions tied to the company",
      "Verified employer status indicators and social links",
      "Responsive grid layout optimized for mobile and desktop reading",
    ],
    challenge:
      "Structuring complex corporate profile data into an engaging, easy-to-digest public view.",
    solution:
      "Created a modular layout with clear visual hierarchy, combining header banners, stats pills, and active job cards.",
  },
  {
    title: "Jobs Management",
    slug: "jobs-management",
    category: "Recruitment Platform",
    description:
      "Full job-listing management interface for creating, editing, and organizing job postings across the recruitment platform.",
    longDescription:
      "The Jobs Management module provides recruiters and admins with powerful CRUD capabilities for job vacancies. Users can filter jobs by status (active, draft, closed), search by title or location, edit requirements, set salary ranges, and manage applicant limits.",
    liveDemo: LIVE_DEMO_URL_PLACEHOLDER,
    github: "",
    image: "/jobs-management.webp",
    technologies: ["React.js", "Job CRUD", "Pagination", "REST API"],
    features: [
      "Advanced filtering and keyword search across job listings",
      "Full Create, Read, Update, Delete (CRUD) workflow for vacancies",
      "Pagination and sorting controls for large datasets",
      "Status toggle for instantly opening or closing job applications",
    ],
    challenge:
      "Managing large tables of job listings with performant search and instant filter feedback.",
    solution:
      "Engineered optimized client-side filtering hooks paired with responsive tabular and card-based views.",
  },
  {
    title: "Job Details Dashboard",
    slug: "job-details-dashboard",
    category: "Recruitment Platform",
    description:
      "Comprehensive job detail dashboard displaying posting information, candidate pipeline, and application status at a glance.",
    longDescription:
      "The Job Details Dashboard zooms in on a specific vacancy, offering recruiters a deep dive into applicant metrics for that role. It displays applicant conversion rates, stage breakdown (applied, screening, interview, offered, rejected), and direct candidate review tools.",
    liveDemo: LIVE_DEMO_URL_PLACEHOLDER,
    github: "",
    image: "/job-details-dashboard.webp",
    technologies: ["React.js", "Candidate Pipeline", "Job Tracking", "REST API"],
    features: [
      "Per-job analytics and candidate pipeline stage metrics",
      "Direct list of applicants associated with the specific vacancy",
      "Quick status transition controls for individual candidates",
      "Export capabilities for candidate interview sheets",
    ],
    challenge:
      "Providing deep granularity for individual job postings without overloading the user interface.",
    solution:
      "Divided the view into clear functional tabs separating job description, candidate pipeline, and analytics.",
  },
  {
    title: "Users Management",
    slug: "users-management",
    category: "Recruitment Platform",
    description:
      "Admin module for managing all platform users including search, filtering, roles assignment, and account status control.",
    longDescription:
      "The Users Management module is an essential administrative tool for overseeing platform membership. Admins can search user databases, filter by role (candidate, employer, admin), activate or suspend accounts, and review user registration logs.",
    liveDemo: LIVE_DEMO_URL_PLACEHOLDER,
    github: "",
    image: "/users-management.webp",
    technologies: ["React.js", "User CRUD", "Search & Filter", "REST API"],
    features: [
      "Centralized user directory with instant search and role filters",
      "Account status control (active, suspended, pending verification)",
      "Detailed user profile inspection drawer",
      "Bulk action support for administrative moderation",
    ],
    challenge:
      "Maintaining high performance and security when handling sensitive user records and search queries.",
    solution:
      "Implemented debounced search inputs, secure role authorization checks, and pagination for optimal load times.",
  },
  {
    title: "Roles & Permissions Dashboard",
    slug: "roles-permissions-dashboard",
    category: "Recruitment Platform",
    description:
      "Role-based access control interface allowing administrators to assign roles and manage granular permissions across the system.",
    longDescription:
      "The Roles & Permissions Dashboard provides advanced security configuration for the recruitment platform. Administrators can define custom roles, assign specific permission flags (create jobs, moderate users, view analytics), and audit system security boundaries.",
    liveDemo: LIVE_DEMO_URL_PLACEHOLDER,
    github: "",
    image: "/roles-permissions-dashboard.webp",
    technologies: ["React.js", "RBAC", "Permissions", "REST API"],
    features: [
      "Granular permission matrix configuration interface",
      "Custom role creation and policy assignment",
      "Visual indicators for active system privileges",
      "Audit logs tracking permission modifications",
    ],
    challenge:
      "Translating complex hierarchical access control lists (ACL) into an intuitive, error-free management UI.",
    solution:
      "Created a clean matrix toggle interface with immediate validation and clear visual feedback for permission states.",
  },
];

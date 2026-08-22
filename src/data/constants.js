export const skills = [
  {
    title: "Frontend Development",
    desc: "Building responsive, modern & dynamic web interfaces",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    skills: [
      {
        name: "React",
        desc: "Modern UI library & component architecture",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        color: "#61DAFB",
      },
      {
        name: "Tailwind CSS",
        desc: "Utility-first CSS framework for rapid UI styling",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        color: "#06B6D4",
      },
      {
        name: "JavaScript",
        desc: "ES6+, async programming & web APIs",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        color: "#F7DF1E",
      },
      {
        name: "HTML5 & CSS3",
        desc: "Semantic structure & responsive layouts",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        color: "#E34F26",
      },
    ]
  },
  {
    title: "Backend Development",
    desc: "Robust server-side logic & RESTful APIs",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
    skills: [
       {
        name: "Node.js",
        desc: "Server-side JavaScript runtime",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        color: "#339933",
      },
      {
        name: "Express.js",
        desc: "Fast, unopinionated web framework for Node.js",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        color: "#828282",
      },
    ]
  },
  {
    title: "Mobile App Development",
    desc: "Cross-platform mobile apps for Android & iOS",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    color: "#02569B",
    skills: [
      {
        name: "Flutter",
        desc: "Single codebase native mobile applications",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
        color: "#02569B",
      },
      {
        name: "Dart",
        desc: "Client-optimized language for fast apps",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
        color: "#0175C2",
      },
    ]
  },
  {
    title: "Database Management",
    desc: "Scalable data storage & query optimization",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
    skills: [
      {
        name: "MongoDB",
        desc: "Document-oriented NoSQL database",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        color: "#47A248",
      },
    ]
  },
  {
    title: "Programming Languages",
    desc: "Core computational & algorithmic languages",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#3776AB",
    skills: [
      {
        name: "Python",
        desc: "Data structures, scripting & web dev",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        color: "#3776AB",
      },
      {
        name: "C++",
        desc: "System programming & competitive coding",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        color: "#00599C",
      },
      {
        name: "C",
        desc: "Foundation language for memory management",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
        color: "#A8B9CC",
      },
    ]
  },
  {
    title: "Tools & DevOps",
    desc: "Modern dev workflows & toolchains",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
    skills: [
      {
        name: "Git & GitHub",
        desc: "Version control & collaborative development",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        color: "#F05032",
      },
      {
        name: "VS Code",
        desc: "Primary IDE with custom dev extensions",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        color: "#007ACC",
      },
    ]
  },
];

/*
  =============================================================================
  📂 PROJECTS DATA SECTION
  =============================================================================
  To ADD a new project, copy the template below and paste it inside the `projects` array.
  To DELETE a project, simply delete or comment out its `{ ... }` block.

  📌 EASY COPY-PASTE PROJECT TEMPLATE:
  ------------------------------------
  {
    id: "my-new-project-id",
    name: "My Project Name",
    desc: "A brief 1-2 sentence description of what this project does.",
    tech: "React, Tailwind CSS, Node.js, MongoDB",
    category: "Full Stack", // "Full Stack" | "Web App" | "Mobile App" | "Tool" | "Game"
    link: "https://my-project.vercel.app",
    repo: "https://github.com/Rabi-Bhagat/my-repo-name",
    color: "#3b82f6", // #3b82f6 (blue), #a855f7 (purple), #10b981 (emerald), #ec4899 (pink), #f59e0b (amber)
    features: [
      "Key Feature 1 Description",
      "Key Feature 2 Description",
      "Key Feature 3 Description",
      "Key Feature 4 Description"
    ],
    status: "Live Production"
  },
  =============================================================================
*/

export const projects = [
  {
    id: "mohanpur-village",
    name: "Mohanpur Village",
    desc: "Full-stack MERN portal empowering village administration with citizen service requests, notice boards, and community management.",
    tech: "MongoDB, Express, React, Node.js, Tailwind CSS",
    category: "Full Stack",
    link: "https://mohanpur-village.vercel.app",
    repo: "https://github.com/Rabi-Bhagat/mohanpur_village",
    color: "#3b82f6",
    features: [
      "Citizen Service Request Portal",
      "Notice & Event Broadcast System",
      "Role-Based Admin Dashboard",
      "Responsive Glassmorphic Interface"
    ],
    status: "Live Production"
  },
  {
    id: "hotelbazaar",
    name: "HotelBazaar",
    desc: "End-to-end hotel booking platform enabling users to search, compare, and reserve rooms seamlessly with real-time feedback.",
    tech: "MongoDB, Express, React, Node.js, Cloudflare Pages",
    category: "Web App",
    link: "https://booking-app-hotelbazaar.pages.dev/",
    repo: "https://github.com/Rabi-Bhagat/Booking-App-hotelBazaar-",
    color: "#a855f7",
    features: [
      "Real-time Room Search & Filtering",
      "Booking Confirmation Engine",
      "User Reservation History",
      "Interactive Card Gallery"
    ],
    status: "Live Production"
  },
  {
    id: "securedocs",
    name: "SecureDocs",
    desc: "Enterprise-grade document management system featuring secure uploads, access control, and organized document repository.",
    tech: "MongoDB, Express, React, Node.js",
    category: "Web App",
    link: "https://securedocs-a3x.pages.dev",
    repo: "https://github.com/Rabi-Bhagat/SecureDocs-document-management-system-",
    color: "#10b981",
    features: [
      "Encrypted Document Management",
      "Multi-user Access Control",
      "Category Tagging & Fast Search",
      "Audit Trail & Storage Logs"
    ],
    status: "Live Production"
  },
  {
    id: "signify-pro",
    name: "Signify Pro",
    desc: "Sleek web application for drawing, customizing, and exporting high-resolution digital signatures onto documents.",
    tech: "React, HTML5 Canvas, Tailwind CSS",
    category: "Web App",
    link: "https://signify-pro.pages.dev",
    repo: "https://github.com/Rabi-Bhagat/Signify-Pro",
    color: "#ec4899",
    features: [
      "Touch & Mouse Canvas Drawing",
      "PNG/SVG Signature Export",
      "Stroke Thickness & Color Selector",
      "Instant Clear & Undo Controls"
    ],
    status: "Live Production"
  },
  {
    id: "todo-list-pro",
    name: "TODO List Pro",
    desc: "Feature-packed task management suite built with MERN stack featuring priority tags, category filters, and persistent cloud sync.",
    tech: "MongoDB, Express, React, Node.js",
    category: "Full Stack",
    link: "https://todo-list-pro.pages.dev/",
    repo: "https://github.com/Rabi-Bhagat/TODO-List-pro",
    color: "#f59e0b",
    features: [
      "Category & Priority Filtering",
      "Task Completion Stats",
      "Subtask Checklists",
      "Cross-device Synchronization"
    ],
    status: "Live Production"
  },
  {
    id: "ecommerce",
    name: "E-Commerce Frontend",
    desc: "Modern e-commerce platform interface with interactive product gallery, shopping cart drawer, and responsive checkout flow.",
    tech: "HTML5, CSS3, JavaScript, Flexbox/Grid",
    category: "Web App",
    link: "https://ecommerce-seven-amber-35.vercel.app/",
    repo: "https://github.com/Rabi-Bhagat/frontened-project/tree/main/project-4(%20E%20commerece%20app%20using%20HTML%20and%20css)",
    color: "#6366f1",
    features: [
      "Product Catalog Grid",
      "Interactive Shopping Cart",
      "Filter by Price & Category",
      "Mobile-Optimized Navigation"
    ],
    status: "Live Production"
  },
  {
    id: "guessing-game",
    name: "Guessing Game",
    desc: "Engaging interactive number guessing web game featuring dynamic attempt tracking, score records, and responsive animations.",
    tech: "JavaScript, HTML5, CSS3 Animations",
    category: "Game",
    link: "https://numberguessinggame-nine.vercel.app/",
    repo: "https://github.com/Rabi-Bhagat/frontened-project/tree/main/number%20guessing%20game",
    color: "#14b8a6",
    features: [
      "Dynamic Higher/Lower Hints",
      "High Score Tracking",
      "Interactive Restart & Game Modes",
      "Vibrant Visual Feedback"
    ],
    status: "Live Production"
  },
  {
    id: "to-do-list",
    name: "Agile To-Do List",
    desc: "Lightweight, ultra-fast task tracker with clean aesthetic UI, state persistence via local storage, and task filtering.",
    tech: "HTML5, CSS3, JavaScript",
    category: "Tool",
    link: "https://frontenedoftodolist.vercel.app/",
    repo: "https://github.com/Rabi-Bhagat/frontened-project/tree/main/Agileproject(to-do%20list)",
    color: "#06b6d4",
    features: [
      "Fast Task Addition & Deletion",
      "Local Storage Persistence",
      "Completed Task Toggle",
      "Minimalist Dark UI"
    ],
    status: "Live Production"
  },
  {
    id: "calculator",
    name: "Interactive Calculator",
    desc: "Clean web calculator supporting arithmetic operations, keyboard inputs, operator chaining, and clear entry functionality.",
    tech: "HTML5, CSS3, JavaScript",
    category: "Tool",
    link: "https://code-alpha-task2-sandy.vercel.app/",
    repo: "https://github.com/Rabi-Bhagat/CodeAlpha_web_internship_project/tree/main/task%202",
    color: "#f97316",
    features: [
      "Full Keyboard & Click Controls",
      "Formatted Calculation History",
      "Error Handling & Overflow Prevention",
      "Neumorphic Button Styling"
    ],
    status: "Live Production"
  },
];

/*
  =============================================================================
  🏆 CERTIFICATIONS & ACHIEVEMENTS DATA SECTION
  =============================================================================
  To ADD a new certificate, hackathon award, or internship offer:
  1. Save your certificate image (.png / .jpg) or PDF file inside:
     `public/internship and skill certificate and hackathon/`
  2. Copy the template below and paste it inside the `achievements` array.

  To DELETE a certificate, simply delete or comment out its `{ ... }` block.

  📌 EASY COPY-PASTE CERTIFICATE TEMPLATE:
  -----------------------------------------
  {
    id: "my-certificate-id",
    title: "Certificate or Award Title",
    org: "Issuing Organization or Platform Name",
    category: "Certification", // "Certification" | "Hackathon Award" | "Internship Offer" | "Skill Badge"
    type: "certificate", // "certificate" | "hackathon" | "internship"
    date: "2025",
    issueDate: "Month Year",
    desc: "Description of what was learned or accomplished.",
    previewImage: "/internship and skill certificate and hackathon/your_image.png",
    fileUrl: "/internship and skill certificate and hackathon/your_file.pdf",
    color: "#3b82f6",
    badge: "Verified Certificate",
    certId: "CERT-12345"
  },
  =============================================================================
*/

export const achievements = [
  {
    id: "sde-bluestock-intern",
    title: "Software Development Engineer (SDE) Intern Offer",
    org: "Bluestock Fintech",
    category: "Internship Offer",
    type: "internship",
    date: "May 2025 - Jun 2025",
    issueDate: "April 05, 2025",
    desc: "Received official appointment letter for SDE Intern position at Bluestock Fintech, contributing to fintech applications, component design, and dynamic software development.",
    previewImage: "/internship and skill certificate and hackathon/SDE_internship_offer_letter_preview.jpg",
    fileUrl: "/internship and skill certificate and hackathon/SDE internship offer letter.pdf",
    color: "#4f46e5",
    badge: "#startupindia Recognized",
    certId: "BFSD31245"
  },
  {
    id: "buildwithindia-top5000",
    title: "BuildWithIndia Hackathon Finale (Top 5,000 / 25,000 Teams)",
    org: "HackWithIndia & Google Office",
    category: "Hackathon Award",
    type: "hackathon",
    date: "2025",
    issueDate: "2025",
    desc: "Ranked among the Top 5,000 teams out of 25,000 participating teams across India in the national BuildWithIndia hackathon finale hosted at Google Office.",
    previewImage: "/internship and skill certificate and hackathon/Rabi Bhagat.png",
    fileUrl: "/internship and skill certificate and hackathon/Rabi Bhagat.png",
    color: "#a855f7",
    badge: "Top 20% National Rank",
    certId: "BUILDWITHINDIA-2025"
  },
  {
    id: "web-hack-national-winner",
    title: "WEB HACK - Web Page Making Competition Certificate",
    org: "Alpha Intern & MMEC (National Tech Fest 2025)",
    category: "Hackathon Award",
    type: "hackathon",
    date: "2025",
    issueDate: "2025",
    desc: "Awarded Certificate of Achievement for outstanding performance in the national-level WEB HACK Web Page Making Competition as part of National Level Tech Fest 2025, supported by AICTE & MSME.",
    previewImage: "/internship and skill certificate and hackathon/Rabi_prasad_Bhagat_WEB_HACK_Certificate_preview.jpg",
    fileUrl: "/internship and skill certificate and hackathon/Rabi prasad Bhagat WEB HACK Certificate.pdf",
    color: "#06b6d4",
    badge: "AICTE & MoE Recognized",
    certId: "AI/WH/2025/2587"
  },
  {
    id: "gdg-solution-challenge",
    title: "Google Developer Groups Solution Challenge 2025",
    org: "Google Developer Groups (GDG) & Hack2skill",
    category: "Hackathon",
    type: "hackathon",
    date: "2025",
    issueDate: "2025",
    desc: "Awarded Certificate of Participation for building impactful tech solutions addressing real-world societal problems in the global GDG Solution Challenge.",
    previewImage: "/internship and skill certificate and hackathon/Hack2skill-Certificate.png",
    fileUrl: "/internship and skill certificate and hackathon/Hack2skill-Certificate.png",
    color: "#3b82f6",
    badge: "Google Developer Groups",
    certId: "2025H2S01GSC-P02397"
  },
  {
    id: "codealpha-frontend-certificate",
    title: "Frontend Development Virtual Internship Certificate",
    org: "CodeAlpha (MSME Govt. of India)",
    category: "Internship Certificate",
    type: "internship",
    date: "15 May 2025 - 15 Jun 2025",
    issueDate: "16th June 2025",
    desc: "Successfully completed one-month intensive Frontend Development Virtual Internship building interactive web applications, tools, and UI components.",
    previewImage: "/internship and skill certificate and hackathon/Rabi Prasad Bhagat (1)_page-0001.jpg",
    fileUrl: "/internship and skill certificate and hackathon/11232737_Rabi-prasad-bhagat.pdf",
    color: "#f59e0b",
    badge: "MSME Govt of India",
    certId: "CA/MA1/8178"
  },
  {
    id: "codealpha-lor",
    title: "Official Letter of Recommendation (LOR)",
    org: "CodeAlpha",
    category: "Recommendation Letter",
    type: "internship",
    date: "June 2025",
    issueDate: "16th June 2025",
    desc: "Received formal Letter of Recommendation from Founder & CEO of CodeAlpha highlighting exceptional frontend development performance, technical productivity, and team collaboration.",
    previewImage: "/internship and skill certificate and hackathon/Rabi Prasad Bhagat_page-0001.jpg",
    fileUrl: "/internship and skill certificate and hackathon/recomendetaion Letter Codealpha.pdf",
    color: "#10b981",
    badge: "Executive LOR",
    certId: "CA/MA1/8178-LOR"
  },
  {
    id: "devarc-2026-hackathon",
    title: "DevArc 2026 Technical Hackathon",
    org: "GDG on Campus MM(DU) & Department of CSE",
    category: "Hackathon",
    type: "hackathon",
    date: "1 Jan 2026 - 17 Jan 2026",
    issueDate: "January 2026",
    desc: "Certificate of Participation in the DevArc 2026 annual developer hackathon organized by GDG on Campus MM(DU) and CSE Department, MMEC.",
    previewImage: "/internship and skill certificate and hackathon/Rabi_Prasad_Bhagt.png",
    fileUrl: "/internship and skill certificate and hackathon/Rabi_Prasad_Bhagt.png",
    color: "#ec4899",
    badge: "GDG MM(DU)",
    certId: "MMEC/25-26/A/026/126"
  },
  {
    id: "gdg-hackureka-2025",
    title: "GDG HACKUREKA 2025 Certificate of Appreciation",
    org: "GDG on Campus MM(DU) & CSE Department",
    category: "Hackathon",
    type: "hackathon",
    date: "15th February 2025",
    issueDate: "February 2025",
    desc: "Awarded Certificate of Appreciation for participating and presenting innovative project submissions during the GDG Hackureka 2025 hackathon.",
    previewImage: "/internship and skill certificate and hackathon/WhatsApp Image 2025-02-19 at 14.44.45_bc32ebb0.jpg",
    fileUrl: "/internship and skill certificate and hackathon/WhatsApp Image 2025-02-19 at 14.44.45_bc32ebb0.jpg",
    color: "#ef4444",
    badge: "GDG Hackureka",
    certId: "Mmec/24-25/GDGH/029"
  },
  {
    id: "ey-techathon-6",
    title: "EY Techathon 6.0 Executive Summary Submission",
    org: "Ernst & Young (EY)",
    category: "Hackathon",
    type: "hackathon",
    date: "2025",
    issueDate: "2025",
    desc: "Certificate of Participation for completing Round 1 Executive Summary Submission in the national EY Techathon 6.0 competition organized by EY.",
    previewImage: "/internship and skill certificate and hackathon/EY_Techathon_certificate_preview.jpg",
    fileUrl: "/internship and skill certificate and hackathon/EY Techathon certificate.pdf",
    color: "#eab308",
    badge: "EY Global",
    certId: "EY-TECHATHON-6.0"
  },
  {
    id: "aarambh-bajaj-auto",
    title: "AARAMBH - First Step Forward Technical Quiz",
    org: "Bajaj Auto Credit Limited",
    category: "Competition Award",
    type: "hackathon",
    date: "2025",
    issueDate: "2025",
    desc: "Certificate of Appreciation awarded by Bajaj Auto Credit Limited Human Resources for excellent performance in the national AARAMBH technical challenge.",
    previewImage: "/internship and skill certificate and hackathon/Rabi-Prasad-Bhagat-Maharishi-Markandeshwar-Deemed-University-Mullana-Ambala_preview.jpg",
    fileUrl: "/internship and skill certificate and hackathon/Rabi-Prasad-Bhagat-Maharishi-Markandeshwar-Deemed-University-Mullana-Ambala.pdf",
    color: "#0284c7",
    badge: "Bajaj Auto Credit",
    certId: "BAJAJ-AARAMBH-2025"
  },
  {
    id: "gdsc-android-bootcamp",
    title: "Android Bootcamp with Compose 2023",
    org: "Google Developer Student Clubs (GDSC) MM(DU)",
    category: "Certification",
    type: "certification",
    date: "11 Dec 2023 - 22 Dec 2023",
    issueDate: "22nd December 2023",
    desc: "Completed 2-week intensive Android App Development Bootcamp mastering Jetpack Compose, Kotlin UI elements, and modern Android architecture.",
    previewImage: "/internship and skill certificate and hackathon/certificate of android (9).png",
    fileUrl: "/internship and skill certificate and hackathon/certificate of android (9).png",
    color: "#10b981",
    badge: "GDSC Android Compose",
    certId: "GDSC-Android-9"
  },
  {
    id: "tcs-ion-soft-skills",
    title: "TCS iON Career Edge - Professional Soft Skills & Communication",
    org: "Tata Consultancy Services (TCS iON)",
    category: "Certification",
    type: "certification",
    date: "2024",
    issueDate: "2024",
    desc: "Certified in corporate communication, effective email writing, telephone etiquette, interpersonal skills, and resume building by TCS iON.",
    previewImage: "/internship and skill certificate and hackathon/RabiBhagatTCSion_certificate_preview.jpg",
    fileUrl: "/internship and skill certificate and hackathon/RabiBhagatTCSion certificate.pdf",
    color: "#0d9488",
    badge: "TCS iON Certified",
    certId: "TCS-ION-SOFT-SKILLS"
  }
];

export const certifications = achievements;

export const heroRoles = [
  "Full-Stack Developer",
  "MERN Stack Specialist",
  "Mobile App Creator (Flutter)",
  "UI/UX Craftsperson",
];

export const stats = [
  { label: "Projects Built", value: 9, suffix: "+" },
  { label: "Certificates & Hackathons", value: 15, suffix: "+" },
  { label: "Years Coding", value: 3, suffix: "+" },
];

export const socialLinks = [
  {
    name: "GitHub",
    link: "https://github.com/Rabi-Bhagat",
    iconUrl: "https://cdn.simpleicons.org/github/white",
    lightIconUrl: "https://cdn.simpleicons.org/github/000000",
    color: "#181717",
    handle: "@Rabi-Bhagat",
  },
  {
    name: "LinkedIn",
    link: "https://linkedin.com/in/rabi-bhagat789",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
    lightIconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
    color: "#0a66c2",
    handle: "in/rabi-bhagat789",
  },
  {
    name: "LeetCode",
    link: "https://leetcode.com/u/Rabibhagat/",
    iconUrl: "https://cdn.simpleicons.org/leetcode/FFA116",
    lightIconUrl: "https://cdn.simpleicons.org/leetcode/FFA116",
    color: "#FFA116",
    handle: "@Rabibhagat",
    badge: "Problem Solver",
    desc: "Algorithms & Data Structures",
  },
];

export const experience = [
  {
    role: "Full-Stack Developer",
    company: "Freelance / Self-Directed",
    date: "2024 - Present",
    desc: "Engineering full-stack MERN applications and cross-platform mobile apps for web and mobile. Specializing in high-performance React frontends, Node.js REST APIs, and MongoDB database architecture.",
    skills: ["React", "Node.js", "Express.js", "MongoDB", "Flutter", "Tailwind CSS"],
  },
  {
    role: "SDE Intern (Software Development Engineer)",
    company: "Bluestock Fintech",
    date: "May 2025 - Jun 2025",
    desc: "Selected for Software Development Engineer internship working remotely on fintech application development, modular React components, and dynamic software features.",
    skills: ["React", "JavaScript", "Fintech Applications", "UI Components"],
  },
  {
    role: "Frontend Development Intern",
    company: "CodeAlpha",
    date: "May 2025 - Jun 2025",
    desc: "Completed virtual frontend internship program building responsive web applications, task tools, and calculators. Earned LOR from Founder & CEO.",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Git"],
  },
  {
    role: "B.Tech in Computer Science & Engineering",
    company: "Maharishi Markandeshwar University",
    date: "2023 - 2027",
    desc: "Pursuing Bachelor of Technology degree. Building rigorous foundations in Data Structures, Algorithms, Software Engineering, Database Systems, and Web Application Architecture.",
    skills: ["Data Structures", "Algorithms", "C++", "Python", "Software Engineering"],
  },
];

export const contactInfo = {
  email: "rabibhagat789@gmail.com",
  phone: "+91 8307855628",
  phoneAlt: "+977 9815787410",
  leetcode: "https://leetcode.com/u/Rabibhagat/",
  leetcodeHandle: "@Rabibhagat",
  github: "https://github.com/Rabi-Bhagat",
  linkedin: "https://linkedin.com/in/rabi-bhagat789",
};
import type { Dict } from './pt'

export const en: Dict = {
  meta: {
    title: 'Raquel Costa Freire — Fullstack Developer',
    description:
      'Portfolio of Raquel Costa Freire, a fullstack developer in Natal, Brazil: solid backends, clear interfaces and attention to every detail.',
  },
  nav: {
    label: 'Sections',
    home: 'Home',
    about: 'About me',
    exp: 'Experience',
    proj: 'Projects',
    research: 'Research',
    contact: 'Contact',
    art: 'Art',
    works: 'Artwork',
    process: 'Process',
    dev: 'Dev portfolio',
  },
  controls: {
    language: 'Language',
    theme: 'Toggle light/dark theme',
  },
  hero: {
    greeting: 'Dear visitor,',
    iam: "I'm",
    name: 'Raquel Freire',
    rolesLabel: 'Titles associated with me',
    roles: [
      'fullstack developer',
      'technology enthusiast',
      'Information Technology graduate',
      'Software Engineering student',
      'digital inclusion teacher',
      'artist',
    ],
    ctaGithub: 'See my GitHub',
    ctaStory: 'My story',
    photoHint: '[your photo here]',
    photoCaption: 'fullstack dev',
    noteLabel: 'now',
    noteTitle: 'Gotiva Project',
    noteMeta: 'IMD / Interjato · since Mar/2026',
  },
  divider: 'scroll the page →',
  about: {
    title: 'About me',
    statementStart: 'I build complete systems, from backend to interface, and teach what I',
    statementMark: 'learn along the way.',
    paragraphs: [
      'Today I work on the Gotiva Project (IMD / Interjato Group), building fullstack products for the public and private sectors. Before that, at SEFAZ-RN, I worked with microservices, microfrontends and RPA automation.',
      "I'm studying Information Technology at UFRN, focused on Software Development, and moving on to a bachelor's degree in Software Engineering. Outside of code, I lead PROEIDI, an outreach project for the digital inclusion of older adults.",
    ],
    highlights: [
      {
        title: '1st place',
        text: 'InovaFAZ Award, for RPA bots that extract tax data at SEFAZ-RN.',
      },
      {
        title: 'PROEIDI',
        text: 'Digital inclusion project for older adults, featured at the GO! RN event (2025).',
      },
    ],
    educationTitle: 'EDUCATION',
    education: [
      {
        name: "Bachelor's in Information Technology",
        meta: 'UFRN · 2022 — 2026 · Focus on Software Development',
      },
      {
        name: "Bachelor's in Software Engineering",
        meta: 'UFRN · 2026 — 2027 · Second cycle',
      },
    ],
    languagesTitle: 'LANGUAGES',
    languages: [
      { name: 'Portuguese', level: 'Native' },
      { name: 'English', level: 'Advanced' },
      { name: 'French', level: 'Beginner' },
      { name: 'Mandarin', level: 'Beginner' },
    ],
    softSkills: [
      'Communication and teamwork',
      'Leadership and initiative',
      'Teaching and mentoring',
      'Problem solving',
    ],
    photoHint: '[your photo here]',
    photoCaption: '[photo caption]',
    artStart: "When I'm not coding,",
    artMark: 'I create.',
    artText:
      "I've been drawing and painting since [year]. [Tell what inspires you and which materials you use most.] I built a version of the portfolio just for my artwork, sorted by medium.",
    artCta: 'See art portfolio →',
  },
  stack: {
    title: 'Technical skills',
    intro:
      'From advanced concurrency in Java and Zig to React interfaces, with services in Python and C# in between.',
    groups: {
      languages: 'Languages',
      frontend: 'Frontend',
      backend: 'Backend',
      data: 'Data & infra',
    },
    concepts: [
      'Microservices and microfrontends',
      'RPA automation',
      'RESTful APIs',
      'Distributed systems (TCP/UDP)',
      'Performance testing',
      'UML diagramming',
    ],
  },
  experience: {
    titleStart: "Where I've",
    titleMark: 'worked:',
    intro:
      "Many of these jobs are institutional or private, so there are no screenshots. Instead, you'll see the context, the stack and the outcome of each one.",
    photoHint: '[your photo here]',
    photoCaption: '[photo caption]',
    items: [
      {
        period: 'MAR 2026 — PRESENT',
        role: ['Fullstack Developer ·', 'Gotiva Project'],
        org: 'Instituto Metrópole Digital (IMD) / Interjato Group · Natal, RN',
        text: 'Fullstack development of the Gotiva ecosystem and the JurisIA module: scalable, responsive frontend interfaces and backend services for automation in the public and private sectors.',
        award: null,
        tags: ['Python', 'TypeScript', 'React', 'Tailwind CSS', 'Zustand', 'Zod'],
      },
      {
        period: '2024 — 2026',
        role: ['Software Developer'],
        org: 'Rio Grande do Norte Treasury Department (SEFAZ-RN) · Natal, RN',
        text: 'Microservices architecture and backend/mobile development of the ESefaz app, plus the web team building microfrontends for the E-Sefaz site. I led the development of RPA bots to extract tax data and created reusable web components.',
        award: '1st place · InovaFAZ Award',
        tags: ['C#', 'Python', 'JavaScript', '.NET MAUI', 'Flask', 'React.js', 'Selenium', 'Pandas'],
      },
      {
        period: '2024 — 2026',
        role: ['Board · PROEIDI', 'Outreach Project'],
        org: 'UFRN · Natal, RN',
        text: 'Management of a digital inclusion project for older adults: I worked as a technology teacher, coordinated volunteers and developed teaching material. Featured representation at the GO! RN event (2025).',
        award: null,
        tags: ['Project management', 'Teaching', 'Digital literacy'],
      },
      {
        period: '2023',
        role: ['Academic Tutor ·', 'Elementary Mathematics'],
        org: 'UFRN · Natal, RN',
        text: 'Technical and pedagogical support to strengthen the logic foundation needed for programming. I wrote and presented a scientific paper on tutoring performance at the Integrated Teaching Projects Meeting.',
        award: null,
        tags: ['Logic', 'Algorithmic thinking', 'Scientific writing'],
      },
    ],
  },
  projects: {
    title: 'My projects',
    intro:
      'Academic and personal backend and fullstack projects, from distributed systems to complete web applications.',
    all: 'All on GitHub',
    viewOnGithub: 'view on GitHub',
    items: [
      {
        kind: 'BACKEND',
        name: ['Distributed', 'Middleware', 'Platform'],
        text: 'Multi-module platform based on Remoting Patterns, with a fault-tolerant chat orchestrated by a Gateway and Service Cluster, validated with load tests.',
        tags: ['Java', 'Maven', 'TCP/UDP', 'JMeter'],
      },
      {
        kind: 'FULLSTACK',
        name: ['DocVault'],
        text: 'Advanced document management system with automation and autonomous document processing.',
        tags: ['Python', 'TypeScript', 'FastAPI', 'Next.js', 'PostgreSQL'],
      },
      {
        kind: 'BACKEND',
        name: ['Concurrent', 'Best-Matching'],
        text: 'Match search using Levenshtein distance on large datasets, comparing platform threads and virtual threads with benchmarks.',
        tags: ['Java', 'Zig', 'Benchmarks'],
      },
      {
        kind: 'FULLSTACK',
        name: ['Smart Space', 'Booking'],
        text: 'Room booking system that uses gamification to optimize the use of physical spaces.',
        tags: ['Java', 'Spring Boot', 'Gamification'],
      },
      {
        kind: 'FULLSTACK',
        name: ['SIAEC'],
        text: 'Digital showcase of the Integrated System for Artisans and the Creative Economy, with a robust backend and a responsive frontend.',
        tags: ['Java', 'TypeScript', 'Spring Boot', 'React'],
      },
    ],
  },
  // Placeholder content: replace with your real work.
  research: {
    title: 'Academic research',
    intro: 'Publications, events and research, each one a postcard pinned to the notebook.',
    interestsLabel: 'Research interests',
    interests: [
      'Distributed systems',
      'Concurrency and performance',
      'Software engineering',
      'Digital inclusion',
    ],
    imageHint: '[event crest / logo]',
    items: [
      {
        kind: 'PAPER',
        title: 'Title of the published paper',
        venue: 'Event or journal name',
        year: '2025',
        text: 'Short summary of the research: the problem investigated, the approach taken and the main result.',
        tags: ['Keyword', 'Keyword'],
      },
      {
        kind: 'RESEARCH',
        title: 'Research or undergraduate research title',
        venue: 'Institution · Research group',
        year: '2024',
        text: 'Describe the goal of the research, your role and what was produced.',
        tags: ['Keyword', 'Keyword'],
      },
      {
        kind: 'EVENT',
        title: 'Talk at a congress or symposium',
        venue: 'Event name',
        year: '2024',
        text: 'Tell what was presented and how it was received, or the award, if any.',
        tags: ['Keyword', 'Keyword'],
      },
    ],
  },
  art: {
    meta: {
      title: 'Raquel Costa Freire — Art portfolio',
      description:
        'Artwork by Raquel Costa Freire, sorted by medium: watercolor, graphite, digital and acrylic.',
    },
    hero: {
      badge: 'Art portfolio',
      titleStart: 'Between lines, colors and',
      titleMark: 'layers.',
      intro:
        'Beyond code, I like to explore my creative skills through art. Here is my artwork, sorted by the medium I used in each piece.',
      ctaWorks: 'See the artwork',
      ctaDev: 'See dev portfolio',
      handmade: 'handmade',
    },
    gallery: {
      titleStart: 'Artwork,',
      titleMark: 'by medium.',
      filterLabel: 'Filter by medium',
      all: 'All',
      materials: {
        watercolor: 'Watercolor',
        graphite: 'Graphite',
        digital: 'Digital',
        acrylic: 'Acrylic',
      },
      captionMeta: '[year] · [dimensions]',
      photoAlt: 'Placeholder for the artwork photo',
    },
  },
  contact: {
    titleStart: "Let's",
    titleMark: 'talk?',
    cta: 'Send an email',
    stamp: ['NATAL', 'RN'],
    footerLeft: '© 2026 Raquel Costa Freire',
    footerRight: 'Natal, RN · Brazil',
  },
}

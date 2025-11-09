export type ChangelogEntry = {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  changes: {
    category: 'Added' | 'Changed' | 'Fixed' | 'Removed' | 'Deprecated';
    items: string[];
  }[];
};

export const changelog: ChangelogEntry[] = [
  {
    version: '3.0.0',
    date: '2025-01-09',
    type: 'major',
    changes: [
      {
        category: 'Added',
        items: [
          'Multi-language support with English, Hindi, and Spanish translations',
          'Region selector in top navigation with flag indicators',
          'Complete localization system with persistent language selection',
          'Real-time metrics widget framework (ready for API integration)',
          'Enhanced mobile responsiveness across all components',
          'Collapsible sidebar with floating menu button for mobile',
          'Section highlighting when clicked from sidebar navigation',
        ],
      },
      {
        category: 'Changed',
        items: [
          'Updated all UI text to use translation system',
          'Improved mobile layout with responsive spacing and sizing',
          'Enhanced certification icons with brand-accurate colors',
          'Optimized widget heights with fixed dimensions and scrollbars',
        ],
      },
      {
        category: 'Fixed',
        items: [
          'ESLint configuration and resolved all linting errors',
          'TypeScript type definitions for better type safety',
          'Sidebar "Back to Top" functionality to scroll main content',
          'Removed all hardcoded data in favor of centralized portfolio data',
        ],
      },
    ],
  },
  {
    version: '2.0.0',
    date: '2025-11-06',
    type: 'major',
    changes: [
      {
        category: 'Added',
        items: [
          'Drag-and-drop widget reordering functionality',
          'Theme switcher with Light, Dark, and System modes',
          'Persistent layout preferences in localStorage',
          'Clickable external links for certifications',
          'Career journey timeline with visual indicators',
          'Enhanced search functionality across portfolio sections',
        ],
      },
      {
        category: 'Changed',
        items: [
          'Redesigned with AWS Console-inspired interface',
          'Improved navigation with sidebar and top nav',
          'Enhanced visual hierarchy and spacing',
        ],
      },
    ],
  },
  {
    version: '1.0.0',
    date: '2025-11-06',
    type: 'major',
    changes: [
      {
        category: 'Added',
        items: [
          'Initial portfolio website launch',
          'Projects showcase with technology tags',
          'Professional certifications display',
          'Work experience timeline',
          'Skills and technologies section',
          'Blog posts integration',
          'Contact information and social links',
        ],
      },
    ],
  },
];

export const upcomingFeatures = [
  {
    title: 'Real-Time Metrics Integration',
    description: 'Connect to GitHub API, Google Analytics, and blog platforms for live statistics',
    status: 'planned' as const,
  },
  {
    title: 'Project Detail Pages',
    description: 'Dedicated pages for each project with detailed information, screenshots, and demos',
    status: 'planned' as const,
  },
  {
    title: 'Contact Form',
    description: 'Interactive contact form with email integration',
    status: 'planned' as const,
  },
  {
    title: 'Blog Integration',
    description: 'Full blog system with markdown support and syntax highlighting',
    status: 'planned' as const,
  },
  {
    title: 'Resume Download',
    description: 'Generate and download resume in PDF format',
    status: 'planned' as const,
  },
  {
    title: 'More Languages',
    description: 'Add support for French, German, Japanese, and Chinese',
    status: 'considering' as const,
  },
];
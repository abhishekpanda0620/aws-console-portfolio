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
    version: '4.0.1',
    date: '2025-11-15',
    type: 'patch',
    changes: [
      {
        category: 'Fixed',
        items: [
          'Resolved ESLint issues in Terminal component',
          'Improved TypeScript type safety with proper type assertions',
          'Fixed React Hook dependencies',
          'Properly escaped special characters in JSX',
          'Removed unused variables and imports',
        ],
      },
    ],
  },
  {
    version: '4.0.0',
    date: '2025-11-15',
    type: 'major',
    changes: [
      {
        category: 'Added',
        items: [
          'AWS CloudShell-inspired Terminal with command-line interface',
          'Interactive terminal commands for navigating portfolio sections',
          'Command history navigation with up/down arrows',
          'Terminal commands: help, clear, goto, list, region, contact, about, version, exit',
          'Responsive terminal design with maximize/minimize controls',
          'Mobile-optimized terminal access through dropdown menu',
          'Dynamic section highlighting when navigating via terminal commands',
          'JSON data viewing capabilities through terminal list commands',
        ],
      },
      {
        category: 'Changed',
        items: [
          'Improved mobile navigation with optimized dropdown menu',
          'Enhanced search bar width for better mobile experience',
          'Terminal opens in maximized mode by default for better usability',
        ],
      },
    ],
  },
  {
    version: '3.1.0',
    date: '2025-01-09',
    type: 'minor',
    changes: [
      {
        category: 'Added',
        items: [
          'Professional loading component with animated spinner and AWS branding',
          'Custom 404 Not Found page with helpful navigation and error details',
          'Comprehensive Changelog page with version history and upcoming features',
          'Notification bell in top nav now links to Changelog',
          'Quick access to Changelog from sidebar',
        ],
      },
      {
        category: 'Fixed',
        items: [
          'React hydration error in 404 page timestamp',
          'Improved error handling and user feedback',
        ],
      },
    ],
  },
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
    title: 'Terminal Command Extensions',
    description: 'Add more interactive commands and features to the terminal interface',
    status: 'planned' as const,
  },
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
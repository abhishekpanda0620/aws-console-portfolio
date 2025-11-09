"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Locale = 'en' | 'hi' | 'es';

export type Region = {
  code: string;
  name: string;
  locale: Locale;
  flag: string;
  timezone: string;
};

export const regions: Region[] = [
  { code: 'us-east-1', name: 'US East (N. Virginia)', locale: 'en', flag: '🇺🇸', timezone: 'America/New_York' },
  { code: 'ap-south-1', name: 'Asia Pacific (Mumbai)', locale: 'hi', flag: '🇮🇳', timezone: 'Asia/Kolkata' },
  { code: 'eu-south-2', name: 'Europe (Spain)', locale: 'es', flag: '🇪🇸', timezone: 'Europe/Madrid' },
];

export const translations = {
  en: {
    // Navigation
    projects: 'Projects',
    certifications: 'Certifications',
    experience: 'Experience',
    skills: 'Skills',
    blog: 'Blog & Articles',
    achievements: 'Key Achievements',
    careerJourney: 'Career Journey',
    
    // Actions
    backToTop: 'Back to Top',
    sendEmail: 'Send Email',
    githubProfile: 'GitHub Profile',
    linkedin: 'LinkedIn',
    contactMe: 'Contact Me',
    contact: 'Contact',
    
    // UI Elements
    dragEnabled: 'Drag Enabled',
    dragDisabled: 'Drag Disabled',
    reset: 'Reset',
    customizableDashboard: 'Customizable Dashboard',
    dragInstruction: 'Hover over any widget to see the drag handle (⋮⋮) on the left. Drag and drop to rearrange sections.',
    
    // Sections
    skillsTechnologies: 'Skills & Technologies',
    cloudDevOps: 'Cloud & DevOps',
    frontend: 'Frontend',
    backend: 'Backend',
    
    // Status
    region: 'Region',
    status: 'Status',
    online: 'Online',
    version: 'Version',
    
    // Certifications
    issued: 'Issued',
    verified: 'Verified',
    
    // Projects
    production: 'Production',
    activeDevelopment: 'Active Development',
    
    // Search
    searchPlaceholder: 'Search projects, skills, certifications...',
    
    // Metrics
    githubStars: 'GitHub Stars',
    totalCommits: 'Total Commits',
    blogReads: 'Blog Reads',
    visitors: 'Visitors',
    
    // Time
    yearsExperience: 'Experience',
  },
  hi: {
    // Navigation
    projects: 'परियोजनाएं',
    certifications: 'प्रमाणपत्र',
    experience: 'अनुभव',
    skills: 'कौशल',
    blog: 'ब्लॉग और लेख',
    achievements: 'मुख्य उपलब्धियां',
    careerJourney: 'करियर यात्रा',
    
    // Actions
    backToTop: 'शीर्ष पर वापस जाएं',
    sendEmail: 'ईमेल भेजें',
    githubProfile: 'GitHub प्रोफ़ाइल',
    linkedin: 'LinkedIn',
    contactMe: 'संपर्क करें',
    contact: 'संपर्क',
    
    // UI Elements
    dragEnabled: 'ड्रैग सक्षम',
    dragDisabled: 'ड्रैग अक्षम',
    reset: 'रीसेट',
    customizableDashboard: 'अनुकूलन योग्य डैशबोर्ड',
    dragInstruction: 'ड्रैग हैंडल (⋮⋮) देखने के लिए किसी भी विजेट पर होवर करें। अनुभागों को पुनर्व्यवस्थित करने के लिए ड्रैग और ड्रॉप करें।',
    
    // Sections
    skillsTechnologies: 'कौशल और प्रौद्योगिकियां',
    cloudDevOps: 'क्लाउड और DevOps',
    frontend: 'फ्रंटएंड',
    backend: 'बैकएंड',
    
    // Status
    region: 'क्षेत्र',
    status: 'स्थिति',
    online: 'ऑनलाइन',
    version: 'संस्करण',
    
    // Certifications
    issued: 'जारी किया गया',
    verified: 'सत्यापित',
    
    // Projects
    production: 'उत्पादन',
    activeDevelopment: 'सक्रिय विकास',
    
    // Search
    searchPlaceholder: 'परियोजनाएं, कौशल, प्रमाणपत्र खोजें...',
    
    // Metrics
    githubStars: 'GitHub स्टार',
    totalCommits: 'कुल कमिट',
    blogReads: 'ब्लॉग पढ़ें',
    visitors: 'आगंतुक',
    
    // Time
    yearsExperience: 'अनुभव',
  },
  es: {
    // Navigation
    projects: 'Proyectos',
    certifications: 'Certificaciones',
    experience: 'Experiencia',
    skills: 'Habilidades',
    blog: 'Blog y Artículos',
    achievements: 'Logros Clave',
    careerJourney: 'Trayectoria Profesional',
    
    // Actions
    backToTop: 'Volver Arriba',
    sendEmail: 'Enviar Correo',
    githubProfile: 'Perfil de GitHub',
    linkedin: 'LinkedIn',
    contactMe: 'Contáctame',
    contact: 'Contacto',
    
    // UI Elements
    dragEnabled: 'Arrastre Habilitado',
    dragDisabled: 'Arrastre Deshabilitado',
    reset: 'Restablecer',
    customizableDashboard: 'Panel Personalizable',
    dragInstruction: 'Pase el cursor sobre cualquier widget para ver el controlador de arrastre (⋮⋮) a la izquierda. Arrastre y suelte para reorganizar las secciones.',
    
    // Sections
    skillsTechnologies: 'Habilidades y Tecnologías',
    cloudDevOps: 'Cloud y DevOps',
    frontend: 'Frontend',
    backend: 'Backend',
    
    // Status
    region: 'Región',
    status: 'Estado',
    online: 'En Línea',
    version: 'Versión',
    
    // Certifications
    issued: 'Emitido',
    verified: 'Verificado',
    
    // Projects
    production: 'Producción',
    activeDevelopment: 'Desarrollo Activo',
    
    // Search
    searchPlaceholder: 'Buscar proyectos, habilidades, certificaciones...',
    
    // Metrics
    githubStars: 'Estrellas de GitHub',
    totalCommits: 'Commits Totales',
    blogReads: 'Lecturas del Blog',
    visitors: 'Visitantes',
    
    // Time
    yearsExperience: 'Experiencia',
  },
};

type LocaleContextType = {
  locale: Locale;
  region: Region;
  setRegion: (region: Region) => void;
  t: (key: keyof typeof translations.en) => string;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<Region>(regions[0]); // Default to US (English)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedRegion = localStorage.getItem('aws-console-region');
    if (savedRegion) {
      const found = regions.find(r => r.code === savedRegion);
      if (found) {
        setRegionState(found);
      }
    }
  }, []);

  const setRegion = (newRegion: Region) => {
    setRegionState(newRegion);
    localStorage.setItem('aws-console-region', newRegion.code);
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[region.locale][key] || translations.en[key] || key;
  };

  const value = {
    locale: region.locale,
    region,
    setRegion,
    t,
  };

  if (!mounted) {
    // Provide default context during SSR
    return (
      <LocaleContext.Provider value={value}>
        {children}
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={{ locale: region.locale, region, setRegion, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    // Return default values during SSR or if provider is missing
    return {
      locale: 'en' as Locale,
      region: regions[1],
      setRegion: () => {},
      t: (key: keyof typeof translations.en) => translations.en[key] || key,
    };
  }
  return context;
}
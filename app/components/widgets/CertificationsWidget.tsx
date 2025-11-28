import { Award, ExternalLink } from "lucide-react";
import { FaAws } from "react-icons/fa";
import { SiGooglecloud } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { portfolioData } from "../../data/portfolio";
import { useLocale } from "../../context/LocaleContext";
import WidgetWrapper from "./WidgetWrapper";

// Icon mapping for certifications
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FaAws: FaAws,
  SiGooglecloud: SiGooglecloud,
  SiMicrosoftazure: VscAzure,
};

export default function CertificationsWidget() {
  const { t } = useLocale();

  return (
    <WidgetWrapper
      id="certifications"
      title={`${t('certifications')} (${portfolioData.certifications.length})`}
      icon={<Award size={18} />}
    >
      <div className="space-y-4">
        {portfolioData.certifications.map((cert, index) => {
          const IconComponent = iconMap[cert.icon] || FaAws;
          // Determine icon color based on provider
          const iconColorClass =
            cert.icon === 'FaAws' ? 'text-[#ff9900]' :
            cert.icon === 'SiGooglecloud' ? 'text-[#4285F4]' :
            cert.icon === 'SiMicrosoftazure' ? 'text-[#0078D4]' :
            'text-[#ff9900]';
          
          const CardContent = (
            <div className="flex items-start space-x-3">
              <div className="p-3 bg-opacity-10 rounded-lg">
                <IconComponent size={28} className={iconColorClass} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex-1 transition-colors">
                    {cert.name}
                  </h3>
                  {cert.Link && (
                    <ExternalLink size={16} className="text-gray-400 hover:text-[#ff9900] transition-colors" />
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {cert.issuer}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {t('issued')}: {cert.date}
                  </span>
                  <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
                    {t('verified')}
                  </span>
                </div>
              </div>
            </div>
          );

          if (cert.Link) {
            return (
              <a
                key={index}
                href={cert.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-[#ff9900] dark:hover:border-[#ff9900] transition-all bg-white dark:bg-gray-900 group hover:shadow-md cursor-pointer"
              >
                {CardContent}
              </a>
            );
          }

          return (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900"
            >
              {CardContent}
            </div>
          );
        })}
      </div>
    </WidgetWrapper>
  );
}

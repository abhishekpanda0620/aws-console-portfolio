import { portfolioData } from "../../data/portfolio";
import { useLocale } from "../../context/LocaleContext";
import WidgetWrapper from "./WidgetWrapper";

export default function SkillsWidget() {
  const { t } = useLocale();

  return (
    <WidgetWrapper
      id="skills"
      title={t('skillsTechnologies')}
      // No icon for this one in original, but we can add one if we want. 
      // The original code didn't have an icon in the header for skills, just text.
      // But WidgetWrapper expects an icon or handles it being undefined.
      // Let's check original: 
      // <h2 ...>{t('skillsTechnologies')}</h2> - No icon.
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t('cloudDevOps')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {portfolioData.skills.cloud.map((skill, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full border border-orange-300 dark:border-orange-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t('frontend')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {portfolioData.skills.frontend.map((skill, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t('backend')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {portfolioData.skills.backend.map((skill, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </WidgetWrapper>
  );
}

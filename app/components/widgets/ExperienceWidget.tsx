import { Briefcase } from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import { useLocale } from "../../context/LocaleContext";
import WidgetWrapper from "./WidgetWrapper";

export default function ExperienceWidget() {
  const { t } = useLocale();

  return (
    <WidgetWrapper
      id="experience"
      title={t('experience')}
      icon={<Briefcase size={18} />}
    >
      <div className="space-y-4">
        {portfolioData.experience.map((exp, index) => (
          <div
            key={index}
            className="border-l-4 border-[#ff9900] pl-4 py-2"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {exp.position}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {exp.company} • {exp.duration}
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {exp.responsibilities.slice(0, 3).map((resp, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-[#ff9900] mr-2">•</span>
                  {resp}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}

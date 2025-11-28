import { portfolioData } from "../../data/portfolio";
import { useLocale } from "../../context/LocaleContext";
import WidgetWrapper from "./WidgetWrapper";

export default function AchievementsWidget() {
  const { t } = useLocale();

  return (
    <WidgetWrapper
      id="achievements"
      title={t('achievements')}
    >
      <div className="space-y-3">
        {portfolioData.achievements.map((achievement, index) => (
          <div
            key={index}
            className="peer/achievement relative flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition-all duration-200"
          >
            {/* Metric Badge */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#ff9900] to-[#cc7a00] shadow-md">
                <span className="text-xl font-black text-white leading-none">
                  {achievement.metric}
                </span>
              </div>
            </div>
            
            {/* Description */}
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {achievement.description}
              </p>
            </div>

            {/* Hover indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff9900] opacity-0 peer-hover/achievement:opacity-100 transition-opacity duration-200 rounded-l-lg" />
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}

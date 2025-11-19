import { portfolioData } from "../../data/portfolio";
import { useLocale } from "../../context/LocaleContext";
import WidgetWrapper from "./WidgetWrapper";

export default function AchievementsWidget() {
  const { t } = useLocale();

  return (
    <WidgetWrapper
      id="achievements"
      title={`🏆 ${t('achievements')}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {portfolioData.achievements.map((achievement, index) => (
          <div
            key={index}
            className="relative p-4 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-800"
          >
            <div className="text-3xl font-bold text-[#ff9900] mb-2">
              {index === 0
                ? "90%"
                : index === 1
                ? "25%"
                : index === 2
                ? "40%"
                : "60%"}
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {achievement}
            </p>
            <div className="absolute top-2 right-2 text-2xl opacity-20">
              🏆
            </div>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}

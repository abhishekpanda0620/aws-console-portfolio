import { User } from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import { useLocale } from "../../context/LocaleContext";
import WidgetWrapper from "./WidgetWrapper";

export default function BioWidget() {
  const { t } = useLocale();

  return (
    <WidgetWrapper
      id="bio"
      title="About Me"
      icon={<User size={18} />}
    >
      <div className="text-gray-700 dark:text-gray-300 space-y-4 leading-relaxed">
        {portfolioData.personal.bio.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </WidgetWrapper>
  );
}

import { ExternalLink } from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import { useLocale } from "../../context/LocaleContext";
import WidgetWrapper from "./WidgetWrapper";

export default function BlogWidget() {
  const { t } = useLocale();

  return (
    <WidgetWrapper
      id="blog"
      title={t('blog')}
    >
      <div className="space-y-3">
        {portfolioData.blog.map((post, index) => (
          <a
            key={index}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:border-[#ff9900] dark:hover:border-[#ff9900] transition-colors bg-white dark:bg-gray-900"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  {post.title}
                </h3>
                <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-500">
                  <span>{post.date}</span>
                  {post.views && (
                    <>
                      <span>•</span>
                      <span>{post.views} views</span>
                    </>
                  )}
                </div>
              </div>
              <ExternalLink
                size={16}
                className="text-gray-400 dark:text-gray-600"
              />
            </div>
          </a>
        ))}
      </div>
    </WidgetWrapper>
  );
}

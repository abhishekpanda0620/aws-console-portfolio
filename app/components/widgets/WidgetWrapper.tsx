import { ReactNode } from "react";

interface WidgetWrapperProps {
  id: string;
  title: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function WidgetWrapper({
  id,
  title,
  icon,
  children,
  className = "",
}: WidgetWrapperProps) {
  return (
    <div
      id={id}
      className={`border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 scroll-mt-6 flex flex-col h-[400px] sm:h-[500px] ${className}`}
    >
      <div className="p-3 sm:p-4 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2 pl-6">
          {icon && <span className="text-[#ff9900]">{icon}</span>}
          <span>{title}</span>
        </h2>
      </div>
      <div className="p-3 sm:p-6 overflow-y-auto flex-1">{children}</div>
    </div>
  );
}

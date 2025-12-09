

import React from "react";
import { LifeData } from "../utils/lifeCalculations";

interface AgeSummaryCardProps {
  lifeData: LifeData;
  textPrimaryClass: string;
  textSecondaryClass: string;
}
const AgeSummaryCard: React.FC<AgeSummaryCardProps> = ({ lifeData, textPrimaryClass, textSecondaryClass }) => {
  if (!lifeData || !lifeData.ageBreakdown) return null;
  const age = lifeData.ageBreakdown;



  return (
    <div className={"p-8 sm:p-12 mb-8 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm transition-colors duration-300 w-full"}>
      <h2 className={`text-2xl sm:text-3xl font-semibold ${textPrimaryClass} mb-6 animate-fadeIn tracking-tight`}>
        You are precisely
      </h2>
      <div className={`mb-8 text-base sm:text-lg ${textSecondaryClass} font-normal animate-fadeIn leading-relaxed`}>
        {age.years} {age.years === 1 ? 'year' : 'years'}, {age.months} {age.months === 1 ? 'month' : 'months'}, {age.days} {age.days === 1 ? 'day' : 'days'}, {age.hours} {age.hours === 1 ? 'hour' : 'hours'}, {age.minutes} {age.minutes === 1 ? 'minute' : 'minutes'}, and {age.seconds} {age.seconds === 1 ? 'second' : 'seconds'} old
      </div>

    </div>
  );
};
export default AgeSummaryCard;


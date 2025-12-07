// @ts-nocheck

import React from "react";
interface AgeSummaryCardProps {
  lifeData: any;
  textPrimaryClass: string;
  textSecondaryClass: string;
}
const AgeSummaryCard: React.FC<AgeSummaryCardProps> = ({ lifeData, textPrimaryClass, textSecondaryClass }) => {
  if (!lifeData || !lifeData.ageBreakdown) return null;
  const age = lifeData.ageBreakdown;
  return (
    <div className={"p-6 rounded-xl border bg-white dark:bg-zinc-900 shadow-sm mb-4 " + textPrimaryClass}>
      <h2 className="text-lg font-semibold mb-2">Your Age Summary</h2>
      <div className={textSecondaryClass + " text-base"}>
        {age.years} years, {age.months} months, {age.days} days,
        {" "}{age.hours} hours, {age.minutes} minutes, {age.seconds} seconds old
      </div>
    </div>
  );
};
export default AgeSummaryCard;


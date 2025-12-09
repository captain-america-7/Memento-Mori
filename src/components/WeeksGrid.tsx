import React from "react";
import { LifeData } from "../utils/lifeCalculations";

interface Chapter {
  label: string;
  start: number;
  end: number;
}

interface WeeksGridProps {
  lifeData: LifeData;
  markedWeeks: { [key: number]: string };
  handleWeekClick: (weekNum: number) => void;
  darkMode: boolean;
  isAnimating: boolean;
  lifeChapters: Chapter[];
}
const WeeksGrid: React.FC<WeeksGridProps> = (props) => {
  if (!props.lifeData) return null;

  // Responsive columns (mobile: 26, desktop: 52)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const weeksPerRow = isMobile ? 26 : 52;
  const { totalWeeks } = props.lifeData;
  const rows = Math.ceil(totalWeeks / weeksPerRow);

  // Chapter logic per row
  function getYearAtRow(rowIdx: number) {
    return Math.floor((rowIdx * weeksPerRow) / 52);
  }
  function getChapterForRow(rowIdx: number) {
    const yearAtRow = getYearAtRow(rowIdx);
    return props.lifeChapters.find(
      (ch) => yearAtRow >= ch.start && yearAtRow < ch.end
    );
  }
  function isChapterStart(rowIdx: number) {
    const yearAtRow = getYearAtRow(rowIdx);
    return props.lifeChapters.some((ch) => ch.start === yearAtRow);
  }

  // Actual rendering
  return (
    <div className="overflow-hidden w-full px-2 sm:px-0">
      <div className="w-full">
        {/* Header row: empty label cell, then 1...weeksPerRow */}
        <div
          className="grid gap-0.5 sm:gap-1"
          style={{
            gridTemplateColumns: `30px repeat(${weeksPerRow}, minmax(0, 1fr))`,
            marginBottom: 8
          }}
        >
          <div></div>
          {Array.from({ length: weeksPerRow }).map((_, i) => (
            <div key={i} className="text-[8px] sm:text-[10px] text-center text-zinc-400 dark:text-zinc-500 select-none">
              {i + 1}
            </div>
          ))}
        </div>
        {/* Weeks rows */}
        {Array.from({ length: rows }).map((_, rowIdx) => {
          const rowStartWeek = rowIdx * weeksPerRow;

          const chapter = getChapterForRow(rowIdx);
          const chapterLabel = isChapterStart(rowIdx) && chapter ? chapter.label : "";
          return (
            <div
              key={rowIdx}
              className="grid items-center gap-0.5 sm:gap-1"
              style={{
                gridTemplateColumns: `30px repeat(${weeksPerRow}, minmax(0, 1fr))`,
                marginBottom: 2
              }}
            >
              <div className={`text-[8px] sm:text-[10px] font-medium w-full text-right uppercase tracking-wider pr-2 ${props.darkMode ? 'text-zinc-500' : 'text-zinc-500'}`.trim()}>
                {chapterLabel && <span className="hidden sm:inline">{chapterLabel}</span>}
                {chapterLabel && <span className="sm:hidden">{chapterLabel.substring(0, 1)}</span>}
              </div>
              {Array.from({ length: weeksPerRow }).map((_, weekOfRowIdx) => {
                const weekNum = rowStartWeek + weekOfRowIdx;
                if (weekNum >= totalWeeks) return <div key={weekOfRowIdx}></div>;
                const isLived = weekNum < props.lifeData.weeksLived;
                const isMarked = props.markedWeeks[weekNum];
                const base = isLived
                  ? props.darkMode ? 'bg-white hover:bg-zinc-300' : 'bg-black hover:bg-zinc-700'
                  : props.darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300';
                const markRing = isMarked
                  ? props.darkMode ? 'ring-1 ring-blue-400' : 'ring-1 ring-blue-500'
                  : '';
                const anim = props.isAnimating ? 'opacity-0 animate-fadeIn' : '';
                return (
                  <div
                    key={weekOfRowIdx}
                    onClick={() => props.handleWeekClick(weekNum)}
                    title={`Week ${weekNum + 1}`}
                    className={`w-full aspect-square max-w-[10px] sm:max-w-[12px] rounded-[1px] cursor-pointer transition-all duration-200 m-auto ${base} ${markRing} ${anim}`}
                    style={{ animationDelay: `${(rowIdx * weeksPerRow + weekOfRowIdx) * 0.3}ms` }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default WeeksGrid;


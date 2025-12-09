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
  viewMode: 'weeks' | 'months' | 'years';
}
const WeeksGrid: React.FC<WeeksGridProps> = (props) => {
  if (!props.lifeData) return null;

  // Responsive columns (mobile: 26, desktop: 52)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  let itemsPerRow = 52;
  let totalItems = props.lifeData.totalWeeks;

  if (props.viewMode === 'months') {
    itemsPerRow = 12;
    totalItems = props.lifeData.lifeExpectancy * 12;
  } else if (props.viewMode === 'years') {
    itemsPerRow = 10;
    totalItems = props.lifeData.lifeExpectancy;
  } else {
    itemsPerRow = isMobile ? 26 : 52;
  }

  const rows = Math.ceil(totalItems / itemsPerRow);

  // Chapter logic per row
  function getYearAtRow(rowIdx: number) {
    if (props.viewMode === 'years') {
      return rowIdx * 10; // Each row is a decade
    }
    if (props.viewMode === 'months') {
      return rowIdx; // Each row is a year
    }
    return Math.floor((rowIdx * itemsPerRow) / 52);
  }

  function getChapterForRow(rowIdx: number) {
    const yearAtRow = getYearAtRow(rowIdx);
    return props.lifeChapters.find(
      (ch) => yearAtRow >= ch.start && yearAtRow < ch.end
    );
  }
  function isChapterStart(rowIdx: number) {
    const yearAtRow = getYearAtRow(rowIdx);
    // For years view, show chapter if the decade overlaps with chapter start
    if (props.viewMode === 'years') {
      return props.lifeChapters.some((ch) => ch.start >= yearAtRow && ch.start < yearAtRow + 10);
    }
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
            gridTemplateColumns: `30px repeat(${itemsPerRow}, minmax(0, 1fr))`,
            marginBottom: 8
          }}
        >
          <div></div>
          {Array.from({ length: itemsPerRow }).map((_, i) => (
            <div key={i} className="text-[8px] sm:text-[10px] text-center text-zinc-400 dark:text-zinc-500 select-none">
              {i + 1}
            </div>
          ))}
        </div>
        {/* Weeks rows */}
        {Array.from({ length: rows }).map((_, rowIdx) => {
          const rowStartItem = rowIdx * itemsPerRow;

          const chapter = getChapterForRow(rowIdx);
          let chapterLabel = "";

          if (props.viewMode === 'years') {
            // For years view, simplified chapter logic or just show decade label
            const year = rowIdx * 10;
            const matchingChapter = props.lifeChapters.find(ch => ch.start === year);
            if (matchingChapter) chapterLabel = matchingChapter.label;
          } else {
            chapterLabel = isChapterStart(rowIdx) && chapter ? chapter.label : "";
          }

          return (
            <div
              key={rowIdx}
              className="grid items-center gap-0.5 sm:gap-1"
              style={{
                gridTemplateColumns: `30px repeat(${itemsPerRow}, minmax(0, 1fr))`,
                marginBottom: 2
              }}
            >
              <div className={`text-[8px] sm:text-[10px] font-medium w-full text-right uppercase tracking-wider pr-2 ${props.darkMode ? 'text-zinc-500' : 'text-zinc-500'}`.trim()}>
                {chapterLabel && <span className="hidden sm:inline">{chapterLabel}</span>}
                {chapterLabel && <span className="sm:hidden">{chapterLabel.substring(0, 1)}</span>}
              </div>
              {Array.from({ length: itemsPerRow }).map((_, itemOfRowIdx) => {
                const itemNum = rowStartItem + itemOfRowIdx;
                if (itemNum >= totalItems) return <div key={itemOfRowIdx}></div>;

                let isLived = false;
                let isMarked = false;
                let title = "";
                let clickHandler = () => { };

                if (props.viewMode === 'weeks') {
                  isLived = itemNum < props.lifeData.weeksLived;
                  isMarked = !!props.markedWeeks[itemNum];
                  title = `Week ${itemNum + 1}`;
                  clickHandler = () => props.handleWeekClick(itemNum);
                } else if (props.viewMode === 'months') {
                  const monthsLivedTotal = props.lifeData.yearsLived * 12 + props.lifeData.monthsLived;
                  isLived = itemNum < monthsLivedTotal;
                  title = `Month ${itemNum + 1}`;
                } else if (props.viewMode === 'years') {
                  isLived = itemNum < props.lifeData.yearsLived;
                  title = `Year ${itemNum + 1}`;
                }

                const base = isLived
                  ? props.darkMode ? 'bg-white hover:bg-zinc-300' : 'bg-black hover:bg-zinc-700'
                  : props.darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300';
                const markRing = isMarked
                  ? props.darkMode ? 'ring-1 ring-blue-400' : 'ring-1 ring-blue-500'
                  : '';
                const anim = props.isAnimating ? 'opacity-0 animate-fadeIn' : '';

                // Adjust size based on view mode
                const sizeClass = props.viewMode === 'years'
                  ? 'w-full aspect-square max-w-[20px] sm:max-w-[24px]'
                  : props.viewMode === 'months'
                    ? 'w-full aspect-square max-w-[16px] sm:max-w-[20px]'
                    : 'w-full aspect-square max-w-[10px] sm:max-w-[12px]';

                return (
                  <div
                    key={itemOfRowIdx}
                    onClick={clickHandler}
                    title={title}
                    className={`${sizeClass} rounded-[1px] cursor-pointer transition-all duration-200 m-auto ${base} ${markRing} ${anim}`}
                    style={{ animationDelay: `${(rowIdx * itemsPerRow + itemOfRowIdx) * 0.3}ms` }}
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


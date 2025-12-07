import React from "react";
interface WeeksGridProps {
  lifeData: any;
  markedWeeks: { [key: number]: string };
  handleWeekClick: (weekNum: number) => void;
  darkMode: boolean;
  isAnimating: boolean;
  lifeChapters: any[];
}
const WeeksGrid: React.FC<WeeksGridProps> = (props) => {
  if (!props.lifeData) return null;
  const { totalWeeks } = props.lifeData;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(52, 1fr)', gap: 2 }}>
      {Array.from({ length: totalWeeks }).map((_, weekIdx) => (
        <div
          key={weekIdx}
          onClick={() => props.handleWeekClick(weekIdx)}
          style={{
            width: 10,
            height: 10,
            background: props.markedWeeks[weekIdx] ? '#2563eb' : '#d1d5db',
            cursor: 'pointer',
            borderRadius: 2,
            border: '1px solid #888',
          }}
          title={`Week ${weekIdx + 1}`}
        />
      ))}
    </div>
  );
};
export default WeeksGrid;


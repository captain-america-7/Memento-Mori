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
  const totalWeeks = props.lifeData.totalWeeks;
  const weeksPerRow = 52;
  const numRows = Math.ceil(totalWeeks / weeksPerRow);
  
  return (
    <div>
      {/* Header row */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${weeksPerRow}, 1fr)`, marginBottom: 8 }}>
        {Array.from({ length: weeksPerRow }).map((_, i) => (
          <div key={i} style={{ fontSize: 10, textAlign: 'center', color: '#888' }}>
            {i+1}
          </div>
        ))}
      </div>
      {/* Weeks grid */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${weeksPerRow}, 1fr)`, gap: 2 }}>
        {Array.from({ length: totalWeeks }).map((_, weekIdx) => (
          <div
            key={weekIdx}
            onClick={() => props.handleWeekClick(weekIdx)}
            style={{
              width: 12,
              height: 12,
              margin: '0 auto',
              background: props.markedWeeks[weekIdx] ? '#2563eb' : '#d1d5db',
              cursor: 'pointer',
              borderRadius: 2,
              border: '1px solid #888',
            }}
            title={`Week ${weekIdx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
export default WeeksGrid;


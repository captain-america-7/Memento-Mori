import React from "react";

interface WeekNoteModalProps {
  open: boolean;
  selectedWeek: number | null;
  weekNote: string;
  onChange: (v: string) => void;
  onSave: () => void;
  onClose: () => void;
  lifeData: any;
  darkMode: boolean;
  borderClass: string;
  textPrimaryClass: string;
  textSecondaryClass: string;
  cardBgClass: string;
}

function getWeekDate(lifeData: any, weekIdx: number | null): string {
  if (!lifeData || weekIdx == null || !lifeData.birthDate) return '';
  try {
    const weekMs = weekIdx * 7 * 24 * 60 * 60 * 1000;
    const weekDate = new Date(lifeData.birthDate.getTime() + weekMs);
    // IST conversion
    const utc = weekDate.getTime() + (weekDate.getTimezoneOffset() * 60000);
    const ist = new Date(utc + (5.5 * 3600000));
    return ist.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } catch {
    return '';
  }
}

const WeekNoteModal: React.FC<WeekNoteModalProps> = (props) => {
  if (!props.open || props.selectedWeek == null) return null;
  const weekLabel = `Week ${props.selectedWeek + 1}`;
  const weekDate = getWeekDate(props.lifeData, props.selectedWeek);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${props.cardBgClass} p-6 rounded-2xl max-w-md w-full`}>
        <h3 className={`text-xl font-semibold ${props.textPrimaryClass} mb-4 tracking-tight`}>{weekLabel}</h3>
        <p className={`text-sm ${props.textSecondaryClass} font-normal mb-6`}>{weekDate}</p>
        <label className={`block text-sm font-medium ${props.textPrimaryClass} mb-3`}>What made this week meaningful?</label>
        <textarea
          value={props.weekNote}
          onChange={e => props.onChange(e.target.value)}
          className={`w-full px-4 py-3 border ${props.borderClass} ${props.textPrimaryClass} ${props.cardBgClass} text-sm font-normal rounded-xl focus:outline-none focus:ring-2 ${props.darkMode ? 'focus:ring-white' : 'focus:ring-black'} transition-all resize-none`}
          rows={3}
          placeholder="Optional note..."
        />
        <div className="flex gap-3 mt-6">
          <button
            onClick={props.onSave}
            className={`flex-1 px-4 py-3 ${props.darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'} text-sm font-medium transition-all rounded-xl`}
          >Save</button>
          <button
            onClick={props.onClose}
            className={`flex-1 px-4 py-3 border ${props.borderClass} ${props.textSecondaryClass} hover:${props.textPrimaryClass} text-sm font-medium transition-all rounded-xl`}
          >Cancel</button>
        </div>
      </div>
    </div>
  );
};
export default WeekNoteModal;

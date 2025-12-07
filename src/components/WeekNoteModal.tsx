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

const WeekNoteModal: React.FC<WeekNoteModalProps> = (props) => {
  if (!props.open || props.selectedWeek == null) return null;
  // ...modal structure to be filled...
  return <div>WeekNoteModal goes here</div>;
};

export default WeekNoteModal;

import React from "react";
interface AiChatPanelProps {
  open: boolean;
  chatMessages: any[];
  userQuestion: string;
  setUserQuestion: (v: string) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  darkMode: boolean;
  textPrimaryClass: string;
  textSecondaryClass: string;
  cardBgClass: string;
  borderClass: string;
}
const AiChatPanel: React.FC<AiChatPanelProps> = (props) => {
  if (!props.open) return null;
  // ...chat panel structure goes here...
  return <div>AiChatPanel goes here</div>;
};
export default AiChatPanel;

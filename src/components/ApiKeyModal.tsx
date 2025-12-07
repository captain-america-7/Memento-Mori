import React from "react";
interface ApiKeyModalProps {
  open: boolean;
  geminiApiKey: string;
  setGeminiApiKey: (v: string) => void;
  onSave: () => void;
  onClear: () => void;
  onClose: () => void;
  darkMode: boolean;
  borderClass: string;
  textPrimaryClass: string;
  textSecondaryClass: string;
  cardBgClass: string;
}
const ApiKeyModal: React.FC<ApiKeyModalProps> = (props) => {
  if (!props.open) return null;
  // ...modal structure to be filled...
  return <div>ApiKeyModal goes here</div>;
};
export default ApiKeyModal;

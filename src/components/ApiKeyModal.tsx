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
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${props.cardBgClass} p-6 rounded-2xl max-w-md w-full`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl font-semibold ${props.textPrimaryClass} tracking-tight`}>
            Gemini API Key
          </h3>
          <button
            onClick={props.onClose}
            className={`p-1 rounded-full ${props.textSecondaryClass} hover:${props.textPrimaryClass} transition-colors`}
          >
            ×
          </button>
        </div>
        <div className={`mb-4 p-4 rounded-xl ${props.darkMode ? 'bg-zinc-800' : 'bg-zinc-100'} border ${props.borderClass}`}>
          <p className={`text-xs ${props.textSecondaryClass} mb-2 font-medium`}>
            How to get your API key:
          </p>
          <ol className={`text-xs ${props.textSecondaryClass} space-y-1 list-decimal list-inside`}>
            <li>
              Visit{' '}
              <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">
                Google AI Studio
              </a>
            </li>
            <li>Sign in with your Google account</li>
            <li>Click "Create API Key"</li>
            <li>Copy and paste it here</li>
          </ol>
        </div>
        <label className={`block text-sm font-medium ${props.textPrimaryClass} mb-2`}>API Key</label>
        <input
          type="password"
          value={props.geminiApiKey}
          onChange={e => props.setGeminiApiKey(e.target.value)}
          placeholder="Enter your Gemini API key"
          className={`w-full px-4 py-3 border ${props.borderClass} ${props.textPrimaryClass} ${props.cardBgClass} text-sm font-normal rounded-xl focus:outline-none focus:ring-2 ${props.darkMode ? 'focus:ring-white' : 'focus:ring-black'} transition-all mb-4`}
        />
        <div className="flex gap-3">
          <button
            onClick={props.onSave}
            className={`flex-1 px-4 py-3 ${props.darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'} text-sm font-medium transition-all rounded-xl`}
          >
            Save
          </button>
          <button
            onClick={props.onClear}
            className={`flex-1 px-4 py-3 border ${props.borderClass} ${props.textSecondaryClass} hover:${props.textPrimaryClass} text-sm font-medium transition-all rounded-xl`}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
export default ApiKeyModal;

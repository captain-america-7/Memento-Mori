import React, { useRef, useEffect } from "react";
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
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [props.chatMessages, props.open]);
  if (!props.open) return null;

  return (
    <div className={`fixed bottom-4 right-4 w-[calc(100%-2rem)] sm:w-full max-w-md h-[500px] sm:h-[600px] ${props.cardBgClass} rounded-2xl shadow-2xl flex flex-col z-50 border ${props.borderClass} transition-all duration-300`}>
      <div className={`flex items-center justify-between p-4 border-b ${props.borderClass}`}>
        <div className="flex items-center gap-3">
          <span role="img" aria-label="Ai" className={props.textPrimaryClass}>🤖</span>
          <h3 className={`text-lg font-semibold ${props.textPrimaryClass}`}>AI Insights</h3>
        </div>
        <button
          onClick={props.onClose}
          className={`p-1 rounded-full ${props.textSecondaryClass} hover:${props.textPrimaryClass} transition-colors`}
        >
          ×
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {props.chatMessages.length === 0 ? (
          <div className={`text-center py-8 ${props.textSecondaryClass}`}>
            <span className="text-6xl opacity-50">🤖</span>
            <p className="text-sm font-light mt-4 mb-2">Ask me anything about your life, time, or mortality.</p>
            <p className="text-xs opacity-75">I'll provide insights based on your life data.</p>
          </div>
        ) : (
          props.chatMessages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 ${msg.role === 'user'
                  ? props.darkMode
                    ? 'bg-white text-black'
                    : 'bg-black text-white'
                  : `${props.cardBgClass} border ${props.borderClass} ${props.textPrimaryClass}`}`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        {props.isLoading && (
          <div className="flex justify-start">
            <div className={`${props.cardBgClass} border ${props.borderClass} rounded-xl px-4 py-3 ${props.textSecondaryClass}`}>
              <span className="mr-2">AI is typing</span>
              <span className="animate-spin inline-block h-4 w-4 border-2 border-zinc-300 border-t-blue-400 rounded-full"></span>
            </div>
          </div>
        )}
        <div ref={bottomRef}></div>
      </div>
      <form onSubmit={props.handleSubmit} className={`p-4 border-t ${props.borderClass}`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={props.userQuestion}
            onChange={e => props.setUserQuestion(e.target.value)}
            placeholder="Ask a question..."
            disabled={props.isLoading}
            className={`flex-1 px-4 py-2 border ${props.borderClass} ${props.textPrimaryClass} ${props.cardBgClass} text-sm rounded-xl focus:outline-none focus:ring-2 ${props.darkMode ? 'focus:ring-white' : 'focus:ring-black'} transition-all disabled:opacity-50`}
          />
          <button
            type="submit"
            disabled={!props.userQuestion.trim() || props.isLoading}
            className={`p-2 ${props.darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'} rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span role="img" aria-label="Send">➡️</span>
          </button>
        </div>
      </form>
    </div>
  );
};
export default AiChatPanel;

/// <reference types="vite/client" />



import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import AgeSummaryCard from "./components/AgeSummaryCard";
import WeeksGrid from "./components/WeeksGrid";
import StatsSection from "./components/StatsSection";
import WeekNoteModal from "./components/WeekNoteModal";
import AiChatPanel from "./components/AiChatPanel";
import ApiKeyModal from "./components/ApiKeyModal";
import { calculateLifeData, LifeData, getISTTime } from "./utils/lifeCalculations";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface MajorEvent {
  year: number;
  title: string;
  description: string;
}

import { Calendar, Sun, Moon, MessageSquare, Settings } from 'lucide-react';

const MODEL_NAME = "models/gemini-2.5-flash";

export default function App() {


  const [step, setStep] = useState(1);
  const [birthDate, setBirthDate] = useState('');
  const [lifeExpectancy, setLifeExpectancy] = useState<number | 'custom'>(80);
  const [customExpectancy, setCustomExpectancy] = useState('');
  const [lifeData, setLifeData] = useState<LifeData | null>(null);
  const [markedWeeks, setMarkedWeeks] = useState<{ [key: number]: string }>({});
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [weekNote, setWeekNote] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewMode, setViewMode] = useState<'weeks' | 'months' | 'years'>('weeks');

  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userQuestion, setUserQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [majorEvents, setMajorEvents] = useState<MajorEvent[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);

  const lifeChapters = [
    { label: 'Childhood', start: 0, end: 12 },
    { label: 'Adolescence', start: 13, end: 19 },
    { label: 'Early adulthood', start: 20, end: 29 },
    { label: 'Middle age', start: 30, end: 59 },
    { label: 'Later life', start: 60, end: 150 }
  ];

  // Helper function to get API key (env var takes precedence)
  const getApiKey = () => {
    return import.meta.env.VITE_GEMINI_API_KEY || geminiApiKey || '';
  };

  useEffect(() => {
    const saved = localStorage.getItem('markedWeeks');
    if (saved) setMarkedWeeks(JSON.parse(saved));

    const darkPreference = localStorage.getItem('darkMode');
    if (darkPreference) setDarkMode(darkPreference === 'true');

    // Only load from localStorage if no env var is set
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      const savedApiKey = localStorage.getItem('geminiApiKey');
      if (savedApiKey) setGeminiApiKey(savedApiKey);
    }
  }, []);

  // Fetch major events when lifeData is available
  useEffect(() => {
    if (lifeData && getApiKey()) {
      fetchMajorEvents();
    }
  }, [lifeData, geminiApiKey, import.meta.env.VITE_GEMINI_API_KEY]);





  const handleSubmit = () => {
    if (birthDate) {
      const expectancy = lifeExpectancy === 'custom' ? parseInt(customExpectancy) : lifeExpectancy;
      const data = calculateLifeData(birthDate, expectancy as number);
      setLifeData(data);
      setIsAnimating(true);
      setStep(2);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const handleWeekClick = (weekNum: number) => {
    setSelectedWeek(weekNum);
    setWeekNote(markedWeeks[weekNum] || '');
  };

  const saveWeekNote = () => {
    if (selectedWeek === null) return;
    const updated = { ...markedWeeks, [selectedWeek]: weekNote };
    setMarkedWeeks(updated);
    localStorage.setItem('markedWeeks', JSON.stringify(updated));
    setSelectedWeek(null);
    setWeekNote('');
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  const saveApiKey = () => {
    localStorage.setItem('geminiApiKey', geminiApiKey);
    setShowApiKeyInput(false);
  };

  const askGemini = async (question: string) => {
    const apiKey = getApiKey();
    if (!apiKey) {
      setShowApiKeyInput(true);
      return;
    }

    setIsLoading(true);
    const userMessage: ChatMessage = { role: 'user', content: question };
    setChatMessages(prev => [...prev, userMessage]);
    setUserQuestion('');

    try {
      // Create context with life data
      const contextPrompt = lifeData ? `
You are a helpful assistant providing insights about life, time, and mortality based on the user's life data.

User's Life Data:
- Age: ${lifeData.yearsLived} years, ${lifeData.monthsLived} months, ${lifeData.daysLived} days
- Weeks lived: ${lifeData.weeksLived.toLocaleString()} of ${lifeData.totalWeeks.toLocaleString()} (${lifeData.percentageLived}% lived)
- Weeks remaining: ${lifeData.weeksRemaining.toLocaleString()}
- Heartbeats: ${lifeData.heartBeats.toLocaleString()}
- Breaths: ${lifeData.breaths.toLocaleString()}
- Birth date: ${lifeData.birthDate.toLocaleDateString()}
- Life expectancy: ${lifeData.lifeExpectancy} years

Provide thoughtful, empathetic, and meaningful insights. Be concise but profound.
` : 'You are a helpful assistant providing insights about life, time, and mortality.';

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/${MODEL_NAME}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${contextPrompt}\n\nUser question: ${question}`
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response format from Gemini API');
      }

      const aiResponse = data.candidates[0].content.parts[0].text;

      setChatMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error: any) {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${error.message}. Please check your API key and try again.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userQuestion.trim() && !isLoading) {
      askGemini(userQuestion);
    }
  };

  const fetchMajorEvents = async () => {
    const apiKey = getApiKey();
    if (!apiKey || !lifeData) return;

    setIsLoadingEvents(true);
    try {
      const birthYear = lifeData.birthDate.getFullYear();
      const currentYear = new Date().getFullYear();

      const prompt = `List exactly 5 major historical events that happened between ${birthYear} and ${currentYear}.
      These should be globally significant events like major political changes, technological breakthroughs,
      significant cultural moments, or major world events.

      Format your response as a JSON array with exactly 5 objects, each with:
      - "year": the year the event occurred (number)
      - "title": a brief title (string, max 60 characters)
      - "description": a concise description (string, max 150 characters)

      Return ONLY valid JSON, no additional text. Example format:
      [{"year": 2001, "title": "9/11 Attacks", "description": "Terrorist attacks on the World Trade Center and Pentagon"}, ...]`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/${MODEL_NAME}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch major events');
      }

      const data = await response.json();
      const responseText = data.candidates[0].content.parts[0].text;

      // Extract JSON from response (handle markdown code blocks if present)
      let jsonText = responseText.trim();
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      }

      const events = JSON.parse(jsonText);

      // Ensure we have exactly 5 events, sorted by year
      const sortedEvents = events.slice(0, 5).sort((a: any, b: any) => a.year - b.year);
      setMajorEvents(sortedEvents);
    } catch (error) {
      console.error('Error fetching major events:', error);
      // Set empty array on error to avoid showing error state
      setMajorEvents([]);
    } finally {
      setIsLoadingEvents(false);
    }
  };





  // Class and theme-related variables

  const cardBgClass = darkMode ? 'bg-zinc-900' : 'bg-zinc-50';
  const textPrimaryClass = darkMode ? 'text-white' : 'text-black';
  const textSecondaryClass = darkMode ? 'text-zinc-400' : 'text-zinc-600';
  const borderClass = darkMode ? 'border-zinc-800' : 'border-zinc-200';

  if (step === 1) {
    return (
      <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <Calendar className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 sm:mb-6 ${darkMode ? 'text-neutral-300' : 'text-neutral-800'}`} strokeWidth={1.5} />
            <h1 className={`text-2xl sm:text-3xl font-light ${darkMode ? 'text-white' : 'text-black'} mb-3 sm:mb-4`}>
              Life in weeks
            </h1>
            <p className={`text-sm sm:text-base ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} font-light leading-relaxed`}>
              Each life contains thousands of weeks.<br />
              Let's visualize yours.
            </p>
          </div>
          <div className="space-y-6 sm:space-y-8">
            <div>
              <label htmlFor="birthdate" className={`block text-xs sm:text-sm font-light ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} mb-3`}>
                When were you born?
              </label>
              <input
                type="date"
                id="birthdate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={getISTTime().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 sm:py-4 border ${darkMode ? 'border-zinc-800' : 'border-zinc-200'} ${darkMode ? 'text-white' : 'text-black'} ${darkMode ? 'bg-zinc-900' : 'bg-zinc-50'} text-sm sm:text-base font-normal rounded-xl focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-white' : 'focus:ring-black'} transition-all`}
              />
              <p className={`mt-2 text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} font-light`}>
                Your data is stored only on this device
              </p>
            </div>
            <div>
              <label className={`block text-xs sm:text-sm font-light ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} mb-3`}>
                Plan for
              </label>
              <div className="flex gap-2 mb-3">
                {[70, 80, 90, 'custom'].map((val) => (
                  <button
                    key={val}
                    onClick={() => setLifeExpectancy(val as number | 'custom')}
                    className={`flex-1 px-4 py-3 text-sm font-medium border ${darkMode ? 'border-zinc-800' : 'border-zinc-200'} transition-all rounded-lg ${lifeExpectancy === val
                      ? darkMode
                        ? 'bg-white text-black border-white'
                        : 'bg-black text-white border-black'
                      : darkMode
                        ? 'bg-zinc-900 text-zinc-400 hover:text-white'
                        : 'bg-white text-zinc-600 hover:text-black'}
                    `}
                  >
                    {val === 'custom' ? 'Custom' : `${val} years`}
                  </button>
                ))}
              </div>
              {lifeExpectancy === 'custom' && (
                <input
                  type="number"
                  value={customExpectancy}
                  onChange={(e) => setCustomExpectancy(e.target.value)}
                  min="1"
                  max="150"
                  placeholder="Enter years"
                  className={`w-full px-4 py-3 border ${darkMode ? 'border-zinc-800' : 'border-zinc-200'} ${darkMode ? 'text-white' : 'text-black'} ${darkMode ? 'bg-zinc-900' : 'bg-zinc-50'} text-sm font-normal rounded-xl focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-white' : 'focus:ring-black'} transition-all`}
                />
              )}
              <p className={`mt-2 text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} font-light`}>
                This is just a planning number, not a prediction
              </p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!birthDate || (lifeExpectancy === 'custom' && !customExpectancy)}
              className={`w-full px-6 py-4 ${darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'} text-base font-medium transition-all rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'focus:ring-white' : 'focus:ring-black'} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Continue
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!lifeData) return null;

  return (
    <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes countUp {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-countUp {
          animation: countUp 0.5s ease-out;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <button
            onClick={() => setStep(1)}
            className={`text-xs sm:text-sm ${textSecondaryClass} hover:${textPrimaryClass} font-light transition-colors`}
          >
            ← Change birth date
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowChat(!showChat)}
              className={`p-2 rounded-full ${darkMode ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-600 hover:text-neutral-900'} transition-colors relative`}
              title="Ask AI insights"
            >
              <MessageSquare className="w-4 h-4" />
              {chatMessages.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => setShowApiKeyInput(true)}
              className={`p-2 rounded-full ${darkMode ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-600 hover:text-neutral-900'} transition-colors`}
              title="API Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-600 hover:text-neutral-900'} transition-colors`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className={`flex p-1 rounded-lg ${darkMode ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
            {(['weeks', 'months', 'years'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all capitalize ${viewMode === mode
                    ? darkMode
                      ? 'bg-zinc-800 text-white shadow-sm'
                      : 'bg-white text-black shadow-sm'
                    : darkMode
                      ? 'text-zinc-500 hover:text-zinc-300'
                      : 'text-zinc-500 hover:text-zinc-700'
                  }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Age Summary */}
        <AgeSummaryCard lifeData={lifeData} textPrimaryClass={textPrimaryClass} textSecondaryClass={textSecondaryClass} />
        {/* Weeks Grid */}
        <WeeksGrid
          lifeData={lifeData}
          markedWeeks={markedWeeks}
          handleWeekClick={handleWeekClick}
          darkMode={darkMode}
          isAnimating={isAnimating}
          lifeChapters={lifeChapters}
          viewMode={viewMode}
        />
        {/* Stats Section and Major Events */}
        <StatsSection
          lifeData={lifeData}
          darkMode={darkMode}
          textPrimaryClass={textPrimaryClass}
          textSecondaryClass={textSecondaryClass}
          cardBgClass={cardBgClass}
          borderClass={borderClass}
          majorEvents={majorEvents}
          isLoadingEvents={isLoadingEvents}
          fetchMajorEvents={fetchMajorEvents}
          getApiKey={getApiKey}
        />
        {/* Week Note Modal */}
        <WeekNoteModal
          open={selectedWeek !== null}
          selectedWeek={selectedWeek}
          weekNote={weekNote}
          onChange={setWeekNote}
          onSave={saveWeekNote}
          onClose={() => setSelectedWeek(null)}
          lifeData={lifeData}
          darkMode={darkMode}
          borderClass={borderClass}
          textPrimaryClass={textPrimaryClass}
          textSecondaryClass={textSecondaryClass}
          cardBgClass={cardBgClass}
        />
        {/* AI Chat Panel */}
        <AiChatPanel
          open={showChat}
          chatMessages={chatMessages}
          userQuestion={userQuestion}
          setUserQuestion={setUserQuestion}
          isLoading={isLoading}
          handleSubmit={handleChatSubmit}
          onClose={() => setShowChat(false)}
          darkMode={darkMode}
          textPrimaryClass={textPrimaryClass}
          textSecondaryClass={textSecondaryClass}
          cardBgClass={cardBgClass}
          borderClass={borderClass}
        />
        {/* Gemini API Key Modal */}
        <ApiKeyModal
          open={showApiKeyInput}
          geminiApiKey={geminiApiKey}
          setGeminiApiKey={setGeminiApiKey}
          onSave={saveApiKey}
          onClear={() => { setGeminiApiKey(''); localStorage.removeItem('geminiApiKey'); setShowApiKeyInput(false); }}
          onClose={() => setShowApiKeyInput(false)}
          darkMode={darkMode}
          borderClass={borderClass}
          textPrimaryClass={textPrimaryClass}
          textSecondaryClass={textSecondaryClass}
          cardBgClass={cardBgClass}
        />
      </div>
    </Layout>
  );
}


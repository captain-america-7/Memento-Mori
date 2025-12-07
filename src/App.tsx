// @ts-nocheck



import { useState, useEffect } from 'react';

import { Calendar, Heart, Globe, Sparkles, Leaf, Sun, Moon, MessageSquare, Send, Settings, Bot, X, Clock } from 'lucide-react';

const MODEL_NAME = "models/gemini-2.5-flash";

export default function App() {
  const reflectionPrompts = [
    "This week: what is one thing you want to remember?",
    "Is there a week ahead you have been postponing for too long?",
    "Which past week are you most grateful for?",
    "What would you like to accomplish in the next 52 weeks?",
    "How do you want to spend your next 100 weeks?",
    "What patterns do you notice in how you have spent your time?"
  ];

  const [step, setStep] = useState(1);
  const [birthDate, setBirthDate] = useState('');
  const [lifeExpectancy, setLifeExpectancy] = useState(80);
  const [customExpectancy, setCustomExpectancy] = useState('');
  const [lifeData, setLifeData] = useState(null);
  const [markedWeeks, setMarkedWeeks] = useState({});
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [weekNote, setWeekNote] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPrompt] = useState(() => reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)]);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userQuestion, setUserQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [majorEvents, setMajorEvents] = useState([]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lifeData]);

  // Helper function to get current time in IST (UTC+5:30)
  const getISTTime = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const ist = new Date(utc + (5.5 * 3600000)); // IST is UTC+5:30
    return ist;
  };

  const calculateLifeData = (birth, expectancy) => {
    const birthDateTime = new Date(birth);
    const now = getISTTime();
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;
    const msPerDay = 24 * 60 * 60 * 1000;
    const msPerYear = 365.25 * msPerDay;
    
    const timeDiff = now - birthDateTime;
    
    let years = now.getFullYear() - birthDateTime.getFullYear();
    let months = now.getMonth() - birthDateTime.getMonth();
    let days = now.getDate() - birthDateTime.getDate();
    let hours = now.getHours() - birthDateTime.getHours();
    let minutes = now.getMinutes() - birthDateTime.getMinutes();
    let seconds = now.getSeconds() - birthDateTime.getSeconds();
    
    if (seconds < 0) {
      minutes--;
      seconds += 60;
    }
    if (minutes < 0) {
      hours--;
      minutes += 60;
    }
    if (hours < 0) {
      days--;
      hours += 24;
    }
    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const weeksLived = Math.floor(timeDiff / msPerWeek);
    const daysLived = Math.floor(timeDiff / msPerDay);
    const yearsLived = timeDiff / msPerYear;
    const monthsLived = Math.floor(yearsLived * 12);
    const minutesLived = Math.floor(timeDiff / (60 * 1000));
    const secondsLived = Math.floor(timeDiff / 1000);
    const hoursLived = Math.floor(timeDiff / (60 * 60 * 1000));
    
    const ageBreakdown = { years, months, days, hours, minutes, seconds };
    
    const totalWeeks = expectancy * 52;
    const weeksRemaining = totalWeeks - weeksLived;
    const percentageLived = ((weeksLived / totalWeeks) * 100).toFixed(1);
    
    const seasons = Math.floor(yearsLived * 4);
    const heartBeats = Math.floor(daysLived * 24 * 60 * 60 * 1.167);
    const breaths = Math.floor(daysLived * 24 * 60 * 16);
    const sleepHours = Math.floor(daysLived * 8);
    
    const birthYear = birthDateTime.getFullYear();
    const worldPopAtBirth = getWorldPopulation(birthYear);
    const currentWorldPop = 8100000000;
    
    const avgPeopleMet = 80000;
    const peopleMet = Math.floor((weeksLived / totalWeeks) * avgPeopleMet);
    
    const birthsPerYear = 140000000;
    const deathsPerYear = 60000000;
    const totalBirths = Math.floor(yearsLived * birthsPerYear);
    const totalDeaths = Math.floor(yearsLived * deathsPerYear);
    
    const earthOrbitKm = 940000000;
    const distanceTraveledAroundSun = Math.floor(yearsLived * earthOrbitKm);
    const solarSystemSpeed = 720000;
    const distanceThroughGalaxy = Math.floor(hoursLived * solarSystemSpeed);
    
    const lunarCycles = Math.floor(daysLived / 29.5);
    const tripsAroundSun = Math.floor(yearsLived);
    const sequoiaLifespan = 3000;
    const sequoiaPercent = ((yearsLived / sequoiaLifespan) * 100).toFixed(2);
    
    const universeAge = 13800000000;
    const lifespanPercent = ((yearsLived / universeAge) * 100).toFixed(10);
    
    return {
      weeksLived, daysLived, yearsLived: Math.floor(yearsLived), monthsLived,
      minutesLived, secondsLived, hoursLived, ageBreakdown, totalWeeks, weeksRemaining,
      percentageLived, lifeExpectancy: expectancy, birthDate: birthDateTime,
      seasons, heartBeats, breaths, sleepHours, worldPopAtBirth, currentWorldPop,
      peopleMet, totalBirths, totalDeaths, distanceTraveledAroundSun,
      distanceThroughGalaxy, lunarCycles, tripsAroundSun, sequoiaPercent, lifespanPercent
    };
  };

  const getWorldPopulation = (year) => {
    const popData = {
      1950: 2500000000, 1960: 3000000000, 1970: 3700000000, 1980: 4400000000,
      1990: 5300000000, 2000: 6100000000, 2005: 6500000000, 2010: 6900000000,
      2015: 7300000000, 2020: 7800000000, 2024: 8100000000
    };
    
    const years = Object.keys(popData).map(Number).sort((a, b) => a - b);
    for (let i = 0; i < years.length; i++) {
      if (year <= years[i]) return popData[years[i]];
    }
    return 8100000000;
  };

  const handleSubmit = () => {
    if (birthDate) {
      const expectancy = lifeExpectancy === 'custom' ? parseInt(customExpectancy) : lifeExpectancy;
      const data = calculateLifeData(birthDate, expectancy);
      setLifeData(data);
      setIsAnimating(true);
      setStep(2);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const handleWeekClick = (weekNum) => {
    setSelectedWeek(weekNum);
    setWeekNote(markedWeeks[weekNum] || '');
  };

  const saveWeekNote = () => {
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

  const askGemini = async (question) => {
    const apiKey = getApiKey();
    if (!apiKey) {
      setShowApiKeyInput(true);
      return;
    }

    setIsLoading(true);
    const userMessage = { role: 'user', content: question };
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
    } catch (error) {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${error.message}. Please check your API key and try again.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatSubmit = (e) => {
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
      const sortedEvents = events.slice(0, 5).sort((a, b) => a.year - b.year);
      setMajorEvents(sortedEvents);
    } catch (error) {
      console.error('Error fetching major events:', error);
      // Set empty array on error to avoid showing error state
      setMajorEvents([]);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const getWeekDate = (weekNum) => {
    const weekMs = weekNum * 7 * 24 * 60 * 60 * 1000;
    const weekDate = new Date(lifeData.birthDate.getTime() + weekMs);
    // Convert to IST for display
    const utc = weekDate.getTime() + (weekDate.getTimezoneOffset() * 60000);
    const ist = new Date(utc + (5.5 * 3600000));
    return ist;
  };

  const renderWeeksGrid = () => {
    if (!lifeData) return null;

    const weeks = [];
    const isMobile = window.innerWidth < 640;
    const weeksPerRow = isMobile ? 26 : 52;
    const maxRows = isMobile ? 50 : 70;
    const totalRows = Math.ceil(lifeData.totalWeeks / weeksPerRow);
    const displayRows = Math.min(totalRows, maxRows);

    for (let i = 0; i < displayRows; i++) {
      const rowWeeks = [];
      const yearAtRow = Math.floor((i * weeksPerRow) / 52);
      const isChapterStart = lifeChapters.some(ch => ch.start === yearAtRow);
      const chapter = lifeChapters.find(ch => yearAtRow >= ch.start && yearAtRow < ch.end);

      for (let j = 0; j < weeksPerRow; j++) {
        const weekNum = i * weeksPerRow + j;
        if (weekNum < lifeData.totalWeeks) {
          const isLived = weekNum < lifeData.weeksLived;
          const isMarked = markedWeeks[weekNum];
          rowWeeks.push(
            <div
              key={weekNum}
              onClick={() => handleWeekClick(weekNum)}
              className={`w-2 h-2 sm:w-2 sm:h-2 rounded-[1px] cursor-pointer transition-all duration-200 ${
                isLived 
                  ? darkMode 
                    ? 'bg-white hover:bg-zinc-300' 
                    : 'bg-black hover:bg-zinc-700'
                  : darkMode 
                    ? 'bg-zinc-800 hover:bg-zinc-700' 
                    : 'bg-zinc-200 hover:bg-zinc-300'
              } ${isMarked ? darkMode ? 'ring-1 ring-blue-400' : 'ring-1 ring-blue-500' : ''} ${isAnimating ? 'opacity-0 animate-fadeIn' : ''}`}
              style={{ animationDelay: `${(i * weeksPerRow + j) * 0.3}ms` }}
              title={`Week ${weekNum + 1}`}
            />
          );
        }
      }
      
      weeks.push(
        <div key={i} className="flex items-center gap-4">
          {isChapterStart && chapter && (
            <div className={`text-[10px] sm:text-xs font-medium w-24 sm:w-28 text-right uppercase tracking-wider ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
              {chapter.label}
            </div>
          )}
          {!isChapterStart && <div className="w-24 sm:w-28" />}
          <div className="flex gap-0.5">
            {rowWeeks}
          </div>
        </div>
      );
    }

    return <div className="flex flex-col gap-0.5">{weeks}</div>;
  };

  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const cardBgClass = darkMode ? 'bg-zinc-900' : 'bg-zinc-50';
  const textPrimaryClass = darkMode ? 'text-white' : 'text-black';
  const textSecondaryClass = darkMode ? 'text-zinc-400' : 'text-zinc-600';
  const borderClass = darkMode ? 'border-zinc-800' : 'border-zinc-200';

  if (step === 1) {
    return (
      <div className={`min-h-screen ${bgClass} flex items-center justify-center p-4 sm:p-8 transition-colors duration-300`}>
        <div className="w-full max-w-md">
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-600 hover:text-neutral-900'} transition-colors`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <div className="text-center mb-12 sm:mb-16">
            <Calendar className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 sm:mb-6 ${darkMode ? 'text-neutral-300' : 'text-neutral-800'}`} strokeWidth={1.5} />
            <h1 className={`text-2xl sm:text-3xl font-light ${textPrimaryClass} mb-3 sm:mb-4`}>
              Life in weeks
            </h1>
            <p className={`text-sm sm:text-base ${textSecondaryClass} font-light leading-relaxed`}>
              Each life contains thousands of weeks.<br />
              Let's visualize yours.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <label htmlFor="birthdate" className={`block text-xs sm:text-sm font-light ${textSecondaryClass} mb-3`}>
                When were you born?
              </label>
              <input
                type="date"
                id="birthdate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={getISTTime().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 sm:py-4 border ${borderClass} ${textPrimaryClass} ${cardBgClass} text-sm sm:text-base font-normal rounded-xl focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-white' : 'focus:ring-black'} transition-all`}
              />
              <p className={`mt-2 text-xs ${textSecondaryClass} font-light`}>
                Your data is stored only on this device
              </p>
            </div>

            <div>
              <label className={`block text-xs sm:text-sm font-light ${textSecondaryClass} mb-3`}>
                Plan for
              </label>
              <div className="flex gap-2 mb-3">
                {[70, 80, 90, 'custom'].map((val) => (
                  <button
                    key={val}
                    onClick={() => setLifeExpectancy(val)}
                    className={`flex-1 px-4 py-3 text-sm font-medium border ${borderClass} transition-all rounded-lg ${
                      lifeExpectancy === val
                        ? darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                        : darkMode ? 'bg-zinc-900 text-zinc-400 hover:text-white' : 'bg-white text-zinc-600 hover:text-black'
                    }`}
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
                  className={`w-full px-4 py-3 border ${borderClass} ${textPrimaryClass} ${cardBgClass} text-sm font-normal rounded-xl focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-white' : 'focus:ring-black'} transition-all`}
                />
              )}
              <p className={`mt-2 text-xs ${textSecondaryClass} font-light`}>
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
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgClass} p-4 sm:p-8 md:p-12 transition-colors duration-300`}>
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

        <div className={`${cardBgClass} p-8 sm:p-12 mb-8 transition-colors duration-300 rounded-2xl`}>
          <h2 className={`text-2xl sm:text-3xl font-semibold ${textPrimaryClass} mb-6 animate-fadeIn tracking-tight`}>
            You are precisely
          </h2>
          
          <div className={`mb-8 text-base sm:text-lg ${textSecondaryClass} font-normal animate-fadeIn leading-relaxed`}>
            {lifeData.ageBreakdown.years} {lifeData.ageBreakdown.years === 1 ? 'year' : 'years'}, {lifeData.ageBreakdown.months} {lifeData.ageBreakdown.months === 1 ? 'month' : 'months'}, {lifeData.ageBreakdown.days} {lifeData.ageBreakdown.days === 1 ? 'day' : 'days'}, {lifeData.ageBreakdown.hours} {lifeData.ageBreakdown.hours === 1 ? 'hour' : 'hours'}, {lifeData.ageBreakdown.minutes} {lifeData.ageBreakdown.minutes === 1 ? 'minute' : 'minutes'}, and {lifeData.ageBreakdown.seconds} {lifeData.ageBreakdown.seconds === 1 ? 'second' : 'seconds'} old
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: lifeData.yearsLived, label: 'years' },
              { value: lifeData.monthsLived, label: 'months' },
              { value: lifeData.daysLived, label: 'days' },
              { value: lifeData.weeksLived, label: 'weeks' }
            ].map((stat, i) => (
              <div key={stat.label} className="space-y-2 animate-countUp" style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`text-3xl sm:text-4xl font-semibold ${textPrimaryClass} tracking-tight`}>
                  {stat.value.toLocaleString()}
                </div>
                <div className={`text-xs sm:text-sm ${textSecondaryClass} font-medium uppercase tracking-wider`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${cardBgClass} p-8 sm:p-12 mb-8 transition-colors duration-300 rounded-2xl`}>
          <div className="mb-10">
            <div className="text-center mb-6">
              <p className={`text-xs sm:text-sm ${textSecondaryClass} font-medium tracking-tight`}>
                Week {lifeData.weeksLived.toLocaleString()} of {lifeData.totalWeeks.toLocaleString()}
              </p>
            </div>
            <h2 className={`text-xl sm:text-2xl font-semibold ${textPrimaryClass} mb-3 tracking-tight`}>
              Your life visualized
            </h2>
            <p className={`text-sm sm:text-base ${textSecondaryClass} font-normal mb-4 leading-relaxed max-w-2xl`}>
              Each square represents one week. Click any week to mark it as meaningful.
            </p>
            <p className={`text-sm sm:text-base ${textPrimaryClass} font-normal italic leading-relaxed max-w-2xl`}>
              {currentPrompt}
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {renderWeeksGrid()}
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8">
          {[
            { icon: Heart, title: 'Life highlights', content: [
              `That's ${lifeData.daysLived.toLocaleString()} days of experience and approximately ${lifeData.seasons} seasons observed.`,
              `Your heart has beaten approximately ${lifeData.heartBeats.toLocaleString()} times.`,
              `You've taken around ${lifeData.breaths.toLocaleString()} breaths and slept about ${lifeData.sleepHours.toLocaleString()} hours.`
            ]},
            { icon: Globe, title: 'Societal context', content: [
              `During your lifetime, humanity's population has grown from approximately ${(lifeData.worldPopAtBirth / 1000000000).toFixed(1)} billion to over ${(lifeData.currentWorldPop / 1000000000).toFixed(1)} billion people.`,
              `The average person will meet around 80,000 people in their lifetime. You've likely already met approximately ${lifeData.peopleMet.toLocaleString()} individuals.`,
              `Since your birth, humanity has collectively experienced approximately ${lifeData.totalBirths.toLocaleString()} births and ${lifeData.totalDeaths.toLocaleString()} deaths.`
            ]},
            { icon: Sparkles, title: 'Cosmic perspective', content: [
              `Since your birth, Earth has traveled approximately ${lifeData.distanceTraveledAroundSun.toLocaleString()} kilometers through space around the Sun.`,
              `The observable universe is about 93 billion light-years across. Your entire lifespan is just ${lifeData.lifespanPercent}% of the universe's age.`,
              `During your lifetime, our solar system has moved about ${lifeData.distanceThroughGalaxy.toLocaleString()} kilometers through the Milky Way galaxy.`
            ]},
            { icon: Leaf, title: 'Natural world', content: [
              `You've experienced approximately ${lifeData.lunarCycles} lunar cycles and ${lifeData.tripsAroundSun} trips around the Sun.`,
              `A giant sequoia tree can live over 3,000 years. Your current age is ${lifeData.sequoiaPercent}% of its potential lifespan.`,
              `During your lifetime, your body has replaced most of its cells several times. You are not made of the same atoms you were born with.`
            ]}
          ].map((section, i) => (
            <div key={section.title} className={`${cardBgClass} p-8 sm:p-10 transition-colors duration-300 animate-fadeIn rounded-2xl`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-3 mb-6">
                <section.icon className={`w-5 h-5 ${textPrimaryClass}`} strokeWidth={2} />
                <h3 className={`text-xl sm:text-2xl font-semibold ${textPrimaryClass} tracking-tight`}>
                  {section.title}
                </h3>
              </div>
              <div className={`space-y-4 text-sm sm:text-base ${textSecondaryClass} font-normal leading-relaxed`}>
                {section.content.map((text, j) => (
                  <p key={j}>{text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Major Events Section */}
        {getApiKey() && (
          <div className={`${cardBgClass} p-8 sm:p-10 mb-8 transition-colors duration-300 animate-fadeIn rounded-2xl`}>
            <div className="flex items-center gap-3 mb-6">
              <Clock className={`w-5 h-5 ${textPrimaryClass}`} strokeWidth={2} />
              <h3 className={`text-xl sm:text-2xl font-semibold ${textPrimaryClass} tracking-tight`}>
                Major Events in Your Lifetime
              </h3>
            </div>
            
            {isLoadingEvents ? (
              <div className={`flex items-center justify-center py-8 ${textSecondaryClass}`}>
                <div className="flex gap-2">
                  <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <span className="ml-3 text-sm">Loading major events...</span>
              </div>
            ) : majorEvents.length > 0 ? (
              <div className="space-y-4">
                {majorEvents.map((event, idx) => (
                  <div key={idx} className={`border-l-2 ${darkMode ? 'border-zinc-700' : 'border-zinc-300'} pl-4 py-2`}>
                    <div className="flex items-start gap-3">
                      <div className={`text-lg sm:text-xl font-semibold ${textPrimaryClass} min-w-[60px]`}>
                        {event.year}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-base sm:text-lg font-semibold ${textPrimaryClass} mb-1`}>
                          {event.title}
                        </h4>
                        <p className={`text-sm sm:text-base ${textSecondaryClass} leading-relaxed`}>
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-8 ${textSecondaryClass}`}>
                <p className="text-sm">
                  Unable to load major events. Please check your API key.
                </p>
                <button
                  onClick={fetchMajorEvents}
                  className={`mt-4 px-4 py-2 text-sm border ${borderClass} rounded-xl hover:${textPrimaryClass} transition-colors`}
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        )}

        <p className={`text-xs ${textSecondaryClass} font-light text-center`}>
          Based on your planning number of {lifeData.lifeExpectancy} years ({lifeData.totalWeeks.toLocaleString()} weeks)
        </p>
      </div>

      {selectedWeek !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${cardBgClass} p-6 rounded-2xl max-w-md w-full`}>
            <h3 className={`text-xl font-semibold ${textPrimaryClass} mb-4 tracking-tight`}>
              Week {selectedWeek + 1}
            </h3>
            <p className={`text-sm ${textSecondaryClass} font-normal mb-6`}>
              {getWeekDate(selectedWeek).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <label className={`block text-sm font-medium ${textPrimaryClass} mb-3`}>
              What made this week meaningful?
            </label>
            <textarea
              value={weekNote}
              onChange={(e) => setWeekNote(e.target.value)}
              className={`w-full px-4 py-3 border ${borderClass} ${textPrimaryClass} ${cardBgClass} text-sm font-normal rounded-xl focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-white' : 'focus:ring-black'} transition-all resize-none`}
              rows={3}
              placeholder="Optional note..."
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={saveWeekNote}
                className={`flex-1 px-4 py-3 ${darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'} text-sm font-medium transition-all rounded-xl`}
              >
                Save
              </button>
              <button
                onClick={() => setSelectedWeek(null)}
                className={`flex-1 px-4 py-3 border ${borderClass} ${textSecondaryClass} hover:${textPrimaryClass} text-sm font-medium transition-all rounded-xl`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Panel */}
      {showChat && (
        <div className={`fixed bottom-4 right-4 w-[calc(100%-2rem)] sm:w-full max-w-md h-[500px] sm:h-[600px] ${cardBgClass} rounded-2xl shadow-2xl flex flex-col z-50 border ${borderClass} transition-all duration-300`}>
          <div className={`flex items-center justify-between p-4 border-b ${borderClass}`}>
            <div className="flex items-center gap-3">
              <Bot className={`w-5 h-5 ${textPrimaryClass}`} />
              <h3 className={`text-lg font-semibold ${textPrimaryClass}`}>
                AI Insights
              </h3>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className={`p-1 rounded-full ${textSecondaryClass} hover:${textPrimaryClass} transition-colors`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.length === 0 ? (
              <div className={`text-center py-4 ${textSecondaryClass}`}>
                <Bot className={`w-12 h-12 mx-auto mb-4 ${textSecondaryClass} opacity-50`} />
                <p className="text-sm font-light mb-4">
                  Ask me anything about your life, time, or mortality.
                </p>
                <p className="text-xs mb-4 opacity-75">
                  I'll provide insights based on your life data.
                </p>
                <div className="space-y-2 mt-6">
                  <p className={`text-xs ${textSecondaryClass} font-medium mb-2`}>Try asking:</p>
                  {[
                    "What should I focus on with my remaining time?",
                    "How can I make the most of my weeks?",
                    "What patterns do you notice in my life?",
                    "How should I think about my mortality?"
                  ].map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setUserQuestion(suggestion);
                        setTimeout(() => askGemini(suggestion), 100);
                      }}
                      className={`block w-full text-left px-3 py-2 text-xs rounded-lg border ${borderClass} ${darkMode ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'} transition-colors ${textSecondaryClass}`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-3 ${
                      msg.role === 'user'
                        ? darkMode
                          ? 'bg-white text-black'
                          : 'bg-black text-white'
                        : `${cardBgClass} border ${borderClass} ${textPrimaryClass}`
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`${cardBgClass} border ${borderClass} rounded-xl px-4 py-3 ${textSecondaryClass}`}>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleChatSubmit} className={`p-4 border-t ${borderClass}`}>
            <div className="flex gap-2">
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="Ask a question..."
                disabled={isLoading}
                className={`flex-1 px-4 py-2 border ${borderClass} ${textPrimaryClass} ${cardBgClass} text-sm rounded-xl focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-white' : 'focus:ring-black'} transition-all disabled:opacity-50`}
              />
              <button
                type="submit"
                disabled={!userQuestion.trim() || isLoading}
                className={`p-2 ${darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'} rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* API Key Input Modal */}
      {showApiKeyInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${cardBgClass} p-6 rounded-2xl max-w-md w-full`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-semibold ${textPrimaryClass} tracking-tight`}>
                Gemini API Key
              </h3>
              <button
                onClick={() => setShowApiKeyInput(false)}
                className={`p-1 rounded-full ${textSecondaryClass} hover:${textPrimaryClass} transition-colors`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {import.meta.env.VITE_GEMINI_API_KEY ? (
              <div className={`mb-4 p-4 rounded-xl ${darkMode ? 'bg-green-900/20 border-green-500/30' : 'bg-green-50 border-green-200'} border ${borderClass}`}>
                <p className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-700'} mb-1 font-medium flex items-center gap-2`}>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  API key loaded from environment variable
                </p>
                <p className={`text-xs ${textSecondaryClass} mt-2`}>
                  Your API key is set via <code className="px-1 py-0.5 rounded bg-black/10 dark:bg-white/10">VITE_GEMINI_API_KEY</code> in your <code className="px-1 py-0.5 rounded bg-black/10 dark:bg-white/10">.env</code> file.
                </p>
              </div>
            ) : (
              <>
                <div className={`mb-4 p-4 rounded-xl ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'} border ${borderClass}`}>
                  <p className={`text-xs ${textSecondaryClass} mb-2 font-medium`}>
                    Option 1: Environment Variable (Recommended for development)
                  </p>
                  <p className={`text-xs ${textSecondaryClass} mb-3`}>
                    Create a <code className="px-1 py-0.5 rounded bg-black/10 dark:bg-white/10">.env</code> file in the project root with:
                  </p>
                  <code className={`block text-xs p-2 rounded ${darkMode ? 'bg-zinc-900' : 'bg-white'} ${textPrimaryClass} mb-3`}>
                    VITE_GEMINI_API_KEY=your_api_key_here
                  </code>
                  <p className={`text-xs ${textSecondaryClass} mb-3 font-medium`}>
                    Option 2: Manual Entry
                  </p>
                  <ol className={`text-xs ${textSecondaryClass} space-y-1 list-decimal list-inside`}>
                    <li>Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a></li>
                    <li>Sign in with your Google account</li>
                    <li>Click "Create API Key"</li>
                    <li>Copy and paste it below</li>
                  </ol>
                </div>

                <label className={`block text-sm font-medium ${textPrimaryClass} mb-2`}>
                  API Key
                </label>
                <input
                  type="password"
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  placeholder="Enter your Gemini API key"
                  className={`w-full px-4 py-3 border ${borderClass} ${textPrimaryClass} ${cardBgClass} text-sm font-normal rounded-xl focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-white' : 'focus:ring-black'} transition-all mb-4`}
                />
                <p className={`text-xs ${textSecondaryClass} mb-4 font-light`}>
                  Your API key is stored locally and never shared.
                </p>
              </>
            )}
            
            {!import.meta.env.VITE_GEMINI_API_KEY && (
              <div className="flex gap-3">
                <button
                  onClick={saveApiKey}
                  disabled={!geminiApiKey.trim()}
                  className={`flex-1 px-4 py-3 ${darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'} text-sm font-medium transition-all rounded-xl disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setGeminiApiKey('');
                    localStorage.removeItem('geminiApiKey');
                    setShowApiKeyInput(false);
                  }}
                  className={`flex-1 px-4 py-3 border ${borderClass} ${textSecondaryClass} hover:${textPrimaryClass} text-sm font-medium transition-all rounded-xl`}
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Globe, Sparkles, Leaf, Sun, Moon } from 'lucide-react';

export default function LifeInWeeks() {
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

  const lifeChapters = [
    { label: 'Childhood', start: 0, end: 12 },
    { label: 'Adolescence', start: 13, end: 19 },
    { label: 'Early adulthood', start: 20, end: 29 },
    { label: 'Middle age', start: 30, end: 59 },
    { label: 'Later life', start: 60, end: 150 }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('markedWeeks');
    if (saved) setMarkedWeeks(JSON.parse(saved));
    
    const darkPreference = localStorage.getItem('darkMode');
    if (darkPreference) setDarkMode(darkPreference === 'true');
  }, []);

  const calculateLifeData = (birth, expectancy) => {
    const birthDateTime = new Date(birth);
    const now = new Date();
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

  const getWeekDate = (weekNum) => {
    const weekMs = weekNum * 7 * 24 * 60 * 60 * 1000;
    const weekDate = new Date(lifeData.birthDate.getTime() + weekMs);
    return weekDate;
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
                max={new Date().toISOString().split('T')[0]}
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
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-600 hover:text-neutral-900'} transition-colors`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
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
    </div>
  );
}
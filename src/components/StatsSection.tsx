

import React from "react";
import { Heart, Globe, Sparkles, Leaf, Clock } from "lucide-react";
import { LifeData } from "../utils/lifeCalculations";

interface MajorEvent {
  year: number;
  title: string;
  description: string;
}

interface StatsSectionProps {
  lifeData: LifeData;
  darkMode: boolean;
  textPrimaryClass: string;
  textSecondaryClass: string;
  cardBgClass: string;
  borderClass: string;
  majorEvents: MajorEvent[];
  isLoadingEvents: boolean;
  fetchMajorEvents: () => void;
  getApiKey: () => string;
}
const StatsSection: React.FC<StatsSectionProps> = (props) => {
  const { lifeData, darkMode, textPrimaryClass, textSecondaryClass, cardBgClass, borderClass, majorEvents, isLoadingEvents, fetchMajorEvents, getApiKey } = props;
  if (!lifeData) return null;

  const statSections = [
    {
      icon: Heart,
      title: 'Life highlights',
      content: [
        `That's ${lifeData.daysLived.toLocaleString()} days of experience and approximately ${lifeData.seasons} seasons observed.`,
        `Your heart has beaten approximately ${lifeData.heartBeats.toLocaleString()} times.`,
        `You've taken around ${lifeData.breaths.toLocaleString()} breaths and slept about ${lifeData.sleepHours.toLocaleString()} hours.`
      ]
    },
    {
      icon: Globe,
      title: 'Societal context',
      content: [
        `During your lifetime, humanity's population has grown from approximately ${(lifeData.worldPopAtBirth / 1000000000).toFixed(1)} billion to over ${(lifeData.currentWorldPop / 1000000000).toFixed(1)} billion people.`,
        `The average person will meet around 80,000 people in their lifetime. You've likely already met approximately ${lifeData.peopleMet.toLocaleString()} individuals.`,
        `Since your birth, humanity has collectively experienced approximately ${lifeData.totalBirths.toLocaleString()} births and ${lifeData.totalDeaths.toLocaleString()} deaths.`
      ]
    },
    {
      icon: Sparkles,
      title: 'Cosmic perspective',
      content: [
        `Since your birth, Earth has traveled approximately ${lifeData.distanceTraveledAroundSun.toLocaleString()} kilometers through space around the Sun.`,
        `The observable universe is about 93 billion light-years across. Your entire lifespan is just ${lifeData.lifespanPercent}% of the universe's age.`,
        `During your lifetime, our solar system has moved about ${lifeData.distanceThroughGalaxy.toLocaleString()} kilometers through the Milky Way galaxy.`
      ]
    },
    {
      icon: Leaf,
      title: 'Natural world',
      content: [
        `You've experienced approximately ${lifeData.lunarCycles} lunar cycles and ${lifeData.tripsAroundSun} trips around the Sun.`,
        `A giant sequoia tree can live over 3,000 years. Your current age is ${lifeData.sequoiaPercent}% of its potential lifespan.`,
        `During your lifetime, your body has replaced most of its cells several times. You are not made of the same atoms you were born with.`
      ]
    },
  ];

  return (
    <>
      <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8">
        {statSections.map((section, i) => (
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
    </>
  );
};
export default StatsSection;


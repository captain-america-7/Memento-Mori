

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
      title: 'The Weight of Time',
      content: [
        `You have lived through ${lifeData.daysLived.toLocaleString()} distinct days, each a collection of moments that will never happen again. You have witnessed the changing of ${lifeData.seasons} seasons, from the first bloom of spring to the quiet of winter.`,
        `Your heart, a tireless engine of life, has beaten approximately ${lifeData.heartBeats.toLocaleString()} times, keeping rhythm with every joy, sorrow, and quiet moment you've ever experienced.`,
        `You have drawn around ${lifeData.breaths.toLocaleString()} breaths, an invisible exchange with the world that has sustained you through ${lifeData.sleepHours.toLocaleString()} hours of dreams and rest.`
      ]
    },
    {
      icon: Globe,
      title: 'The Human Tapestry',
      content: [
        `Since you took your first breath, the human story has expanded from ${(lifeData.worldPopAtBirth / 1000000000).toFixed(1)} billion to over ${(lifeData.currentWorldPop / 1000000000).toFixed(1)} billion souls. You are part of this unprecedented growth of consciousness.`,
        `In a world of billions, you have crossed paths with approximately ${lifeData.peopleMet.toLocaleString()} individuals. Some became friends, some remained strangers, but each interaction wove a thread into your life's unique pattern.`,
        `While you were growing, learning, and living, humanity collectively welcomed ${lifeData.totalBirths.toLocaleString()} new lives and said goodbye to ${lifeData.totalDeaths.toLocaleString()} others. Your life is a bridge between these generations.`
      ]
    },
    {
      icon: Sparkles,
      title: 'Stardust in Motion',
      content: [
        `You are a traveler on a cosmic scale. Since your birth, Earth has carried you ${lifeData.distanceTraveledAroundSun.toLocaleString()} kilometers around the Sun—a journey through space that you make simply by standing still.`,
        `The universe is vast and ancient, yet you are here now. Your lifespan represents a fleeting but precious 0.0000001595% of cosmic history. You are the universe experiencing itself for a brief, shining moment.`,
        `As you read this, our entire solar system is rushing through the Milky Way. You have traveled ${lifeData.distanceThroughGalaxy.toLocaleString()} kilometers through the galaxy, never returning to the same point in space-time twice.`
      ]
    },
    {
      icon: Leaf,
      title: 'Nature\'s Rhythm',
      content: [
        `You have lived under the light of ${lifeData.lunarCycles} full moons and completed ${lifeData.tripsAroundSun} journeys around our star. Your life is measured not just in years, but in celestial cycles.`,
        `Consider the ancient Sequoia, standing for millennia. Your life is a spark compared to its slow-burning flame, yet you burn with a different intensity. You have lived ${lifeData.sequoiaPercent}% of a Sequoia's potential age.`,
        `You are a river, not a rock. Most of the atoms that formed you at birth have long since returned to the world, replaced by new ones. You are a constantly renewing pattern of energy and matter, persisting through change.`
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


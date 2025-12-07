// @ts-nocheck

// Helper function to get current time in IST (UTC+5:30)
export const getISTTime = () => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const ist = new Date(utc + (5.5 * 3600000)); // IST is UTC+5:30
  return ist;
};

export const calculateLifeData = (birth, expectancy) => {
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

export const getWorldPopulation = (year) => {
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

export const getWeekDate = (weekNum, birthDate) => {
  const weekMs = weekNum * 7 * 24 * 60 * 60 * 1000;
  const weekDate = new Date(birthDate.getTime() + weekMs);
  // Convert to IST for display
  const utc = weekDate.getTime() + (weekDate.getTimezoneOffset() * 60000);
  const ist = new Date(utc + (5.5 * 3600000));
  return ist;
};


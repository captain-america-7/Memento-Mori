# Memento Mori

> _"Remember that you must die"_ — Not as a morbid warning, but as a clarifying truth that helps us live better.

A minimalist, privacy-first web application that visualizes your life in weeks. Each square represents one week of your existence, creating a powerful reminder of life's finite nature and inspiring intentional living.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18-61dafb)

---

## 🕊️ Philosophy

**Memento Mori** is an ancient Stoic practice of reflecting on mortality—not to depress, but to clarify what matters. When we truly understand that our time is limited, we make better choices about how to spend it.

With approximately **4,000 weeks** in an average lifetime, this tool transforms an abstract concept into a concrete visual reality. Each square on the grid is a week. How many are filled? How many remain? What will you do with them?

---

## ✨ Features

### 🎯 Core Visualization

- **Life Grid**: Your entire life represented as elegant, organized squares
  - Filled squares: weeks you've lived
  - Empty squares: weeks remaining (based on your life expectancy)
  - Click any week to mark it as meaningful
- **Life Chapters**: Visual segmentation into meaningful life stages
  - Childhood (0-12 years)
  - Adolescence (13-19 years)
  - Early adulthood (20-29 years)
  - Middle age (30-59 years)
  - Later life (60+ years)

### 📊 Precise Time Tracking

- **Exact Age Calculation**: Down to the second (calculated in IST timezone)
- **Multiple Time Units**: Years, months, days, hours, minutes, seconds
- **Week Counter**: Know exactly which week you're in (e.g., Week 1,147 / 4,680)
- **Progress Percentage**: See what portion of your life has passed

### 💭 Reflection & Meaning

- **Mark Meaningful Weeks**: Click any square to add personal notes
- **Reflection Prompts**: Rotating questions to inspire introspection
- **Local Storage**: Your marked weeks persist across sessions

### 📈 Life Statistics

**Life Highlights** ❤️

- Days of experience
- Seasons observed
- Approximate heartbeats (~70 bpm average)
- Breaths taken (~16 per minute)
- Hours slept (~8 per day)

**Societal Context** 🌍

- World population growth during your lifetime
- Estimated people you've met (based on 80,000 average)
- Global births and deaths since your birth

**Cosmic Perspective** ✨

- Distance Earth has traveled around the Sun
- Your lifespan as percentage of universe's age
- Solar system's journey through the Milky Way

**Natural World** 🍃

- Lunar cycles experienced
- Trips around the Sun
- Age relative to ancient sequoia trees (3,000+ year lifespan)
- Cell replacement reminder

### 🤖 AI-Powered Insights (Optional)

**AI Chat Assistant**

- Ask questions about your life, time, and mortality
- Get personalized insights based on your life data
- Context-aware responses using Gemini AI

**Major Events Timeline** 🕐

- Automatically displays 5 major historical events from your lifetime
- Events are fetched using Gemini AI based on your birth year
- Timeline view showing significant world events you've lived through

### ⚙️ Customization

- **Adjustable Life Expectancy**: Choose 70, 80, 90, or enter custom (1-150 years)
  - _"This is just a planning number, not a prediction"_
- **Dark Mode**: Beautiful dark theme with persistent preference
- **Apple-Inspired Design**: Clean, modern, minimalist interface

---

## 🔒 Privacy First

**Your data stays yours. Period.**

- ✅ **No sign-up required** - Use immediately
- ✅ **No tracking or analytics** - Complete privacy
- ✅ **Local storage only** - Data never leaves your device (except optional AI features)
- ✅ **Open source** - Verify the code yourself

Your birth date, marked weeks, and personal reflections are stored exclusively in your browser's localStorage.

**AI Features (Optional):**

- AI features require a Gemini API key (get yours free at [Google AI Studio](https://makersuite.google.com/app/apikey))
- API key can be set via environment variable or entered manually
- API key is stored locally and only used for AI requests
- All AI requests are made directly to Google's Gemini API

---

## 🛠 Technical Stack

```
Frontend:  React 18
Styling:   Tailwind CSS
Icons:     Lucide React
Storage:   localStorage API
AI:        Google Gemini 2.5 Flash (optional)
Timezone:  IST (Indian Standard Time)
```

**Zero dependencies** for core data processing - all calculations done in vanilla JavaScript.

---

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/memento-mori.git

# Navigate to directory
cd memento-mori

# Install dependencies
npm install

# Start development server
npm run dev
```

### Optional: AI Features Setup

To enable AI chat and major events features:

1. **Get a Gemini API Key**:

   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy your API key

2. **Set API Key** (choose one method):

   **Method 1: Environment Variable (Recommended for development)**

   ```bash
   # Create .env file in project root
   echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env

   # Restart dev server
   npm run dev
   ```

   **Method 2: Manual Entry**

   - Click the Settings icon in the app
   - Enter your API key in the modal
   - Click Save

### Usage

1. **Enter your birth date** - Required for week calculations
2. **Choose life expectancy** - Select preset or custom value
3. **Explore the grid** - Each square represents one week
4. **Mark meaningful weeks** - Click any week to add notes
5. **Ask AI questions** - Click the chat icon to get AI insights (if API key is set)
6. **View major events** - See historical events from your lifetime (if API key is set)
7. **Reflect** - Consider the statistics and prompts

---

## 🌐 Deployment

### Deploy to Vercel

This project is configured for easy deployment on Vercel:

#### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally (if not already installed)
npm i -g vercel

# Deploy
vercel
```

#### Option 2: Deploy via Vercel Dashboard

1. **Push your code to GitHub** (if not already done)
2. **Go to [vercel.com](https://vercel.com)** and sign in
3. **Click "Add New Project"**
4. **Import your GitHub repository**
5. **Add Environment Variable** (optional, for AI features):
   - Variable: `VITE_GEMINI_API_KEY`
   - Value: Your Gemini API key
6. **Click "Deploy"**

The project includes a `vercel.json` configuration file that handles:

- Build settings
- SPA routing (all routes redirect to `index.html` for client-side routing)

Your app will be live at `https://your-project-name.vercel.app` 🚀

---

## 📱 Responsive Design

- **Mobile**: 26 weeks per row, touch-optimized
- **Desktop**: 52 weeks per row, full experience
- **Tablet**: Adaptive layout for medium screens
- **Accessible**: WCAG compliant, keyboard navigation

---

## 📊 How Calculations Work

All statistics are approximations based on averages:

| Metric             | Calculation                          |
| ------------------ | ------------------------------------ |
| Heartbeats         | Days × 24h × 60m × 60s × 1.167 bpm   |
| Breaths            | Days × 24h × 60m × 16 breaths/min    |
| Sleep              | Days × 8 hours                       |
| People Met         | (Weeks lived / Total weeks) × 80,000 |
| Earth's Orbit      | Years × 940 million km               |
| Solar System Speed | Hours × 720,000 km/h                 |
| Lunar Cycles       | Days ÷ 29.5                          |

_Note: These are estimates for perspective, not precise measurements. All time calculations use IST (Indian Standard Time) timezone._

---

## 🎯 Use Cases

### Personal Development

- Visualize time for goal setting
- Create urgency for important projects
- Overcome procrastination with clarity

### Life Review

- Mark significant life events
- Identify patterns in meaningful periods
- Celebrate milestones

### Mindfulness Practice

- Daily or weekly reflection ritual
- Gratitude for time passed
- Intention setting for time ahead

### Stoic Exercise

- Practice memento mori meditation
- Cultivate perspective on problems
- Focus on what truly matters

---

## 🎨 Design Philosophy

### Inspired By

- **Stoic Philosophy**: Memento mori as a tool for living well
- **Apple Design**: Clean, intuitive, high-contrast aesthetics
- **Dieter Rams**: "Less, but better" - focus on essentials
- **Japanese Minimalism**: Calm, contemplative spaces

### Design Principles

- **Clarity over decoration** - Every element serves a purpose
- **High contrast** - Pure blacks and whites for maximum readability
- **Organized precision** - Grid perfectly aligned, consistent spacing
- **Smooth interactions** - Thoughtful animations (200-400ms)
- **Generous spacing** - Room to breathe and reflect
- **Typography matters** - San Francisco-inspired, tracking-tight headlines

---

## 📝 License

MIT License

---

## 🙏 Acknowledgments

Thank you to:

- The Stoic philosophers for timeless wisdom
- Tim Urban for making abstract concepts visual
- The open-source community for tools and inspiration
- Everyone who reflects on mortality to live better

---

_Built with intention_  
_Remember you must die. Therefore, choose to live._ ⏳

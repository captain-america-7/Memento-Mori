# Memento Mori

> *"Remember that you must die"* — Not as a morbid warning, but as a clarifying truth that helps us live better.

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
- **Exact Age Calculation**: Down to the second
- **Multiple Time Units**: Years, months, days, hours, minutes, seconds
- **Week Counter**: Know exactly which week you're in (e.g., Week 1,147 / 4,680)
- **Progress Percentage**: See what portion of your life has passed

### 💭 Reflection & Meaning
- **Mark Meaningful Weeks**: Click any square to add personal notes
- **Reflection Prompts**: Rotating questions to inspire introspection
  - "This week: what is one thing you want to remember?"
  - "Which past week are you most grateful for?"
  - "Is there a week ahead you have been postponing for too long?"
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

### ⚙️ Customization
- **Adjustable Life Expectancy**: Choose 70, 80, 90, or enter custom (1-150 years)
  - *"This is just a planning number, not a prediction"*
- **Dark Mode**: Beautiful dark theme with persistent preference
- **Apple-Inspired Design**: Clean, modern, minimalist interface

---

## 🔒 Privacy First

**Your data stays yours. Period.**

- ✅ **No sign-up required** - Use immediately
- ✅ **No tracking or analytics** - Complete privacy
- ✅ **Local storage only** - Data never leaves your device
- ✅ **No external API calls** - All processing happens client-side
- ✅ **Open source** - Verify the code yourself

Your birth date, marked weeks, and personal reflections are stored exclusively in your browser's localStorage. We never see, collect, or transmit your data.

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

## 🛠 Technical Stack

```
Frontend:  React 18
Styling:   Tailwind CSS
Icons:     Lucide React
Storage:   localStorage API
```

**Zero dependencies** for data processing - all calculations done in vanilla JavaScript.

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
5. **Vercel will auto-detect Vite settings:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. **Click "Deploy"**

The project includes a `vercel.json` configuration file that handles:
- Build settings
- SPA routing (all routes redirect to `index.html` for client-side routing)

Your app will be live at `https://your-project-name.vercel.app` 🚀

### Usage

1. **Enter your birth date** - Required for week calculations
2. **Choose life expectancy** - Select preset or custom value
3. **Explore the grid** - Each square represents one week
4. **Mark meaningful weeks** - Click any week to add notes
5. **Reflect** - Consider the statistics and prompts

---

## 📱 Responsive Design

- **Mobile**: 26 weeks per row, touch-optimized
- **Desktop**: 52 weeks per row, full experience
- **Tablet**: Adaptive layout for medium screens
- **Accessible**: WCAG compliant, keyboard navigation

---

## 📊 How Calculations Work

All statistics are approximations based on averages:

| Metric | Calculation |
|--------|-------------|
| Heartbeats | Days × 24h × 60m × 60s × 1.167 bpm |
| Breaths | Days × 24h × 60m × 16 breaths/min |
| Sleep | Days × 8 hours |
| People Met | (Weeks lived / Total weeks) × 80,000 |
| Earth's Orbit | Years × 940 million km |
| Solar System Speed | Hours × 720,000 km/h |
| Lunar Cycles | Days ÷ 29.5 |

*Note: These are estimates for perspective, not precise measurements.*

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

## 💡 Philosophical Background

### Memento Mori in History

The concept of **memento mori** (Latin: "remember you must die") has been practiced for millennia:

- **Ancient Rome**: Victorious generals had servants whisper "memento mori" during triumph parades
- **Medieval Christianity**: Monks kept skulls in their cells as reminders
- **Stoic Philosophy**: Marcus Aurelius, Seneca, and Epictetus wrote extensively on mortality
- **Modern Applications**: Productivity systems, mindfulness practices, life design

### Why This Matters

> "It is not that we have a short time to live, but that we waste a lot of it." — Seneca

When we acknowledge our mortality:
- Trivial concerns fade away
- Relationships become priorities
- Present moments gain significance
- Procrastination loses its grip
- Life becomes more intentional

---

## 🌟 Inspiration & Credits

### Inspired By
- **Tim Urban** - "Your Life in Weeks" visualization (Wait But Why)
- **Oliver Burkeman** - "Four Thousand Weeks: Time Management for Mortals"
- **Stoic Philosophers** - Marcus Aurelius, Seneca, Epictetus
- **Apple** - Design language and attention to detail
- **Dieter Rams** - Ten Principles of Good Design

### Resources
- [Wait But Why: Your Life in Weeks](https://waitbutwhy.com/2014/05/life-weeks.html)
- [Four Thousand Weeks (Book)](https://www.oliverburkeman.com/books)
- [Daily Stoic: Memento Mori](https://dailystoic.com/memento-mori/)

---

## 🤝 Contributing

This project welcomes thoughtful contributions that align with its philosophy:

### Guidelines
- **Maintain simplicity** - Add only what's essential
- **Respect privacy** - No tracking, no external calls
- **Keep it fast** - Optimize for performance
- **Stay minimal** - Design should be invisible
- **Document changes** - Explain the "why"

### Areas for Contribution
- Accessibility improvements
- Performance optimizations
- Translation/localization
- Statistical accuracy
- Bug fixes

---

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Thank you to:
- The Stoic philosophers for timeless wisdom
- Tim Urban for making abstract concepts visual
- The open-source community for tools and inspiration
- Everyone who reflects on mortality to live better

---

## 🔮 Future Considerations

Potential enhancements (while maintaining simplicity):
- Export life grid as image
- Print-friendly version
- Life events timeline overlay
- Goal tracking integration
- Shared reflections (opt-in, anonymous)

*These are considerations, not promises. Simplicity remains the priority.*

---

## 💬 Final Thoughts

> "Let us prepare our minds as if we'd come to the very end of life. Let us postpone nothing. Let us balance life's books each day... The one who puts the finishing touches on their life each day is never short of time." — Seneca

Your life is happening right now, one week at a time. This tool is simply a mirror—what you do with the reflection is up to you.

**Remember you must die.**  
**Therefore, choose to live.**

---

## 📧 Contact

Questions? Reflections? Reach out or open an issue.

**Remember**: Each square on your grid represents a week. Make them count. ⏳

---

*Built with intention by [Your Name]*  
*Last updated: December 2024*
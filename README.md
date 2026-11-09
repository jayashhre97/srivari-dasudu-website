# Srivari Dasudu – Devotional Remedies, Rituals & Goseva (React + Vite)

A modern, responsive React application converted from the original static website for **Srivari Dasudu**, invoking the grace of Lord Sri Venkateswara Swamy through traditional Vedic rituals, remedies, daily worship, and cow service.

## 🪔 Features
- **15 Authentic Vedic Ceremonies**: Complete catalogue of homams, abhishekams, and vratams with filtering (Homams, Abhishekams, Marriage & Vratams) and real-time search.
- **Devotional Remedies & Parayanam**: Guidance for health, wealth, family harmony, and mental peace.
- **Daily Devotional Schedule (Nitya Kainkaryam)**: Suprabhatam to Ekanta Seva visual timeline.
- **Kamadhenu Goseva**: Cow protection and fodder sponsorship initiative with progress goal indicator.
- **WhatsApp Booking Integration**: Automated booking modal generating structured WhatsApp inquiries for Purohit coordination.
- **Smooth Hash Navigation**: Supports `#home`, `#remedies`, `#events`, `#daily`, `#goseva`, and `#contact`.
- **Responsive Navigation**: Mobile slide-out drawer menu and desktop sticky header.
- **Rotating Hero Chants**: Dynamic Telugu and English devotional chants and animations.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Run

From the project root:
```bash
# Start Vite development server
npm run dev

# Or from inside srivari-dasudu:
cd srivari-dasudu
npm run dev
```

### Production Build
```bash
npm run build
```
The compiled output will be generated inside `srivari-dasudu/dist/`.

## 📁 Project Structure
```
srivari-dasudu/
├── public/               # Public assets and cards images
│   └── images/
├── src/
│   ├── components/       # Modular UI components
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Marquee.jsx
│   │   ├── Stats.jsx
│   │   ├── HomeFeatured.jsx
│   │   ├── RemediesView.jsx
│   │   ├── EventsView.jsx
│   │   ├── DailyView.jsx
│   │   ├── GosevaView.jsx
│   │   ├── ContactView.jsx
│   │   ├── BookingModal.jsx
│   │   └── Footer.jsx
│   ├── data/             # Structured datasets
│   │   ├── eventsData.js
│   │   ├── remediesData.js
│   │   └── dailySchedule.js
│   ├── App.jsx           # Main state and router view switcher
│   ├── index.css         # Design system & styles
│   └── main.jsx          # React DOM entry point
├── index.html            # Vite HTML template
├── package.json          # Dependencies & scripts
└── vite.config.js        # Vite React configuration
```


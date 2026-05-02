# SubTrack – Subscription Management Dashboard

A beginner-friendly React application for managing and tracking subscriptions. Monitor spending, track renewal dates, and organize your subscriptions by category.

## 📋 Features

### Core Functionality
- ✅ **Add Subscriptions** - Add new subscriptions with details
- ✅ **Edit Subscriptions** - Modify existing subscription information
- ✅ **Delete Subscriptions** - Remove subscriptions from your list
- ✅ **View All Subscriptions** - Browse all your subscriptions in an organized grid

### Tracking Features
- 📱 Track subscription name, pricing, and category
- 📅 Monitor monthly and yearly billing cycles
- 🔔 Get renewal date reminders (alerts for subscriptions renewing within 30 days)
- 💾 Payment status tracking (Active/Inactive)

### Dashboard Statistics
- 📦 Total subscriptions count
- ✅ Active subscriptions count
- 💰 Total monthly spending calculation
- 🔔 Upcoming renewals counter

### Search & Filter
- 🔍 Search subscriptions by name or category
- 🏷️ Filter by category (Entertainment, Productivity, Education, etc.)
- 📊 Filter by payment status (Active/Inactive)
- 🧹 Clear filters with one click

### Theme Support
- 🌙 Dark mode toggle for comfortable viewing
- 💾 Theme preference saved in browser storage

### Analytics & History
- 📊 Subscription statistics and insights
- 📈 Breakdown by category with visual cards
- 💸 Spending summary by category
- 📅 Timeline view of all subscriptions
- 🏆 Most expensive and cheapest subscriptions

### Data Management
- 💾 Automatic save to browser's localStorage
- 🔄 Data persists between sessions
- 📦 Demo data included for testing

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory:**
```bash
cd SubTrack
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

The application will open at `http://localhost:5173/`

## 📁 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── SubscriptionCard.jsx
│   ├── SubscriptionForm.jsx
│   ├── StatCard.jsx
│   ├── SearchBar.jsx
│   ├── FilterBar.jsx
│   └── EmptyState.jsx
├── context/             # React Context for theme management
│   └── ThemeContext.jsx
├── pages/              # Page components
│   ├── Dashboard.jsx
│   ├── AddSubscription.jsx
│   ├── ManageSubscriptions.jsx
│   └── History.jsx
├── styles/             # CSS files
│   ├── App.css
│   ├── Header.css
│   ├── Footer.css
│   ├── Dashboard.css
│   └── [other component styles]
├── utils/              # Utility functions
│   ├── storage.js     # localStorage operations
│   └── dummyData.js   # Sample data for testing
├── App.jsx             # Main app component
└── main.jsx            # App entry point
```

## 🎯 Pages & Routes

| Page | Route | Purpose |
|------|-------|---------|
| Dashboard | `/` | View overview, stats, and all subscriptions |
| Add Subscription | `/add` | Form to add a new subscription |
| Manage Subscriptions | `/manage` | View, search, filter, and edit subscriptions |
| History & Analytics | `/history` | View analytics and subscription history |

## 🎨 Styling

- **CSS Only** - No Tailwind or UI libraries
- **Dark/Light Mode** - CSS variables for theming
- **Responsive Design** - Mobile, tablet, and desktop layouts
- **Smooth Animations** - Hover effects and transitions
- **Professional Colors** - Blue, Green, Purple, Orange accents
- **Rounded Cards** - Modern card-based design
- **Soft Shadows** - Subtle depth and elevation

### Color Scheme
- **Primary** - Blue (#3182ce)
- **Success** - Green (#38a169)
- **Accent** - Purple (#7c3aed)
- **Warning** - Orange (#f97316)
- **Danger** - Red (#dc2626)

## 📊 Sample Data

The app includes 8 sample subscriptions for testing:
- Netflix (Entertainment)
- Spotify (Music)
- Microsoft 365 (Productivity)
- Adobe Creative Cloud (Productivity)
- Dropbox (Cloud Storage)
- Coursera Plus (Education)
- Apple Fitness+ (Fitness)
- The New York Times (News)

Delete or modify these to start tracking your own subscriptions!

## 💾 Data Storage

All subscription data is stored in the browser's `localStorage`:
- **Key**: `subscriptions`
- **Format**: JSON array of subscription objects
- **Persistence**: Data survives page refreshes and browser restarts

### Subscription Object Structure
```javascript
{
  id: "unique-timestamp",
  name: "Subscription Name",
  category: "entertainment",
  price: 15.99,
  billingCycle: "monthly",      // or "yearly"
  renewalDate: "2024-06-15",
  status: "active",              // or "inactive"
  createdAt: "2024-03-15T10:30:00.000Z"
}
```

## 🎓 Learning Concepts

This project demonstrates beginner-friendly React concepts:
- ✅ Functional components and JSX
- ✅ Hooks: `useState`, `useEffect`
- ✅ React Router for page navigation
- ✅ Context API for state management
- ✅ Props and component composition
- ✅ Conditional rendering
- ✅ List rendering with `.map()`
- ✅ Event handling
- ✅ Form handling and validation
- ✅ localStorage API
- ✅ CSS variables and responsive design

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🖥️ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 💡 Tips for Users

1. **Add subscriptions** with accurate renewal dates to get timely reminders
2. **Use categories** consistently for better analytics and filtering
3. **Set status** to "Inactive" for subscriptions you've paused
4. **Check the dashboard** regularly for upcoming renewals
5. **Review analytics** monthly to understand your spending

## 🚧 Future Enhancement Ideas

- Export data to CSV
- Email reminders for upcoming renewals
- Subscription recommendations based on spending
- Budget tracking and goals
- Multiple device sync
- Subscription notes/comments
- Smart categorization
- Spending trends chart

## 📝 License

This project is free to use and modify for educational purposes.

## 🤝 Contributing

This is an educational project. Feel free to fork and customize it for your needs!

## ❓ Troubleshooting

**Q: Demo data doesn't appear?**
- Clear localStorage and refresh the page: `localStorage.clear()`

**Q: Theme doesn't persist?**
- Check if localStorage is enabled in your browser

**Q: Can't edit subscriptions?**
- Make sure you're clicking the "Edit" button on the subscription card

**Q: Form validation not working?**
- Ensure all required fields are filled (marked with *)

---

**Built with ❤️ using React.js, JavaScript, HTML, and CSS**

Happy subscription tracking! 📊

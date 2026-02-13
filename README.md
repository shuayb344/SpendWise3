# SpendWise - Personal Finance Dashboard

SpendWise is a production-level Personal Finance Dashboard built with React, featuring real-time data visualization, transaction management, and a premium dark/light mode interface.

## 🚀 Features

- **Dashboard Overview**: At-a-glance summary of total balance, income, and expenses with trend indicators.
- **Transaction Management**: Comprehensive system to add, delete, and filter transactions by category and type.
- **Advanced Charts**: Interactive pie charts for expense breakdown and bar charts for monthly trends using Recharts.
- **Global State Management**: React Context API used for efficient, app-wide state handling.
- **Persistent Storage**: All data is automatically persisted to LocalStorage.
- **Premium UI/UX**: Built with Tailwind CSS, featuring a responsive design, smooth animations (Framer Motion), and dark mode support.
- **Accessiblity**: Semantic HTML and keyboard-navigable components.


🔗 Live Demo

    https://spend-wise3.vercel.app/

## 📸 Screenshots

><img width="1917" height="959" alt="Screenshot from 2026-02-13 08-29-41" src="https://github.com/user-attachments/assets/f79ea9f5-c10b-4a14-8fab-d0c912e6fd25" />

> <img width="1917" height="959" alt="Screenshot from 2026-02-13 08-29-29" src="https://github.com/user-attachments/assets/79b76c87-5f0e-4ab2-a5c1-19d66683d124" />
> <img width="409" height="882" alt="Screenshot from 2026-02-13 08-31-32" src="https://github.com/user-attachments/assets/6a0e16fc-6b66-47d5-8a26-6f0983e1f1e8" />



## 🧱 Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State**: Context API
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utils**: clsx, tailwind-merge

## 📁 Project Structure

```text
src/
 ├─ components/
 │   ├─ ui/           # Reusable atomic UI components
 │   ├─ dashboard/    # Dashboard-specific features (Summary, Recent)
 │   ├─ transactions/ # Transaction forms and lists
 │   ├─ layout/       # Sidebar, Header, AppLayout
 │   └─ charts/       # Recharts implementations
 ├─ pages/            # Page-level components (Dashboard, Transactions, Reports)
 ├─ context/          # FinanceContext for global state
 ├─ services/         # Storage and mock API services
 ├─ hooks/            # Custom hooks for logic sharing
 ├─ utils/            # Helper functions and formatting
 ├─ App.jsx           # Routing and Providers
 └─ main.jsx          # Entry point
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SpendWise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🧪 Edge Cases Handled

- Empty states for all data-driven components.
- Loading skeletons for improved Perceived Performance.
- Form validation for transaction entry.
- Dark mode preference persistence.
- Zero-division handling in financial reports.

---

*This project was developed as a demonstration of production-ready frontend engineering principles.*

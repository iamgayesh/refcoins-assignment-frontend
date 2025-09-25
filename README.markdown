# 🌐 Refcoins Frontend - Next.js Property Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style-for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style-for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.3-38B2AC?style-for-the-badge&logo=tailwind-css)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.9.0-764ABC?style-for-the-badge&logo=redux)

**Modern React-based frontend for the Refcoins Property Management Platform**

Built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit** for an intuitive property browsing experience.

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Technologies](#️-technologies)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Setup and Running](#-setup-and-running)
- [🌐 Pages](#-pages)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [🧪 Testing](#-testing)

---

## 🎯 Overview

This **frontend web application** powers the **Refcoins Property Management Platform**, providing a user-friendly interface for browsing properties, searching with filters, and managing user authentication. Built with **Next.js** and **React**, it leverages **TypeScript** for type safety and **Tailwind CSS** for modern styling.

### Why Next.js?

- **Server-Side Rendering (SSR)**: Enhances SEO and initial load times.
- **App Router**: Simplifies dynamic page routing.
- **TypeScript Support**: Catches errors early with static typing.
- **Production-Ready**: Trusted by companies like Vercel and Netflix.

---

## ✨ Features

- **Property Browsing**:
  - View property listings with images, prices, and details.
  - Detailed property pages with comprehensive information.

- **Advanced Search & Filtering**:
  - Filter by location (e.g., Colombo, Kandy), type (e.g., Villa), and status (e.g., For Sale).
  - Real-time search results and filter persistence.
  - Clear filters for easy resets.

- **Pagination**:
  - Paginated property lists (3 properties per page).
  - Navigation with Previous/Next buttons.

- **Authentication**:
  - Secure login and registration with JWT.
  - Protected routes for authenticated users.
  - Persistent sessions across browser reloads.

---

## 🛠️ Technologies

| Technology          | Version | Purpose                     |
|---------------------|---------|-----------------------------|
| **Next.js**         | 15.5.3  | React framework with SSR    |
| **React**           | 19.1.0  | UI component library        |
| **TypeScript**      | 5.0.0   | Type-safe JavaScript        |
| **Tailwind CSS**    | 3.4.3   | Utility-first CSS framework |
| **Redux Toolkit**   | 2.9.0   | State management            |
| **Axios**           | 1.12.2  | HTTP client for API calls   |
| **Lucide React**    | 0.544.0 | Icon library                |

---

## 📋 Prerequisites

- **Node.js** (v18+): [Download](https://nodejs.org/)  
  - Verify: `node --version`
- **npm**: Included with Node.js  
  - Verify: `npm --version`
- **Backend API**: Refcoins backend running at `http://localhost:7000`  
  - See backend README for setup instructions.
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled.

---

## 🚀 Setup and Running

### 1. Clone the Repository

```bash
git clone <repository-url>
cd refcoins-assignment-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Ensure Backend is Running

```bash
# In a separate terminal
cd ../refcoins-assignment-backend
npm run start:dev
# Verify: http://localhost:7000/properties
```

### 4. Start the Frontend

```bash
npm run dev
```

### 5. Open in Browser

Visit `http://localhost:5000`.

### 6. Verify

- **Homepage**: Displays search bar and property cards.
- **Search**: Filters work for location, type, and status.
- **Pagination**: Navigates through property pages.
- **Login**: Authenticates with `admin@admin.com` / `admin123`.

---

## 🌐 Pages

| Page            | URL                     | Description                              |
|-----------------|-------------------------|------------------------------------------|
| **Homepage**    | `/`                     | Property search and browsing             |
| **Dashboard**   | `/dashboard`            | Property management and enhanced filters |
| **Login**       | `/login`                | User authentication interface            |

### Homepage

- Search bar with filters for location, type, and status.
- Paginated property cards with images and details.
- Links to individual property pages.

### Dashboard

- Protected route requiring authentication.
- Advanced property management and filtering.
- User-specific data display.

### Login

- Secure login form with validation.
- Redirects to dashboard on successful login.
- Error handling for invalid credentials.

---

## 📁 Project Structure

```
refcoins-assignment-frontend/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Homepage
│   │   ├── globals.css          # Global styles
│   │   ├── dashboard/page.tsx   # Dashboard page
│   │   └── login/page.tsx       # Login page
│   ├── components/              # Reusable UI components
│   │   ├── layout/
│   │   │   ├── AuthInitializer.tsx  # Auth setup
│   │   │   ├── MainHeader.tsx       # Navigation bar
│   │   │   ├── MainFooter.tsx       # Footer
│   │   │   └── ProtectedRoute.tsx   # Route protection
│   │   └── ui/
│   │       ├── SearchBar.tsx        # Search interface
│   │       ├── PropertyCard.tsx     # Property card
│   │       ├── PaginatedProperties.tsx # Paginated list
│   │       └── LoadingSpinner.tsx   # Loading animation
│   ├── lib/                     # Utilities
│   │   ├── apiManager.ts        # Axios configuration
│   │   └── propertyApiService.ts # API calls
│   ├── redux/                   # State management
│   │   ├── store.ts             # Redux store
│   │   ├── Provider.tsx         # Redux provider
│   │   └── slices/
│   │       ├── authSlice.ts     # Auth state
│   │       └── propertySlice.ts # Property state
│   └── types/                   # TypeScript types
│       └── css.d.ts             # CSS module types
├── public/                      # Static assets
│   ├── images/                  # Image files
│   └── *.svg                    # Icons
├── package.json                 # Dependencies and scripts
├── next.config.ts               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── postcss.config.js            # PostCSS configuration
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:7000
NEXT_PUBLIC_NODE_ENV=development
PORT=5000
```

### Tailwind CSS

Custom styles in `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#64748B",
      },
    },
  },
  plugins: [],
};
```

### Scripts

| Script            | Description                              |
|-------------------|------------------------------------------|
| `npm run dev`     | Start development server (port 5000)     |
| `npm run build`   | Build for production                     |
| `npm run start`   | Start production server (port 5000)      |
| `npm run lint`    | Run ESLint for code quality              |

---

## 🧪 Testing

### Manual Testing

1. **Homepage** (`http://localhost:5000`):
   - Verify search bar and property cards load.
   - Test filters (location, type, status) and pagination.

2. **Dashboard** (`http://localhost:5000/dashboard`):
   - Ensure redirection to login if not authenticated.
   - Test property management features post-login.

3. **Login** (`http://localhost:5000/login`):
   - Use `admin@admin.com` / `admin123`.
   - Confirm redirect to dashboard on success.

### Browser Compatibility

Test in:
- Chrome
- Firefox
- Edge
- Safari

---

<div align="center">

**🌐 Refcoins Frontend**

Built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**

_A user-friendly property management platform_

**Made with ❤️ for Refcoins**

</div>
# 🛍️ Product Dashboard

A modern, feature-rich product catalog application built with Next.js 15, featuring a beautiful UI, advanced filtering, favorites management, and comprehensive testing.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=flat-square&logo=tailwind-css)
![Jest](https://img.shields.io/badge/Jest-30.2.0-C21325?style=flat-square&logo=jest)

## ✨ Features

### 🎨 User Interface
- **Beautiful Landing Page** - Gradient backgrounds with animated elements and glassmorphism effects
- **Responsive Design** - Fully responsive across all devices (mobile, tablet, desktop)
- **Dark Mode** - Toggle between light and dark themes with smooth transitions
- **Modern Aesthetics** - Premium design with vibrant colors, smooth animations, and micro-interactions

### 📦 Product Features
- **Product Catalog** - Browse all products with detailed information
- **Product Details** - Individual product pages with comprehensive details
- **Category Filtering** - Filter products by category (men's clothing, women's clothing, jewelry, electronics)
- **Search Functionality** - Real-time search with debouncing for optimal performance
- **Sorting** - Sort products by price from low to high and high to low
- **Favorites System** - Add/remove products to favorites with persistent storage
- **Pagination** - Navigate through products with client-side pagination
- **Error Handling** - Comprehensive error boundaries and fallback UI
- **Type Safety** - Full TypeScript implementation with strict typing
- **Testing** - Comprehensive unit tests for all major components, pages, and hooks
- **Performance** - Client-side pagination and debouncing for optimal performance
- **SEO Optimized** - Meta tags, Open Graph tags, and semantic HTML
- **Accessibility** - Keyboard navigation and ARIA roles for better accessibility
- **Responsive Design** - Fully responsive across all devices (mobile, tablet, desktop)


### 🔧 Technical Features
- **Server-Side Rendering (SSR)** - Fast initial page loads with Next.js App Router
- **Client-Side Interactivity** - Smooth client-side navigation and filtering
- **API Integration** - Fetches data from FakeStore API with error handling
- **Local Storage** - Persistent favorites and theme preferences
- **Custom Hooks** - Reusable hooks for debouncing, favorites, local storage, and theme management
- **Error Handling** - Comprehensive error boundaries and fallback UI
- **SEO Optimized** - Meta tags, Open Graph tags, and semantic HTML
- **Type Safety** - Full TypeScript implementation with strict typing

### 🧪 Testing
- **Unit Tests** - Comprehensive test coverage for components, pages, and hooks
- **Jest & React Testing Library** - Modern testing setup with best practices
- **Test Coverage** - Coverage reports for code quality assurance

## 🛠️ Tech Stack

- **Framework:** [Next.js 16.1.1](https://nextjs.org/) (App Router)
- **UI Library:** [React 19.2.3](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS 4](https://tailwindcss.com/)
- **HTTP Client:** [Axios 1.7.9](https://axios-http.com/)
- **Testing:** [Jest 30.2.0](https://jestjs.io/) + [React Testing Library 16.3.1](https://testing-library.com/react)
- **API:** [FakeStore API](https://fakestoreapi.com/)

## 📁 Project Structure

```
product-dashboard/
├── app/                          # Next.js App Router
│   ├── favorites/                # Favorites page
│   ├── products/                 # Products pages
│   │   ├── [id]/                 # Dynamic product detail pages
│   │   └── page.tsx              # Products catalog page
│   ├── types/                    # TypeScript type definitions
│   ├── layout.tsx                # Root layout with Navbar
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles and animations
├── components/                   # Reusable React components
│   ├── FavoritesList.tsx         # Favorites list component
│   ├── Navbar.tsx                # Navigation bar with theme toggle
│   ├── Pagination.tsx            # Pagination component
│   ├── ProductDetails.tsx        # Product detail view
│   ├── ProductGrid.tsx           # Product grid with filtering
│   └── ThemeToggle.tsx           # Dark mode toggle
├── hooks/                        # Custom React hooks
│   ├── useDebounce.ts            # Debounce hook for search
│   ├── useFavorites.ts           # Favorites management
│   ├── useLocalStorage.ts        # Local storage abstraction
│   └── useTheme.ts               # Theme management
├── lib/                          # Utility functions
│   └── api/
│       └── products.ts           # API functions for products
├── __tests__/                    # Test files
│   ├── app/                      # Page tests
│   ├── components/               # Component tests
│   └── hooks/                    # Hook tests
└── public/                       # Static assets
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd product-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional)
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=https://fakestoreapi.com
   ```
   
   > **Note:** The app uses FakeStore API by default. You can override this with your own API URL.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on http://localhost:3000 |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint to check code quality |
| `npm run test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate test coverage report |

## 🧪 Testing

The project includes comprehensive unit tests for all major components, pages, and hooks.

### Run Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode (for development)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage

Tests are written for:
- ✅ Product catalog page
- ✅ Product detail page
- ✅ ProductGrid component (filtering, search, pagination)
- ✅ ProductDetails component
- ✅ Pagination component
- ✅ useFavorites hook
- ✅ useDebounce hook

## 🎨 Features in Detail

### Dark Mode
The app supports dark mode with a toggle in the navigation bar. Theme preference is saved to local storage and persists across sessions.

### Favorites
Users can add products to their favorites list. Favorites are stored in local storage and accessible from the dedicated favorites page.

### Search & Filter
- **Real-time search** with 300ms debouncing for optimal performance
- **Category filtering** to narrow down products by type
- **Combined filtering** - search and category filters work together

### Pagination
Client-side pagination with configurable items per page (default: 12 products per page).

## 🌐 API Integration

The app fetches data from the [FakeStore API](https://fakestoreapi.com/):

- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product by ID
- `GET /products/categories` - Fetch all categories

API functions include:
- **Axios HTTP client** for robust request handling
- **10-second timeout** to prevent hanging requests
- **Comprehensive error handling** with user-friendly messages
- **Automatic JSON parsing** of responses
- **TypeScript type safety** with typed responses

## 🎯 Key Components

### ProductGrid
Client-side component that handles:
- Product display in a responsive grid
- Search functionality with debouncing
- Category filtering
- Pagination controls

### ProductDetails
Displays detailed product information including:
- Product image with zoom effect
- Title, price, and rating
- Category badge
- Full description
- Add to favorites button

### Navbar
Global navigation with:
- Logo and brand name
- Navigation links (Home, Products, Favorites)
- Dark mode toggle
- Responsive mobile menu

## 🔮 Future Enhancements

- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Product reviews and ratings
- [ ] Advanced filtering (price range, rating)
- [ ] Product comparison feature
- [ ] Wishlist sharing
- [ ] Backend API integration

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using Next.js and React**
